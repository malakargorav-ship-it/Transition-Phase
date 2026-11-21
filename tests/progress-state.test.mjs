import test from "node:test";
import assert from "node:assert/strict";
import { onRequestGet, onRequestPost } from "../functions/api/progress/state.js";

const token = "e".repeat(64);
const owner = "account-A";
function makeDb() {
  const reads = [];
  const db = {
    reads,
    prepare(sql) {
      return {
        sql,
        values: [],
        bind(...values) { this.values = values; return this; },
        async first() {
          reads.push({ sql, values: this.values });
          if (sql.includes("FROM sessions")) return { id: owner, email: "a@example.com", role: "student", status: "approved", difficulty: "beginner", expires_at: "2099-01-01T00:00:00.000Z" };
          if (sql.includes("FROM user_settings")) return { minimum_difficulty: "intermediate" };
          if (sql.includes("FROM user_progress")) return { snapshot: JSON.stringify({ streak: 4 }), updated_at: "2026-11-21 10:00:00" };
          return null;
        },
        async all() { reads.push({ sql, values: this.values }); return { results: [] }; },
        async run() { reads.push({ sql, values: this.values }); return { success: true }; }
      };
    }
  };
  return db;
}
function makeRequest(method, body, origin = "https://example.com") {
  return new Request("https://example.com/api/progress/state", {
    method,
    headers: { ...(method === "POST" ? { "Content-Type": "application/json" } : {}), Origin: origin, Cookie: "tp_session=" + token },
    ...(method === "POST" ? { body: JSON.stringify(body) } : {})
  });
}

test("progress GET scopes every account query to the authenticated user", async () => {
  const DB = makeDb();
  const response = await onRequestGet({ request: makeRequest("GET"), env: { DB } });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.deepEqual(result.snapshot, { streak: 4 });
  for (const query of DB.reads.filter(x => /WHERE user_id=\?/.test(x.sql))) {
    assert.deepEqual(query.values, [owner]);
  }
});

test("progress POST rejects cross-origin updates", async () => {
  const DB = makeDb();
  const response = await onRequestPost({ request: makeRequest("POST", { snapshot: {} }, "https://attacker.example"), env: { DB } });
  assert.equal(response.status, 403);
  assert.equal(DB.reads.length, 0);
});

test("progress POST rejects oversized snapshots", async () => {
  const DB = makeDb();
  const response = await onRequestPost({ request: makeRequest("POST", { snapshot: { payload: "x".repeat(500001) } }), env: { DB } });
  assert.equal(response.status, 413);
  assert.equal(DB.reads.filter(x => x.sql.includes("INSERT INTO user_progress")).length, 0);
});
