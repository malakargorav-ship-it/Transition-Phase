import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";
const levels = ["beginner","intermediate","advanced"];
export async function onRequestGet({ request, env }) {
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const own = await env.DB.prepare("SELECT difficulty,minimum_difficulty FROM user_settings WHERE user_id=?").bind(user.id).first();
  return json({ difficulty: own?.difficulty || "intermediate", minimumDifficulty: own?.minimum_difficulty || "beginner" });
}
export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const body = await readJson(request);
  if (!body || !levels.includes(body.difficulty)) return fail("Select a valid difficulty.");
  await env.DB.prepare("UPDATE user_settings SET difficulty=?,updated_at=CURRENT_TIMESTAMP WHERE user_id=?")
    .bind(body.difficulty,user.id).run();
  return json({ ok: true, difficulty: body.difficulty });
}
