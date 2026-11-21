import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const body = await readJson(request);
  if (!body || typeof body.questionSetId !== "string" || !Array.isArray(body.answers) ||
      body.answers.length !== 100 || body.answers.some(x => x !== null && (!Number.isInteger(x) || x < 0 || x > 3))) {
    return fail("Submit exactly 100 answers; use null for unattempted questions.");
  }
  const set = await env.DB.prepare("SELECT * FROM full_mock_sets WHERE id=? AND user_id=?")
    .bind(body.questionSetId, user.id).first();
  if (!set) return fail("Mock attempt not found.", 404);
  if (set.submitted_at) return fail("This mock has already been submitted.", 409);
  if (new Date(set.expires_at).getTime() < Date.now()) return fail("Mock time expired.", 410);
  const key = JSON.parse(set.answer_key_json);
  if (!Array.isArray(key) || key.length !== 100) return fail("Stored answer key is invalid.", 500);
  let correct = 0, wrong = 0, unattempted = 0;
  for (let i = 0; i < 100; i++) {
    if (body.answers[i] === null) unattempted++;
    else if (body.answers[i] === key[i]) correct++;
    else wrong++;
  }
  const score = Math.max(0, correct * set.correct_mark + wrong * set.wrong_mark);
  const accuracy = Math.round(correct / 100 * 10000) / 100;
  const attemptId = crypto.randomUUID(), claim = crypto.randomUUID();
  const statements = [
    env.DB.prepare("UPDATE full_mock_sets SET submitted_at=? WHERE id=? AND user_id=? AND submitted_at IS NULL AND expires_at>?")
      .bind(claim, set.id, user.id, new Date().toISOString()),
    env.DB.prepare(
      "INSERT INTO full_mock_attempts (id,user_id,question_set_id,exam_track,correct_count,wrong_count,unattempted_count,score,total_marks,accuracy) " +
      "SELECT ?,?,?,?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM full_mock_sets WHERE id=? AND user_id=? AND submitted_at=?)"
    ).bind(attemptId, user.id, set.id, set.exam_track, correct, wrong, unattempted, score, set.total_marks, accuracy, set.id, user.id, claim)
  ];
  const result = await env.DB.batch(statements);
  if (!result[0]?.meta || result[0].meta.changes !== 1) return fail("Mock expired or already submitted.", 409);
  return json({
    ok: true, examTrack: set.exam_track, correct, wrong, unattempted,
    score: Math.round(score * 100) / 100, totalMarks: set.total_marks,
    accuracy, attempted: correct + wrong,
    marking: { correct: set.correct_mark, wrong: set.wrong_mark, unattempted: 0 },
    attemptId
  });
}
