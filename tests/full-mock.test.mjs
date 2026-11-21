import test from "node:test";
import assert from "node:assert/strict";
import { onRequestPost as startMock } from "../functions/api/mock/start.js";
import { onRequestPost as submitMock } from "../functions/api/mock/submit.js";

const token = "9".repeat(64);
const user = { id: "student-1", email: "student@example.com", role: "student", status: "approved", difficulty: "beginner", expires_at: "2099-01-01T00:00:00.000Z" };
function startDb() {
  const writes = [];
  return {
    writes,
    prepare(sql) {
      return {
        values: [],
        bind(...values) { this.values = values; return this; },
        async first() { if (sql.includes("FROM sessions")) return user; return null; },
        async run() { writes.push({ sql, values: this.values }); return { success: true }; }
      };
    }
  };
}
function req(body) {
  return new Request("https://example.com/api/mock", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://example.com", Cookie: "tp_session=" + token },
    body: JSON.stringify(body)
  });
}
function submitDb({ expired = false, claimChanges = 1, examTrack = "constable", correctMark = 0.5, wrongMark = 0 } = {}) {
  const set = {
    id: "mock-1", user_id: user.id, exam_track: examTrack,
    questions_json: JSON.stringify(Array.from({ length: 100 }, (_, i) => ({ id: i, subject: "Test", question: "Q" + i, options: ["A", "B", "C", "D"] }))),
    answer_key_json: JSON.stringify(Array(100).fill(1)),
    correct_mark: correctMark, wrong_mark: wrongMark, total_marks: examTrack === "si" ? 100 : 50,
    expires_at: expired ? "2000-01-01T00:00:00.000Z" : "2099-01-01T00:00:00.000Z",
    submitted_at: null
  };
  const db = {
    batches: [],
    prepare(sql) {
      return {
        sql, values: [],
        bind(...values) { this.values = values; return this; },
        async first() { if (sql.includes("FROM sessions")) return user; if (sql.includes("FROM full_mock_sets")) return set; return null; }
      };
    },
    async batch(statements) {
      this.batches.push(statements);
      return [{ meta: { changes: claimChanges } }, { meta: { changes: 1 } }];
    }
  };
  return db;
}

test("Constable mock generates 100 questions with the advertised marking pattern and no answer keys", async () => {
  const DB = startDb();
  const response = await startMock({ request: req({ examTrack: "constable" }), env: { DB } });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.questions.length, 100);
  assert.equal(result.durationMinutes, 120);
  assert.deepEqual(result.marking, { correct: 0.5, wrong: 0, unattempted: 0, totalMarks: 50 });
  assert.deepEqual(Object.values(result.subjectAllocation), [20, 20, 20, 20, 20]);
  assert.ok(result.questions.every(q => !("answer" in q) && !("explanation" in q)));
  assert.equal(DB.writes.length, 1);
});

test("SI mock generates 100 questions with historical CWT negative marking disclosed", async () => {
  const DB = startDb();
  const response = await startMock({ request: req({ examTrack: "si" }), env: { DB } });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.questions.length, 100);
  assert.deepEqual(result.marking, { correct: 1, wrong: -0.5, unattempted: 0, totalMarks: 100 });
  assert.match(result.note, /Historical CWT-2025/);
});

test("mock start rejects invalid track and cross-origin calls", async () => {
  const DB = startDb();
  assert.equal((await startMock({ request: req({ examTrack: "commando-constable" }), env: { DB } })).status, 400);
  const hostile = new Request("https://example.com/api/mock", { method: "POST", headers: { Origin: "https://evil.example", "Content-Type": "application/json" }, body: JSON.stringify({ examTrack: "si" }) });
  assert.equal((await startMock({ request: hostile, env: { DB } })).status, 403);
});

test("mock submit calculates Constable score on server and atomically saves result", async () => {
  const DB = submitDb();
  const response = await submitMock({ request: req({ questionSetId: "mock-1", answers: Array(100).fill(1) }), env: { DB } });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.correct, 100);
  assert.equal(result.wrong, 0);
  assert.equal(result.unattempted, 0);
  assert.equal(result.score, 50);
  assert.equal(result.accuracy, 100);
  assert.deepEqual(result.subjectBreakdown.Test, { correct: 100, wrong: 0, unattempted: 0 });
  assert.equal(DB.batches.length, 1);
  assert.equal(DB.batches[0].length, 2);
});

test("mock submit supports unanswered questions and rejects expired or duplicate claims", async () => {
  const answers = Array(100).fill(null);
  assert.equal((await submitMock({ request: req({ questionSetId: "mock-1", answers }), env: { DB: submitDb({ expired: true }) } })).status, 410);
  assert.equal((await submitMock({ request: req({ questionSetId: "mock-1", answers }), env: { DB: submitDb({ claimChanges: 0 }) } })).status, 409);
  assert.equal((await submitMock({ request: req({ questionSetId: "mock-1", answers: [1] }), env: { DB: submitDb() } })).status, 400);
});

test("SI mock submit applies negative marking exactly", async () => {
  const DB = submitDb({ examTrack: "si", correctMark: 1, wrongMark: -0.5 });
  const response = await submitMock({ request: req({ questionSetId: "mock-1", answers: Array(100).fill(0) }), env: { DB } });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.correct, 0);
  assert.equal(result.wrong, 100);
  assert.equal(result.score, -50);
  assert.equal(result.totalMarks, 100);
});
