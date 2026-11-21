CREATE TABLE IF NOT EXISTS full_mock_sets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_track TEXT NOT NULL CHECK (exam_track IN ('si','constable')),
  pattern_version TEXT NOT NULL,
  questions_json TEXT NOT NULL,
  answer_key_json TEXT NOT NULL,
  correct_mark REAL NOT NULL,
  wrong_mark REAL NOT NULL,
  total_marks REAL NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes = 120),
  expires_at TEXT NOT NULL,
  submitted_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS full_mock_sets_user_idx ON full_mock_sets(user_id,exam_track,created_at DESC);
CREATE TABLE IF NOT EXISTS full_mock_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_set_id TEXT NOT NULL UNIQUE REFERENCES full_mock_sets(id) ON DELETE CASCADE,
  exam_track TEXT NOT NULL CHECK (exam_track IN ('si','constable')),
  correct_count INTEGER NOT NULL,
  wrong_count INTEGER NOT NULL,
  unattempted_count INTEGER NOT NULL,
  score REAL NOT NULL,
  total_marks REAL NOT NULL,
  accuracy REAL NOT NULL,
  completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS full_mock_attempts_user_idx ON full_mock_attempts(user_id,exam_track,completed_at DESC);
