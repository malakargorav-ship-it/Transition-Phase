import test from "node:test";
import assert from "node:assert/strict";
import { onRequestGet } from "../functions/api/health.js";

const tables = [
  "users","sessions","user_progress","stage_rules","stage_unlocks","stage_attempts","question_sets","auth_rate_limits",
  "topic_question_sets","topic_stage_rules","topic_stage_unlocks","topic_stage_attempts","full_mock_sets","full_mock_attempts"
];
function envWith(names) {
  return { DB: { prepare(sql) { return { bind(...values) { this.values = values; return this; }, async all() { return { results: names.map(name => ({ name })) }; } }; } } };
}

test("health endpoint reports missing D1 binding without leaking internals", async () => {
  const response = await onRequestGet({ env: {} });
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ok: false, database: "missing", error: "Preview D1 binding DB is not configured." });
});

test("health endpoint identifies missing mock migration tables", async () => {
  const response = await onRequestGet({ env: envWith(tables.slice(0, -2)) });
  assert.equal(response.status, 503);
  const payload = await response.json();
  assert.equal(payload.schema, "incomplete");
  assert.deepEqual(payload.missingTables, ["full_mock_sets", "full_mock_attempts"]);
});

test("health endpoint returns ready only when all account and mock tables exist", async () => {
  const response = await onRequestGet({ env: envWith(tables) });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, database: "connected", schema: "ready", migration: 7 });
});
