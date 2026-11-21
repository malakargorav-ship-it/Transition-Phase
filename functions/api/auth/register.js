import { json, fail, readJson, validEmail, hashPassword, createSession, sessionCookie, uuid, isSameOrigin } from "../_lib/auth.js";

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  if (!env.DB) return fail("Account service is not configured yet.", 503);
  const body = await readJson(request);
  if (!body || !validEmail(body.email) || typeof body.password !== "string" || body.password.length < 12 || body.password.length > 128) {
    return fail("Valid email aur 12–128 character password required hai.");
  }
  const email = body.email.trim().toLowerCase();
  const existing = await env.DB.prepare("SELECT id FROM users WHERE email=?").bind(email).first();
  if (existing) return fail("Is email se account already registered hai.", 409);

  const id = uuid();
  const credentials = await hashPassword(body.password);
  const isAdminBootstrap = email === String(env.ADMIN_EMAIL || "").trim().toLowerCase() &&
    typeof env.ADMIN_BOOTSTRAP_TOKEN === "string" && env.ADMIN_BOOTSTRAP_TOKEN.length >= 32 &&
    body.adminBootstrapToken === env.ADMIN_BOOTSTRAP_TOKEN;

  const role = isAdminBootstrap ? "admin" : "student";
  const status = isAdminBootstrap ? "approved" : "pending";
  try {
    await env.DB.prepare(`INSERT INTO users
      (id,email,password_hash,password_salt,password_iterations,role,status)
      VALUES (?,?,?,?,?,?,?)`).bind(id,email,credentials.hash,credentials.salt,credentials.iterations,role,status).run();
  } catch {
    return fail("Account create nahi ho paaya. Email pehle se registered ho sakta hai.", 409);
  }
  await env.DB.prepare("INSERT INTO user_settings (user_id) VALUES (?)").bind(id).run();

  if (!isAdminBootstrap) return json({ ok: true, status: "pending", message: "Registration received. Admin approval ke baad login kar paoge." }, 201);
  const session = await createSession(env.DB, id);
  return json({ ok: true, status: "approved", role }, 201, { "Set-Cookie": sessionCookie(session.token, session.expires) });
}
