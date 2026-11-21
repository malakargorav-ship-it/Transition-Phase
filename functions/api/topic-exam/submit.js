import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);

  const body = await readJson(request);
  if (!body || typeof body.questionSetId !== "string" || !Array.isArray(body.answers) ||
      body.answers.length > 50 || body.answers.some(x => !Number.isInteger(x) || x < 0 || x > 3)) {
    return fail("Invalid answer submission.");
  }

  const set = await env.DB.prepare(
    "SELECT * FROM topic_question_sets WHERE id=? AND user_id=?"
  ).bind(body.questionSetId, user.id).first();
  if (!set) return fail("Question set not found.", 404);
  if (set.submitted_at) return fail("This question set has already been submitted.", 409);
  if (new Date(set.expires_at).getTime() < Date.now()) return fail("Time expired. Start a fresh question set.", 410);

  const [settings, rule] = await Promise.all([
    env.DB.prepare("SELECT difficulty FROM users WHERE id=?").bind(user.id).first(),
    env.DB.prepare("SELECT minimum_difficulty FROM topic_stage_rules WHERE exam_track=? AND topic_id=? AND stage_id=?")
      .bind(set.exam_track, set.topic_id, set.stage_id).first()
  ]);
  const levels = ["beginner", "intermediate", "advanced"];
  if (set.difficulty !== (settings?.difficulty || "intermediate") ||
      levels.indexOf(set.difficulty) < levels.indexOf(rule?.minimum_difficulty || "beginner")) {
    return fail("Difficulty ya admin rule change ho gaya hai. Fresh set start karo.", 403);
  }

  const questions = JSON.parse(set.questions_json);
  const key = JSON.parse(set.answer_key_json);
  if (!Array.isArray(key) || body.answers.length !== key.length || questions.length !== key.length || !key.length) {
    return fail("Please answer every question before submitting.");
  }

  const correct = key.reduce((n, answer, i) => n + (body.answers[i] === answer ? 1 : 0), 0);
  const total = key.length;
  const accuracy = Math.round(correct / total * 100);
  const passed = accuracy >= 80;
  const stageNumber = Number(set.stage_id.slice(6));
  const attemptId = crypto.randomUUID();
  // A unique claim token makes the submission, attempt record and unlocks one atomic D1 batch.
  // Concurrent submissions cannot create duplicate attempts or unlocks.
  const claimToken = crypto.randomUUID();
  const statements = [
    env.DB.prepare(
      "UPDATE topic_question_sets SET submitted_at=? WHERE id=? AND user_id=? AND submitted_at IS NULL AND expires_at>?"
    ).bind(claimToken, set.id, user.id, new Date().toISOString()),
    env.DB.prepare(
      "INSERT INTO topic_stage_attempts (id,user_id,exam_track,topic_id,stage_id,difficulty,score,passed,question_set_id) " +
      "SELECT ?,?,?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM topic_question_sets WHERE id=? AND user_id=? AND submitted_at=?)"
    ).bind(attemptId, user.id, set.exam_track, set.topic_id, set.stage_id, set.difficulty, accuracy, passed ? 1 : 0, set.id, set.id, user.id, claimToken)
  ];
  if (passed) {
    statements.push(
      env.DB.prepare(
        "INSERT OR IGNORE INTO topic_stage_unlocks (user_id,exam_track,topic_id,stage_id) " +
        "SELECT ?,?,?,? WHERE EXISTS (SELECT 1 FROM topic_stage_attempts WHERE question_set_id=? AND user_id=? AND passed=1)"
      ).bind(user.id, set.exam_track, set.topic_id, set.stage_id, set.id, user.id)
    );
    if (stageNumber < 5) {
      statements.push(
        env.DB.prepare(
          "INSERT OR IGNORE INTO topic_stage_unlocks (user_id,exam_track,topic_id,stage_id) " +
          "SELECT ?,?,?,? WHERE EXISTS (SELECT 1 FROM topic_stage_attempts WHERE question_set_id=? AND user_id=? AND passed=1)"
        ).bind(user.id, set.exam_track, set.topic_id, "stage-" + (stageNumber + 1), set.id, user.id)
      );
    }
  }

  const results = await env.DB.batch(statements);
  if (!results[0]?.meta || results[0].meta.changes !== 1) {
    return fail("Set expired or already submitted.", 409);
  }

  return json({
    ok: true,
    correct,
    total,
    accuracy,
    passed,
    threshold: 80,
    topicId: set.topic_id,
    stageId: set.stage_id,
    unlockedStage: passed && stageNumber < 5 ? "stage-" + (stageNumber + 1) : null,
    explanations: questions.map((question, i) => ({
      id: question.id,
      correctIndex: key[i],
      explanation: body.answers[i] === key[i]
        ? question.explanation
        : "Correct answer: " + question.options[key[i]] + ". " + question.explanation
    }))
  });
}
