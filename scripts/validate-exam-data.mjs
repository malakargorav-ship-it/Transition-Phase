#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data/official-exam-catalog.json"), "utf8"));
const ids = new Set();
let total = 0, pyqTotal = 0, modelTotal = 0;
const allowedSourceTypes = new Set(catalog.question_source_types);
const allowedDifficulties = new Set(catalog.difficulty_levels);
const errors = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.isFile() && entry.name.endsWith(".json") ? [full] : [];
  });
}
function fail(message) { errors.push(message); }

if (!Array.isArray(catalog.exam_profiles) || catalog.exam_profiles.length < 4) fail("Catalog must define at least four distinct exam profiles.");
const profileIds = new Set((catalog.exam_profiles || []).map(x => x.exam_id));
for (const id of ["assam-police-si-ub", "assam-police-si-ab-commando", "assam-police-constable-ub", "assam-police-constable-ab"]) {
  if (!profileIds.has(id)) fail("Missing exam profile: " + id);
}

for (const file of [...walk(path.join(root, "data/pyq")), ...walk(path.join(root, "data/questions"))]) {
  const dataset = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(dataset.records)) { fail(path.relative(root, file) + ": missing records array"); continue; }
  for (const q of dataset.records) {
    total++;
    if (q.source_type === "VERIFIED_ASSAM_POLICE_PYQ") pyqTotal++;
    if (q.source_type === "MODEL_PRACTICE_QUESTION") modelTotal++;
    if (!q.question_id || ids.has(q.question_id)) fail(file + ": missing or duplicate question_id " + q.question_id);
    ids.add(q.question_id);
    if (!q.question_text || !q.subject || !q.topic || !q.subtopic) fail(q.question_id + ": missing question taxonomy/text");
    const opts = q.options || {};
    if (!["A", "B", "C", "D"].every(k => typeof opts[k] === "string" && opts[k].trim())) fail(q.question_id + ": requires four non-empty options");
    if (!["A", "B", "C", "D"].includes(q.correct_option)) fail(q.question_id + ": invalid correct_option");
    if (q.correct_answer !== opts[q.correct_option]) fail(q.question_id + ": correct_answer does not match correct option");
    if (!q.explanation || !allowedDifficulties.has(q.difficulty)) fail(q.question_id + ": missing explanation or invalid difficulty");
    if (!allowedSourceTypes.has(q.source_type)) fail(q.question_id + ": invalid source_type");
    if (q.source_type === "VERIFIED_ASSAM_POLICE_PYQ" && (!q.exam_year || !q.source_url || !q.official_source_url || !q.answer_key_url)) {
      fail(q.question_id + ": PYQ missing year, transcription source, official source or answer-key URL");
    }
    if (q.source_type === "MODEL_PRACTICE_QUESTION" && (q.exam_year != null || !q.source_name || q.source_url || q.answer_key_url)) {
      fail(q.question_id + ": model question must not claim an exam year or PYQ source/key");
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
  console.log("Question records checked: " + total);
  console.log("Verified Assam Police PYQ records: " + pyqTotal);
  console.log("Original model practice records: " + modelTotal);
  console.log("Unique question IDs: " + ids.size);
}
