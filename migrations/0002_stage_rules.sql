CREATE TABLE IF NOT EXISTS stage_rules (
  exam_track TEXT NOT NULL CHECK (exam_track IN ('si','constable')),
  stage_id TEXT NOT NULL,
  minimum_difficulty TEXT NOT NULL DEFAULT 'beginner'
    CHECK (minimum_difficulty IN ('beginner','intermediate','advanced')),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by TEXT REFERENCES users(id),
  PRIMARY KEY (exam_track, stage_id)
);
