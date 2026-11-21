CREATE TABLE IF NOT EXISTS question_sets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_track TEXT NOT NULL CHECK (exam_track IN ('si','constable')),
  stage_id TEXT NOT NULL CHECK (stage_id IN ('stage-1','stage-2','stage-3','stage-4','stage-5')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner','intermediate','advanced')),
  questions_json TEXT NOT NULL,
  answer_key_json TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  submitted_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS question_sets_user_idx ON question_sets(user_id, created_at DESC);
