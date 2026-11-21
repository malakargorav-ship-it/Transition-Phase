import { json, fail, readJson, validEmail, hashPassword, createSession, sessionCookie, uuid, isSameOrigin } from "../_lib/auth.js";

const encoder = new TextEncoder();
async function rateKey(ip) {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode("register-ip:" + ip)));
  return [...digest].map(x => x.toString(16).padStart(2, "0")).join("");
}
async function registrationBlocked(db, key) {
  const row = await db.prepare("SELECT blocked_until FROM auth_rate_limits WHERE key_hash=?").bind(key).first();
  return Boolean(row?.blocked_until && new Date(row.blocked_until).getTime() > Date.now());
}
async function recordRegistrationAttempt(db, key) {
  await db.prepare(`INSERT INTO auth_rate_limits (key_hash,attempts,window_started_at,blocked_until)
    VALUES (?,1,CURRENT_TIMESTAMP,NULL)
    ON CONFLICT(key_hash) DO UPDATE SET
    attempts=CASE WHEN window_started_at < datetime('now','-15 minutes') THEN 1 ELSE attempts+1 END,
    window_started_at=CASE WHEN window_started_at < datetime('now','-15 minutes') THEN CURRENT_TIMESTAMP ELSE window_started_at END,
    blocked_until=CASE WHEN (CASE WHEN window_started_at < datetime('now','-15 minutes') THEN 1 ELSE attempts+1 END)>=8
      THEN datetime('now','+15 minutes') ELSE blocked_until END`).bind(key).run();
}

export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  if (!env.DB) return fail("Account service is not configured yet.", 503);
  const body = await readJson(request);
  if (!body || !validEmail(body.email) || typeof body.password !== "string" || body.password.length < 12 || body.password.length > 128) {
    return fail("Valid email aur 12–128 character password required hai.");
  }
  const email = body.email.trim().toLowerCase();
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = await rateKey(ip);
  if (await registrationBlocked(env.DB, key)) return fail("Too many registration attempts. 15 minutes baad try karo.", 429);
  await recordRegistrationAttempt(env.DB, key);
  const existing = await env.DB.prepare("SELECT id FROM users WHERE email=?").bind(email).first();
  if (existing) return fail("Is email se account already registered hai.", 409);

  const isAdminEmail = email === String(env.ADMIN_EMAIL || "").trim().toLowerCase();
  const isAdminBootstrap = isAdminEmail && typeof env.ADMIN_BOOTSTRAP_TOKEN === "string" &&
    env.ADMIN_BOOTSTRAP_TOKEN.length >= 32 && body.adminBootstrapToken === env.ADMIN_BOOTSTRAP_TOKEN;
  if (isAdminEmail && !isAdminBootstrap) return fail("Admin email requires the private bootstrap token.", 403);

  const id = uuid();
  const credentials = await hashPassword(body.password);

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
