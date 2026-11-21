import test from "node:test";
import assert from "node:assert/strict";
import { onRequestPost } from "../functions/api/topic-exam/submit.js";

const token = "d".repeat(64);
const account = { id: "student-1", email: "student@example.com", role: "student", status: "approved", difficulty: "beginner" };
const storedQuestions = [
  { id: 0, question: "2 + 2?", options: ["3", "4", "5", "6"], explanation: "Two plus two equals four." },
  { id: 1, question: "3 + 1?", options: ["2", "3", "4", "5"], explanation: "Three plus one equals four." }
];
function setup({ submitted = null, expired = false } = {}) {
  const batches = [];
  const set = {
    id: "set-1", user_id: account.id, exam_track: "constable", topic_id: "constable-starter-arithmetic",
    stage_id: "stage-1", difficulty: "beginner", questions_json: JSON.stringify(storedQuestions),
    answer_key_json: JSON.stringify([1, 2]),
    expires_at: expired ? "2000-01-01T00:00:00.000Z" : "2099-01-01T00:00:00.000Z",
    submitted_at: submitted
  };
  const db = {
    batches,
    prepare(sql) {
      return {
        sql,
        values: [],
        bind(...values) { this.values = values; return this; },
        async first() {
          if (sql.includes("FROM sessions")) return { ...account, expires_at: "2099-01-01T00:00:00.000Z" };
          if (sql.includes("FROM topic_question_sets")) return set;
          if (sql.includes("FROM users")) return { difficulty: "beginner" };
          if (sql.includes("FROM topic_stage_rules")) return null;
          return null;
        }
      };
    },
    async batch(statements) {
      batches.push(statements.map(statement => ({ sql: statement.sql, values: statement.values })));
      return [{ meta: { changes: 1 } }, ...statements.slice(1).map(() => ({ meta: { changes: 1 } }))];
    }
  };
  return db;
}
function makeRequest(answers = [1, 2]) {
  return new Request("https://example.com/api/topic-exam/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://example.com", Cookie: "tp_session=" + token },
    body: JSON.stringify({ questionSetId: "set-1", answers })
  });
}

test("topic exam submit requires an approved session", async () => {
  const db = setup();
  db.prepare = () => ({ bind() { return this; }, async first() { return null; } });
  const response = await onRequestPost({ request: makeRequest(), env: { DB: db } });
  assert.equal(response.status, 401);
});

test("topic exam submit rejects incomplete answers", async () => {
  const db = setup();
  const response = await onRequestPost({ request: makeRequest([1]), env: { DB: db } });
  assert.equal(response.status, 400);
  assert.equal(db.batches.length, 0);
});

test("topic exam submit rejects expired and already-used sets", async () => {
  const expired = await onRequestPost({ request: makeRequest(), env: { DB: setup({ expired: true }) } });
  assert.equal(expired.status, 410);
  const used = await onRequestPost({ request: makeRequest(), env: { DB: setup({ submitted: "already-used" }) } });
  assert.equal(used.status, 409);
});

test("topic exam scores on the server and atomically records a pass plus stage unlock", async () => {
  const db = setup();
  const response = await onRequestPost({ request: makeRequest([1, 2]), env: { DB: db } });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.correct, 2);
  assert.equal(result.total, 2);
  assert.equal(result.accuracy, 100);
  assert.equal(result.passed, true);
  assert.equal(result.unlockedStage, "stage-2");
  assert.equal(db.batches.length, 1);
  assert.equal(db.batches[0].length, 4);
  assert.match(db.batches[0][0].sql, /submitted_at IS NULL/);
  assert.match(db.batches[0][1].sql, /INSERT INTO topic_stage_attempts/);
  assert.equal(result.explanations[0].correctIndex, 1);
});

test("topic exam submit does not unlock the next stage on a failed score", async () => {
  const db = setup();
  const response = await onRequestPost({ request: makeRequest([0, 0]), env: { DB: db } });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.accuracy, 0);
  assert.equal(result.passed, false);
  assert.equal(result.unlockedStage, null);
  assert.equal(db.batches[0].length, 2);
});
