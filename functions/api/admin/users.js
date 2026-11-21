import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";

export async function onRequestGet({ request, env }) {
  const actor = await currentUser(request, env.DB);
  if (!actor || actor.role !== "admin") return fail("Admin access required.", 403);
  const { results } = await env.DB.prepare("SELECT id,email,role,status,difficulty,created_at FROM users ORDER BY created_at DESC LIMIT 500").all();
  return json({ users: results });
}

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const actor = await currentUser(request, env.DB);
  if (!actor || actor.role !== "admin") return fail("Admin access required.", 403);
  const body = await readJson(request);
  const allowed = ["approved","rejected","revoked"];
  if (!body || typeof body.userId !== "string" || !allowed.includes(body.status)) return fail("Invalid user status.");
  const target = await env.DB.prepare("SELECT id,role FROM users WHERE id=?").bind(body.userId).first();
  if (!target) return fail("User not found.", 404);
  if (target.role === "admin") return fail("Admin account status cannot be changed here.", 403);
  await env.DB.prepare("UPDATE users SET status=?,approved_at=CASE WHEN ?='approved' THEN CURRENT_TIMESTAMP ELSE approved_at END,approved_by=? WHERE id=?")
    .bind(body.status,body.status,actor.id,body.userId).run();
  if (body.status !== "approved") await env.DB.prepare("DELETE FROM sessions WHERE user_id=?").bind(body.userId).run();
  return json({ ok: true, status: body.status });
}
