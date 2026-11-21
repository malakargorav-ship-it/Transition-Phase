import test from "node:test";
import assert from "node:assert/strict";
import { createHash, webcrypto } from "node:crypto";
import {
  hashPassword, verifyPassword, validEmail, sessionCookie,
  isSameOrigin, currentUser, json
} from "../functions/api/_lib/auth.js";

if (!globalThis.crypto) globalThis.crypto = webcrypto;

test("email validation accepts normalized input and rejects malformed values", () => {
  assert.equal(validEmail(" student@example.com "), true);
  assert.equal(validEmail("student@example"), false);
  assert.equal(validEmail("student @example.com"), false);
  assert.equal(validEmail(null), false);
  assert.equal(validEmail("a".repeat(250) + "@b.com"), false);
});

test("password hashes use unique salts and verify only the correct password", async () => {
  const first = await hashPassword("a-long-test-password", undefined, 1200);
  const second = await hashPassword("a-long-test-password", undefined, 1200);
  assert.notEqual(first.salt, second.salt);
  assert.notEqual(first.hash, second.hash);
  assert.equal(await verifyPassword("a-long-test-password", {
    password_salt: first.salt, password_hash: first.hash, password_iterations: first.iterations
  }), true);
  assert.equal(await verifyPassword("incorrect-password", {
    password_salt: first.salt, password_hash: first.hash, password_iterations: first.iterations
  }), false);
});

test("session cookie is Secure, HttpOnly, SameSite=Lax and path-scoped", () => {
  const cookie = sessionCookie("a".repeat(64), "2027-01-01T00:00:00.000Z");
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /Secure/);
  assert.match(cookie, /SameSite=Lax/);
  assert.match(cookie, /Path=\//);
  assert.match(cookie, /Expires=/);
});

test("same-origin guard rejects hostile origins and permits same-origin requests", () => {
  assert.equal(isSameOrigin(new Request("https://example.com/api", { headers: { Origin: "https://evil.example" } })), false);
  assert.equal(isSameOrigin(new Request("https://example.com/api", { headers: { Origin: "https://example.com" } })), true);
  assert.equal(isSameOrigin(new Request("https://example.com/api")), true);
});

test("currentUser hashes the cookie token and rejects unapproved accounts", async () => {
  const token = "b".repeat(64);
  const expectedHash = createHash("sha256").update(token).digest("hex");
  let bound;
  const db = {
    prepare(sql) {
      assert.match(sql, /sessions/);
      return {
        bind(...values) { bound = values; return this; },
        async first() {
          assert.equal(bound[0], expectedHash);
          return { id: "user-1", email: "student@example.com", role: "student", status: "approved", difficulty: "beginner", expires_at: "2099-01-01T00:00:00.000Z" };
        }
      };
    }
  };
  const request = new Request("https://example.com/api", { headers: { Cookie: "tp_session=" + token } });
  assert.equal((await currentUser(request, db)).id, "user-1");
  db.prepare = () => ({ bind() { return this; }, async first() { return { id: "user-2", status: "pending" }; } });
  assert.equal(await currentUser(request, db), null);
});

test("JSON API responses disable caching", async () => {
  const response = json({ ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { ok: true });
});
