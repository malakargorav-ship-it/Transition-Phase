import test from "node:test";
import assert from "node:assert/strict";
import { onRequestGet as getTopicRules, onRequestPost as saveTopicRules } from "../functions/api/admin/topic-stage-rules.js";
import { onRequestGet as getUsers, onRequestPost as changeUser } from "../functions/api/admin/users.js";

const token = "f".repeat(64);
function dbFor(role = "student") {
  const writes = [];
  return {
    writes,
    prepare(sql) {
      return {
        values: [],
        bind(...values) { this.values = values; return this; },
        async first() {
          if (sql.includes("FROM sessions")) return { id: "student-1", email: "student@example.com", role, status: "approved", difficulty: "beginner", expires_at: "2099-01-01T00:00:00.000Z" };
          return null;
        },
        async all() { return { results: [] }; },
        async run() { writes.push({ sql, values: this.values }); return { success: true }; }
      };
    }
  };
}
function req(path, method = "GET", body = {}) {
  return new Request("https://example.com/api/" + path, {
    method,
    headers: { Origin: "https://example.com", Cookie: "tp_session=" + token, ...(method === "POST" ? { "Content-Type": "application/json" } : {}) },
    ...(method === "POST" ? { body: JSON.stringify(body) } : {})
  });
}

test("student cannot read admin topic rules or user directory", async () => {
  const DB = dbFor("student");
  const topic = await getTopicRules({ request: req("admin/topic-stage-rules"), env: { DB } });
  const users = await getUsers({ request: req("admin/users"), env: { DB } });
  assert.equal(topic.status, 403);
  assert.equal(users.status, 403);
});

test("student cannot modify admin topic rules or approve accounts", async () => {
  const DB = dbFor("student");
  const rule = await saveTopicRules({ request: req("admin/topic-stage-rules", "POST", {
    topicId: "percentage", examTrack: "constable", stageId: "stage-1", minimumDifficulty: "advanced"
  }), env: { DB } });
  const user = await changeUser({ request: req("admin/users", "POST", {
    userId: "student-2", status: "approved"
  }), env: { DB } });
  assert.equal(rule.status, 403);
  assert.equal(user.status, 403);
  assert.equal(DB.writes.length, 0);
});

test("non-admin cannot access admin routes even with a valid approved session", async () => {
  const DB = dbFor("student");
  const response = await getTopicRules({ request: req("admin/topic-stage-rules"), env: { DB } });
  assert.equal(response.status, 403);
});
