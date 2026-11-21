#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "data/official-exam-catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const ids = new Set();
let total = 0;
const allowedSourceTypes = new Set(catalog.question_source_types);
const allowedDifficulties = new Set(catalog.difficulty_levels);
const errors = [];

function fail(message) { errors.push(message); }
if (!Array.isArray(catalog.exam_profiles) || catalog.exam_profiles.length < 4) {
  fail("Catalog must define at least four distinct Assam Police exam profiles.");
}
const profileIds = new Set((catalog.exam_profiles || []).map(x => x.exam_id));
for (const id of ["assam-police-si-ub", "assam-police-si-ab-commando", "assam-police-constable-ub", "assam-police-constable-ab"]) {
  if (!profileIds.has(id)) fail("Missing exam profile: " + id);
}

const pyqDir = path.join(root, "data/pyq");
if (fs.existsSync(pyqDir)) {
  for (const file of fs.readdirSync(pyqDir).filter(x => x.endsWith(".json"))) {
    const dataset = JSON.parse(fs.readFileSync(path.join(pyqDir, file), "utf8"));
    for (const q of dataset.records || []) {
      total++;
      if (!q.question_id || ids.has(q.question_id)) fail(file + ": missing or duplicate question_id " + q.question_id);
      ids.add(q.question_id);
      if (!q.question_text || !q.subject || !q.topic || !q.subtopic) fail(q.question_id + ": missing question taxonomy/text");
      const opts = q.options || {};
      if (!["A", "B", "C", "D"].every(k => typeof opts[k] === "string" && opts[k].trim())) fail(q.question_id + ": requires four non-empty options");
      if (!["A", "B", "C", "D"].includes(q.correct_option)) fail(q.question_id + ": invalid correct_option");
      if (q.correct_answer !== opts[q.correct_option]) fail(q.question_id + ": correct_answer does not match correct option");
      if (!q.explanation || !allowedDifficulties.has(q.difficulty)) fail(q.question_id + ": missing explanation or invalid difficulty");
      if (!allowedSourceTypes.has(q.source_type)) fail(q.question_id + ": invalid source_type");
      if (!q.source_url || !q.official_source_url) fail(q.question_id + ": missing transcription or official source URL");
      if (q.source_type === "VERIFIED_ASSAM_POLICE_PYQ" && (!q.exam_year || !q.answer_key_url)) fail(q.question_id + ": PYQ missing exam year or matching answer-key URL");
      if (q.source_type === "MODEL_PRACTICE_QUESTION" && q.exam_year != null) fail(q.question_id + ": model question must not claim an exam year");
    }
  }
}
if (errors.length) {
  console.error("Exam data validation failed:");
  for (const error of errors) console.error(" - " + error);
  process.exitCode = 1;
} else {
  console.log("Exam data validation passed.");
  console.log("Exam profiles: " + catalog.exam_profiles.length);
  console.log("PYQ records checked: " + total);
  console.log("Unique question IDs: " + ids.size);
}
