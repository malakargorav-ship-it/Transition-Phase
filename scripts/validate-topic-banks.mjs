#!/usr/bin/env node
import { topicBanks } from "../functions/api/_lib/topic-banks.js";

const errors = [];
let topics = 0, questions = 0;
for (const [topicId, bank] of Object.entries(topicBanks)) {
  topics++;
  if (!Array.isArray(bank) || bank.length === 0) {
    errors.push(topicId + ": bank must be a non-empty array");
    continue;
  }
  const seen = new Set();
  for (let i = 0; i < bank.length; i++) {
    questions++;
    const q = bank[i];
    const label = topicId + " question " + (i + 1);
    if (!Array.isArray(q) || q.length !== 4) {
      errors.push(label + ": expected [question, options, answerIndex, explanation]");
      continue;
    }
    const [prompt, options, answer, explanation] = q;
    if (typeof prompt !== "string" || !prompt.trim()) errors.push(label + ": missing question text");
    if (!Array.isArray(options) || options.length !== 4 || options.some(x => typeof x !== "string" || !x.trim())) {
      errors.push(label + ": expected four non-empty string options");
    }
    if (!Number.isInteger(answer) || answer < 0 || answer > 3) errors.push(label + ": answer index must be 0..3");
    if (typeof explanation !== "string" || !explanation.trim()) errors.push(label + ": missing explanation");
    const normalized = String(prompt || "").trim().toLowerCase();
    if (normalized && seen.has(normalized)) errors.push(label + ": duplicate question text in " + topicId);
    if (normalized) seen.add(normalized);
  }
}
if (errors.length) {
  console.error("Topic bank validation failed:");
  for (const error of errors) console.error(" - " + error);
  process.exitCode = 1;
} else {
  console.log("Topic bank validation passed.");
  console.log("Topic banks: " + topics);
  console.log("Question records checked: " + questions);
}
