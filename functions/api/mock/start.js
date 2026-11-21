import { json, fail, currentUser, readJson, isSameOrigin, uuid } from "../_lib/auth.js";
import { topicBanks } from "../_lib/topic-banks.js";
import { fullMockBanks } from "../_lib/full-mock-banks.js";

const shuffle = items => {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
const take = (items, count, subject) => shuffle(items).slice(0, count).map((q, i) => ({
  id: subject + "-" + i,
  subject,
  question: q[0],
  options: q[1],
  answer: q[2],
  explanation: q[3]
}));

function buildConstableSet() {
  const arithmetic = Object.entries(topicBanks)
    .filter(([id]) => !id.startsWith("constable-starter-"))
    .flatMap(([, bank]) => bank);
  const pools = [
    ["Elementary Arithmetic", arithmetic, 20],
    ["General English", fullMockBanks.english, 20],
    ["Logical Reasoning / Mental Ability", fullMockBanks.reasoning, 20],
    ["Assam History, Geography, Polity and Economy", [...fullMockBanks.assamHistory, ...fullMockBanks.assamGeography, ...fullMockBanks.assamPolityEconomy], 20],
    ["General Awareness / GK and Current Affairs", [...fullMockBanks.generalKnowledge, ...fullMockBanks.currentAffairsStatic], 20]
  ];
  return pools.flatMap(([subject, bank, count]) => take(bank, count, subject));
}
function buildSiSet() {
  const pools = [
    ["Logical Reasoning, Aptitude and English Comprehension", [...fullMockBanks.english, ...fullMockBanks.reasoning], 34],
    ["History and Culture of Assam and India", [...fullMockBanks.assamHistory, ...fullMockBanks.indiaHistory], 33],
    ["General Knowledge", [...fullMockBanks.generalKnowledge, ...fullMockBanks.currentAffairsStatic], 33]
  ];
  return pools.flatMap(([subject, bank, count]) => take(bank, count, subject));
}

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Full mock dene ke liye approved account se login karo.", 401);
  const body = await readJson(request);
  if (!body || !["si", "constable"].includes(body.examTrack)) return fail("Select SI or General Constable track.");
  const questions = body.examTrack === "constable" ? buildConstableSet() : buildSiSet();
  if (questions.length !== 100) return fail("Full mock bank is not ready for this track.", 503);
  const shuffled = shuffle(questions);
  const answerKey = shuffled.map(q => q.answer);
  const stored = shuffled.map(({ answer, explanation, ...question }) => question);
  const id = uuid();
  const isSi = body.examTrack === "si";
  const correctMark = isSi ? 1 : 0.5;
  const wrongMark = isSi ? -0.5 : 0;
  const totalMarks = isSi ? 100 : 50;
  const patternVersion = isSi ? "SI-CWT-2025-HISTORICAL-PRACTICE" : "CONSTABLE-UB-AB-2025-26-ADVERTISEMENT";
  const expires = new Date(Date.now() + 120 * 60 * 1000).toISOString();
  await env.DB.prepare(
    "INSERT INTO full_mock_sets (id,user_id,exam_track,pattern_version,questions_json,answer_key_json,correct_mark,wrong_mark,total_marks,duration_minutes,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
  ).bind(id, user.id, body.examTrack, patternVersion, JSON.stringify(stored), JSON.stringify(answerKey), correctMark, wrongMark, totalMarks, 120, expires).run();
  return json({
    questionSetId: id,
    examTrack: body.examTrack,
    patternVersion,
    questions: stored,
    durationMinutes: 120,
    expiresAt: expires,
    marking: { correct: correctMark, wrong: wrongMark, unattempted: 0, totalMarks },
    subjectAllocation: body.examTrack === "constable"
      ? { "Elementary Arithmetic": 20, "General English": 20, "Logical Reasoning / Mental Ability": 20, "Assam History, Geography, Polity and Economy": 20, "General Awareness / GK and Current Affairs": 20 }
      : { "Logical Reasoning, Aptitude and English Comprehension": 34, "History and Culture of Assam and India": 33, "General Knowledge": 33 },
    note: isSi
      ? "Historical CWT-2025 marking-style practice only; latest SI recruitment cycle rules and subject-wise allocation must be confirmed from its final official notice."
      : "The advertisement specifies 100 questions, 50 marks, 120 minutes and no negative marking. Equal subject allocation here is a platform practice design, not an official subject-wise count."
  });
}
