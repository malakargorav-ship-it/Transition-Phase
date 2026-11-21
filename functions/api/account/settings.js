import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";
const levels = ["beginner","intermediate","advanced"];
export async function onRequestGet({ request, env }) {
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const [own,rule] = await Promise.all([
    env.DB.prepare("SELECT difficulty FROM users WHERE id=?").bind(user.id).first(),
    env.DB.prepare("SELECT MIN(minimum_difficulty) AS minimum_difficulty FROM stage_rules").first()
  ]);
  return json({ difficulty: own?.difficulty || "intermediate", minimumDifficulty: rule?.minimum_difficulty || "beginner" });
}
export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const body = await readJson(request);
  if (!body || !levels.includes(body.difficulty)) return fail("Select a valid difficulty.");
  await env.DB.prepare("UPDATE users SET difficulty=? WHERE id=?")
    .bind(body.difficulty,user.id).run();
  return json({ ok: true, difficulty: body.difficulty });
}
