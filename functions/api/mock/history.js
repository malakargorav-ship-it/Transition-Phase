import { json, fail, currentUser } from "../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const result = await env.DB.prepare(
    "SELECT id,exam_track,correct_count,wrong_count,unattempted_count,score,total_marks,accuracy,completed_at " +
    "FROM full_mock_attempts WHERE user_id=? ORDER BY completed_at DESC LIMIT 50"
  ).bind(user.id).all();
  return json({ attempts: result.results || [] });
}
