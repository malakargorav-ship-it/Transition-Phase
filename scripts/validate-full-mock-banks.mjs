#!/usr/bin/env node
import { topicBanks } from "../functions/api/_lib/topic-banks.js";
import { fullMockBanks } from "../functions/api/_lib/full-mock-banks.js";
const errors = [];
let count = 0;
for (const [subject, bank] of Object.entries(fullMockBanks)) {
  if (!Array.isArray(bank) || bank.length < 20) errors.push(subject + ": expected at least 20 unique questions.");
  const seen = new Set();
  for (let i = 0; i < (bank || []).length; i++) {
    count++;
    const [prompt, options, answer, explanation] = bank[i] || [];
    const label = subject + " #" + (i + 1);
    if (typeof prompt !== "string" || !prompt.trim()) errors.push(label + ": missing prompt.");
    if (!Array.isArray(options) || options.length !== 4 || options.some(x => typeof x !== "string" || !x.trim())) errors.push(label + ": exactly four non-empty options required.");
    else if (new Set(options.map(x => x.trim())).size !== 4) errors.push(label + ": duplicate options in " + JSON.stringify(prompt) + " => " + JSON.stringify(options));
    if (!Number.isInteger(answer) || answer < 0 || answer > 3) errors.push(label + ": answer index must be 0..3.");
    if (typeof explanation !== "string" || !explanation.trim()) errors.push(label + ": explanation required.");
    const key = String(prompt || "").trim().toLowerCase();
    if (seen.has(key)) errors.push(label + ": duplicate prompt.");
    seen.add(key);
  }
}
const arithmetic = Object.entries(topicBanks).filter(([id]) => !id.startsWith("constable-starter-")).flatMap(([, bank]) => bank);
if (arithmetic.length < 100) errors.push("Arithmetic pool must contain at least 100 questions.");
if (fullMockBanks.english.length + fullMockBanks.reasoning.length < 34) errors.push("SI aptitude/English pool is too small.");
if (fullMockBanks.assamHistory.length + fullMockBanks.indiaHistory.length < 33) errors.push("SI history pool is too small.");
if (fullMockBanks.generalKnowledge.length + fullMockBanks.currentAffairsStatic.length < 33) errors.push("SI general knowledge pool is too small.");
if (errors.length) {
  console.error("Full mock bank validation failed:");
  for (const error of errors) console.error(" - " + error);
  process.exitCode = 1;
} else {
  console.log("Full mock bank validation passed.");
  console.log("Subject banks: " + Object.keys(fullMockBanks).length);
  console.log("Model questions: " + count);
  console.log("Arithmetic pool: " + arithmetic.length);
  console.log("Both 100-question track allocations have sufficient unique questions.");
}
