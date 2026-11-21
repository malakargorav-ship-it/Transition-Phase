#!/usr/bin/env node
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const files = [
  "migrations/0001_accounts_progress.sql",
  "migrations/0002_stage_rules.sql",
  "migrations/0003_user_progress.sql",
  "migrations/0004_question_sets.sql",
  "migrations/0005_auth_rate_limits.sql",
  "migrations/0006_topic_exam_engine.sql",
  "migrations/0007_full_mock_engine.sql"
];
const migrations = files.map(path => ({ path, sql: fs.readFileSync(path, "utf8") }));
const python = String.raw`
import json, sqlite3, sys
migrations = json.load(sys.stdin)
db = sqlite3.connect(":memory:")
db.execute("PRAGMA foreign_keys = ON")
for item in migrations:
    try:
        db.executescript(item["sql"])
    except Exception as error:
        raise SystemExit(f'Migration failed: {item["path"]}: {error}')
required = {
    "users": {"id", "email", "password_hash", "role", "status", "difficulty"},
    "sessions": {"token_hash", "user_id", "expires_at"},
    "stage_attempts": {"question_set_id", "score", "passed"},
    "stage_unlocks": {"user_id", "exam_track", "stage_id"},
    "stage_rules": {"exam_track", "stage_id", "minimum_difficulty"},
    "user_settings": {"user_id", "minimum_difficulty"},
    "user_progress": {"user_id", "snapshot", "updated_at"},
    "question_sets": {"id", "user_id", "questions_json", "answer_key_json", "expires_at"},
    "auth_rate_limits": {"key_hash", "attempts", "blocked_until"},
    "topic_question_sets": {"id", "user_id", "topic_id", "answer_key_json", "submitted_at"},
    "topic_stage_rules": {"exam_track", "topic_id", "stage_id", "minimum_difficulty"},
    "topic_stage_unlocks": {"user_id", "exam_track", "topic_id", "stage_id"},
    "topic_stage_attempts": {"id", "user_id", "topic_id", "score", "passed", "question_set_id"},
    "full_mock_sets": {"id", "user_id", "exam_track", "questions_json", "answer_key_json", "duration_minutes", "expires_at"},
    "full_mock_attempts": {"id", "user_id", "question_set_id", "correct_count", "wrong_count", "unattempted_count", "score", "total_marks", "accuracy"}
}
for table, columns in required.items():
    found = {row[1] for row in db.execute(f'PRAGMA table_info("{table}")')}
    missing = columns - found
    if missing:
        raise SystemExit(f'{table}: missing columns: {", ".join(sorted(missing))}')
violations = db.execute("PRAGMA foreign_key_check").fetchall()
if violations:
    raise SystemExit(f"Foreign-key violations: {violations}")
print(f"SQLite migration validation passed: {len(migrations)} migrations, {len(required)} tables.")
`;
execFileSync("python3", ["-c", python], { input: JSON.stringify(migrations), stdio: ["pipe", "inherit", "inherit"] });
