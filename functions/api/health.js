import { json } from "./_lib/auth.js";

const requiredTables = [
  "users", "sessions", "user_progress", "stage_rules", "stage_unlocks", "stage_attempts",
  "question_sets", "auth_rate_limits", "topic_question_sets", "topic_stage_rules",
  "topic_stage_unlocks", "topic_stage_attempts", "full_mock_sets", "full_mock_attempts"
];

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ ok: false, database: "missing", error: "Preview D1 binding DB is not configured." }, 503);
  try {
    const result = await env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN (" + requiredTables.map(() => "?").join(",") + ")"
    ).bind(...requiredTables).all();
    const present = new Set((result.results || []).map(row => row.name));
    const missing = requiredTables.filter(name => !present.has(name));
    if (missing.length) return json({
      ok: false, database: "connected", schema: "incomplete",
      missingTables: missing, expectedMigration: "0007_full_mock_engine.sql"
    }, 503);
    return json({ ok: true, database: "connected", schema: "ready", migration: 7 });
  } catch {
    return json({ ok: false, database: "unavailable", error: "D1 health query failed." }, 503);
  }
}
