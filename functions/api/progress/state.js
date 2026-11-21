import { json, fail, currentUser } from "../_lib/auth.js";
export async function onRequestGet({ request, env }) {
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const [unlocks, attempts, settings] = await Promise.all([
    env.DB.prepare("SELECT exam_track,stage_id,unlocked_at FROM stage_unlocks WHERE user_id=?").bind(user.id).all(),
    env.DB.prepare("SELECT exam_track,stage_id,difficulty,score,passed,question_set_id,completed_at FROM stage_attempts WHERE user_id=? ORDER BY completed_at DESC LIMIT 200").bind(user.id).all(),
    env.DB.prepare("SELECT minimum_difficulty FROM user_settings WHERE user_id=?").bind(user.id).first()
  ]);
  return json({ unlocks: unlocks.results, attempts: attempts.results, minimumDifficulty: settings?.minimum_difficulty || "beginner" });
}
