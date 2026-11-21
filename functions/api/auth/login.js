import { json, fail, readJson, validEmail, verifyPassword, createSession, sessionCookie, isSameOrigin } from "../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  if (!env.DB) return fail("Account service is not configured yet.", 503);
  const body = await readJson(request);
  if (!body || !validEmail(body.email) || typeof body.password !== "string") return fail("Email aur password required hai.");
  const user = await env.DB.prepare("SELECT * FROM users WHERE email=?").bind(body.email.trim().toLowerCase()).first();
  if (!user || !(await verifyPassword(body.password, user))) return fail("Email ya password incorrect hai.", 401);
  if (user.status !== "approved") {
    const message = user.status === "pending" ? "Account admin approval ka wait kar raha hai." :
      user.status === "rejected" ? "Registration approve nahi hua." : "Account access revoke kiya gaya hai.";
    return fail(message, 403);
  }
  const session = await createSession(env.DB, user.id);
  return json({ ok: true, user: { id: user.id, email: user.email, role: user.role, difficulty: user.difficulty } },
    200, { "Set-Cookie": sessionCookie(session.token, session.expires) });
}
