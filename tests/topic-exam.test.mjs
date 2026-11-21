import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { onRequestPost } from "../functions/api/topic-exam/start.js";

const token = "c".repeat(64);
const cookie = "tp_session=" + token;
const user = { id: "student-1", email: "student@example.com", role: "student", status: "approved", difficulty: "beginner" };
function mockDb({ approved = true } = {}) {
  const writes = [];
  return {
    writes,
    prepare(sql) {
      return {
        values: [],
        bind(...values) { this.values = values; return this; },
        async first() {
          if (sql.includes("FROM sessions")) {
            return approved ? { ...user, expires_at: "2099-01-01T00:00:00.000Z" } : null;
          }
          if (sql.includes("FROM users")) return { difficulty: "beginner" };
          if (sql.includes("FROM topic_stage_rules")) return null;
          return null;
        },
        async run() { writes.push({ sql, values: this.values }); return { success: true }; }
      };
    }
  };
}
function request(body, origin = "https://example.com") {
  return new Request("https://example.com/api/topic-exam/start", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin, Cookie: cookie },
    body: JSON.stringify(body)
  });
}

test("topic exam start blocks cross-origin requests before database access", async () => {
  const response = await onRequestPost({ request: request({}, "https://attacker.example"), env: {} });
  assert.equal(response.status, 403);
});

test("topic exam start requires an approved signed-in account", async () => {
  const db = mockDb({ approved: false });
  const response = await onRequestPost({ request: request({ topicId: "constable-starter-arithmetic", examTrack: "constable", stageId: "stage-1" }), env: { DB: db } });
  assert.equal(response.status, 401);
});

test("Constable-only starter banks cannot be requested on the SI track", async () => {
  const db = mockDb();
  const response = await onRequestPost({ request: request({ topicId: "constable-starter-arithmetic", examTrack: "si", stageId: "stage-1" }), env: { DB: db } });
  assert.equal(response.status, 403);
  assert.equal(db.writes.length, 0);
});

test("Constable starter exam returns questions without answer keys", async () => {
  const db = mockDb();
  const response = await onRequestPost({ request: request({ topicId: "constable-starter-arithmetic", examTrack: "constable", stageId: "stage-1" }), env: { DB: db } });
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.equal(payload.topicId, "constable-starter-arithmetic");
  assert.equal(payload.examTrack, "constable");
  assert.equal(payload.questions.length, 5);
  for (const question of payload.questions) {
    assert.equal(typeof question.question, "string");
    assert.equal(question.options.length, 4);
    assert.equal("answer" in question, false);
    assert.equal("correctIndex" in question, false);
    assert.equal("explanation" in question, false);
  }
  assert.equal(db.writes.length, 1);
  const saved = JSON.parse(db.writes[0].values[6]);
  const answerKey = JSON.parse(db.writes[0].values[7]);
  assert.equal(saved.length, 5);
  assert.equal(answerKey.length, 5);
  assert.ok(answerKey.every(index => Number.isInteger(index) && index >= 0 && index <= 3));
});
