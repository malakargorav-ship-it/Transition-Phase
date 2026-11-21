import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";
export async function onRequestGet({ request, env }) {
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const [unlocks, topicUnlocks, attempts, topicAttempts, settings, saved] = await Promise.all([
    env.DB.prepare("SELECT exam_track,stage_id,unlocked_at FROM stage_unlocks WHERE user_id=?").bind(user.id).all(),
    env.DB.prepare("SELECT exam_track,topic_id,stage_id,unlocked_at FROM topic_stage_unlocks WHERE user_id=?").bind(user.id).all(),
    env.DB.prepare("SELECT exam_track,stage_id,difficulty,score,passed,question_set_id,completed_at FROM stage_attempts WHERE user_id=? ORDER BY completed_at DESC LIMIT 200").bind(user.id).all(),
    env.DB.prepare("SELECT exam_track,topic_id,stage_id,difficulty,score,passed,question_set_id,completed_at FROM topic_stage_attempts WHERE user_id=? ORDER BY completed_at DESC LIMIT 500").bind(user.id).all(),
    env.DB.prepare("SELECT minimum_difficulty FROM user_settings WHERE user_id=?").bind(user.id).first(),
    env.DB.prepare("SELECT snapshot,updated_at FROM user_progress WHERE user_id=?").bind(user.id).first()
  ]);
  let snapshot = null;
  try { snapshot = saved?.snapshot ? JSON.parse(saved.snapshot) : null; } catch {}
  return json({ unlocks: unlocks.results, topicUnlocks: topicUnlocks.results, attempts: attempts.results, topicAttempts: topicAttempts.results, minimumDifficulty: settings?.minimum_difficulty || "beginner", snapshot, updatedAt: saved?.updated_at || null });
}
export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const body = await readJson(request);
  if (!body || !body.snapshot || typeof body.snapshot !== "object") return fail("Invalid progress snapshot.");
  const snapshot = JSON.stringify(body.snapshot);
  if (snapshot.length > 500000) return fail("Progress snapshot is too large.", 413);
  await env.DB.prepare(`INSERT INTO user_progress (user_id,snapshot,updated_at) VALUES (?,?,CURRENT_TIMESTAMP)
    ON CONFLICT(user_id) DO UPDATE SET snapshot=excluded.snapshot,updated_at=CURRENT_TIMESTAMP`)
    .bind(user.id,snapshot).run();
  return json({ ok: true });
}
