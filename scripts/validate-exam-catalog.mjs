#!/usr/bin/env node
import fs from "node:fs";

const catalog = JSON.parse(fs.readFileSync("data/official-exam-catalog.json", "utf8"));
const errors = [];
const fail = message => errors.push(message);
const profiles = Array.isArray(catalog.exam_profiles) ? catalog.exam_profiles : [];
const byId = new Map(profiles.map(profile => [profile.exam_id, profile]));
const required = [
  "assam-police-si-ub",
  "assam-police-si-ab-commando",
  "assam-police-constable-ub",
  "assam-police-constable-ab",
  "assam-commando-constable-ab"
];

if (catalog.schema_version !== "1.0.0") fail("Unexpected or missing catalog schema_version.");
if (!catalog.authority || !/^\\d{4}-\\d{2}-\\d{2}$/.test(catalog.last_verified || "")) {
  fail("Catalog authority and ISO last_verified date are required.");
}
if (profiles.length !== required.length) fail("Catalog must contain exactly five separately modelled recruitment profiles.");
if (new Set(profiles.map(x => x.exam_id)).size !== profiles.length) fail("Duplicate exam_id in catalog.");
if (new Set(profiles.map(x => x.category)).size !== profiles.length) fail("Duplicate category code in catalog.");
for (const id of required) if (!byId.has(id)) fail("Missing required exam profile: " + id);

for (const profile of profiles) {
  const label = profile.exam_id || "unnamed profile";
  if (!profile.label || !profile.category) fail(label + ": label and category are required.");
  const recruitment = profile.recruitment_reference;
  if (!recruitment?.advertisement_no || !/^\\d{4}-\\d{2}-\\d{2}$/.test(recruitment.date || "") ||
      typeof recruitment.vacancies !== "number" || recruitment.vacancies < 0 ||
      !/^https:\\/\\//.test(recruitment.url || "")) {
    fail(label + ": recruitment reference must include advertisement, date, non-negative vacancies and HTTPS source URL.");
  }
}

function checkPattern(profile, expected, label) {
  const p = profile?.written_pattern;
  if (!p) { fail(label + ": required written_pattern is missing."); return; }
  for (const [key, value] of Object.entries(expected)) {
    if (p[key] !== value) fail(label + ": written_pattern." + key + " must be " + value + ".");
  }
}

const constableExpected = {
  questions: 100,
  marks: 50,
  duration_minutes: 120,
  correct_mark: 0.5,
  wrong_mark: 0,
  question_level: "Class IX-X"
};
for (const id of ["assam-police-constable-ub", "assam-police-constable-ab"]) {
  const profile = byId.get(id);
  checkPattern(profile, constableExpected, id);
  const subjects = profile?.written_pattern?.subjects;
  if (!Array.isArray(subjects) || subjects.length !== 5) fail(id + ": expected the five broad subject groups from the catalog.");
  const languages = profile?.written_pattern?.languages;
  if (!Array.isArray(languages) || !["Assamese", "Bodo", "Bengali", "English"].every(x => languages.includes(x))) {
    fail(id + ": expected the four listed examination languages.");
  }
}

for (const id of ["assam-police-si-ub", "assam-police-si-ab-commando"]) {
  const profile = byId.get(id);
  const p = profile?.historical_written_reference;
  if (!p || p.exam !== "CWT-2025 Paper-I" || p.questions !== 100 || p.marks !== 100 ||
      p.duration_minutes !== 120 || p.correct_mark !== 1 || p.wrong_mark !== -0.5 ||
      p.final_answer_key_available !== true) {
    fail(id + ": historical CWT-2025 Paper-I pattern/reference is incomplete or inconsistent.");
  }
  if (!String(profile?.written_pattern_status || "").startsWith("historical_CWT_verified")) {
    fail(id + ": historical Paper-I pattern must not be presented as an unqualified current-cycle pattern.");
  }
}

const commandoConstable = byId.get("assam-commando-constable-ab");
if (commandoConstable && commandoConstable.written_pattern !== null) {
  fail("Commando Constable (AB): do not assign the general Constable written pattern.");
}
if (commandoConstable && !/No written examination listed/i.test(commandoConstable.written_pattern_status || "")) {
  fail("Commando Constable (AB): preserve the catalog note that no written examination is listed in the identified advertisement.");
}

const guardrails = new Set(catalog.guardrails || []);
for (const phrase of [
  "Never label model questions as PYQs.",
  "A provisional answer key must not be marked as officially final.",
  "General Constable (AB) and Commando Constable (AB) are separate profiles."
]) {
  if (!guardrails.has(phrase)) fail("Missing catalog guardrail: " + phrase);
}

if (errors.length) {
  console.error("Official exam catalog validation failed:");
  for (const error of errors) console.error(" - " + error);
  process.exitCode = 1;
} else {
  console.log("Official exam catalog validation passed.");
  console.log("Recruitment profiles checked: " + profiles.length);
  console.log("General Constable written patterns checked: 2");
  console.log("Historical SI Paper-I references checked: 2");
  console.log("Commando Constable written-test separation checked.");
}
