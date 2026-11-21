import test from "node:test";
import assert from "node:assert/strict";
import { onRequestGet } from "../functions/api/mock/history.js";

function request(cookie = "tp_session=" + "a".repeat(64)) {
  return new Request("https://example.com/api/mock/history", { headers: { Cookie: cookie } });
}
test("mock history requires an approved account session", async () => {
  const DB = { prepare() { return { bind() { return this; }, async first() { return null; } }; } };
  const response = await onRequestGet({ request: request(""), env: { DB } });
  assert.equal(response.status, 401);
});
test("mock history returns only the current user's saved attempts", async () => {
  let values;
  const DB = { prepare(sql) {
    assert.match(sql, /WHERE user_id=\?/);
    return { bind(...args) { values = args; return this; }, async all() { return { results: [{ id: "attempt-1", exam_track: "constable", score: 42, total_marks: 50 }] }; } };
  } };
  const response = await onRequestGet({ request: request(), env: { DB } });
  assert.equal(response.status, 200);
  assert.deepEqual(values, ["student-1"]);
  assert.equal((await response.json()).attempts.length, 1);
});
