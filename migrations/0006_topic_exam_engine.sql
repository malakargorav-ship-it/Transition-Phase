CREATE TABLE IF NOT EXISTS topic_question_sets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_track TEXT NOT NULL CHECK (exam_track IN ('si','constable')),
  topic_id TEXT NOT NULL,
  stage_id TEXT NOT NULL CHECK (stage_id IN ('stage-1','stage-2','stage-3','stage-4','stage-5')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner','intermediate','advanced')),
  questions_json TEXT NOT NULL,
  answer_key_json TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  submitted_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS topic_question_sets_user_idx ON topic_question_sets(user_id,exam_track,topic_id,created_at DESC);
CREATE TABLE IF NOT EXISTS topic_stage_rules (
  exam_track TEXT NOT NULL CHECK (exam_track IN ('si','constable')),
  topic_id TEXT NOT NULL,
  stage_id TEXT NOT NULL CHECK (stage_id IN ('stage-1','stage-2','stage-3','stage-4','stage-5')),
  minimum_difficulty TEXT NOT NULL DEFAULT 'beginner' CHECK (minimum_difficulty IN ('beginner','intermediate','advanced')),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT REFERENCES users(id),
  PRIMARY KEY(exam_track,topic_id,stage_id)
);
CREATE TABLE IF NOT EXISTS topic_stage_unlocks (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_track TEXT NOT NULL CHECK (exam_track IN ('si','constable')),
  topic_id TEXT NOT NULL,
  stage_id TEXT NOT NULL CHECK (stage_id IN ('stage-1','stage-2','stage-3','stage-4','stage-5')),
  unlocked_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id,exam_track,topic_id,stage_id)
);
CREATE TABLE IF NOT EXISTS topic_stage_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_track TEXT NOT NULL CHECK (exam_track IN ('si','constable')),
  topic_id TEXT NOT NULL,
  stage_id TEXT NOT NULL CHECK (stage_id IN ('stage-1','stage-2','stage-3','stage-4','stage-5')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner','intermediate','advanced')),
  score INTEGER NOT NULL CHECK(score BETWEEN 0 AND 100),
  passed INTEGER NOT NULL CHECK(passed IN (0,1)),
  question_set_id TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS topic_stage_attempts_user_idx ON topic_stage_attempts(user_id,exam_track,topic_id,stage_id,completed_at DESC);
