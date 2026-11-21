import test from "node:test";
import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { onRequest } from "../functions/_middleware.js";

if (!globalThis.crypto) globalThis.crypto = webcrypto;

const token = "a".repeat(64);
function makeDb({ approved = true } = {}) {
  return {
    prepare() {
      return {
        bind() { return this; },
        async first() {
          return approved
            ? { id: "student-1", email: "student@example.com", role: "student", status: "approved", difficulty: "beginner", expires_at: "2099-01-01T00:00:00.000Z" }
            : null;
        }
      };
    }
  };
}
function context(path, { cookie = "", approved = true, db = true } = {}) {
  const request = new Request("https://study.example" + path, {
    headers: cookie ? { Cookie: cookie } : {}
  });
  let nextCalls = 0;
  return {
    request,
    env: db ? { DB: makeDb({ approved }) } : {},
    next: async () => {
      nextCalls++;
      return new Response("protected content", { headers: { "Content-Type": "text/html" } });
    },
    get nextCalls() { return nextCalls; }
  };
}

test("only overview and authentication routes bypass the session gate", async () => {
  const publicPage = context("/", { db: false });
  const publicResponse = await onRequest(publicPage);
  assert.equal(publicResponse.status, 200);
  assert.equal(publicPage.nextCalls, 1);

  const protectedPage = context("/command.html", { approved: false });
  const protectedResponse = await onRequest(protectedPage);
  assert.equal(protectedResponse.status, 302);
  assert.match(protectedResponse.headers.get("location"), /login\.html/);
  assert.equal(protectedPage.nextCalls, 0);
});

test("direct study API access is rejected without an approved account", async () => {
  const api = context("/api/mock/start", { approved: false });
  const response = await onRequest(api);
  assert.equal(response.status, 401);
  assert.equal(api.nextCalls, 0);
});

test("approved study pages are returned with private no-store caching", async () => {
  const page = context("/lesson.html?topic=types-of-numbers", { cookie: "tp_session=" + token });
  const response = await onRequest(page);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(await response.text(), "protected content");
});
