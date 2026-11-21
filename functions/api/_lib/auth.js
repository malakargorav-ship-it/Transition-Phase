const encoder = new TextEncoder();
const ITERATIONS = 310000;
const SESSION_DAYS = 7;

export const json = (data, status = 200, extraHeaders = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extraHeaders }
  });

export const fail = (message, status = 400) => json({ error: message }, status);

export function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  const headers = { "Vary": "Origin" };
  if (origin) {
    const url = new URL(request.url);
    if (origin === url.origin) headers["Access-Control-Allow-Origin"] = origin;
  }
  headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS";
  headers["Access-Control-Allow-Headers"] = "Content-Type";
  headers["Access-Control-Allow-Credentials"] = "true";
  return headers;
}

export async function readJson(request) {
  try { return await request.json(); } catch { return null; }
}

export function validEmail(value) {
  return typeof value === "string" && value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function hashPassword(password, saltHex, iterations = ITERATIONS) {
  const salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const material = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, material, 256);
  return { hash: bytesToHex(new Uint8Array(bits)), salt: bytesToHex(salt), iterations };
}

export async function verifyPassword(password, user) {
  const result = await hashPassword(password, user.password_salt, user.password_iterations);
  return constantTimeEqual(result.hash, user.password_hash);
}

function bytesToHex(bytes) { return [...bytes].map(x => x.toString(16).padStart(2, "0")).join(""); }
function hexToBytes(hex) { return new Uint8Array(hex.match(/.{2}/g).map(x => parseInt(x, 16))); }
function constantTimeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0; for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
async function sha256(value) {
  return bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))));
}
function randomToken() {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
}

export async function createSession(db, userId) {
  const token = randomToken();
  const tokenHash = await sha256(token);
  const expires = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString();
  await db.prepare("INSERT INTO sessions (token_hash,user_id,expires_at) VALUES (?,?,?)")
    .bind(tokenHash, userId, expires).run();
  return { token, expires };
}

export function sessionCookie(token, expires) {
  return `tp_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Expires=${new Date(expires).toUTCString()}`;
}
export const clearSessionCookie = "tp_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0";

export async function currentUser(request, db) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|;\\s*)tp_session=([a-f0-9]{64})(?:;|$)/);
  if (!match) return null;
  const tokenHash = await sha256(match[1]);
  const row = await db.prepare(`SELECT u.id,u.email,u.role,u.status,u.difficulty,s.expires_at
    FROM sessions s JOIN users u ON u.id=s.user_id
    WHERE s.token_hash=? AND s.expires_at > ?`).bind(tokenHash, new Date().toISOString()).first();
  if (!row || row.status !== "approved") return null;
  return row;
}

export function uuid() { return crypto.randomUUID(); }
export function isSameOrigin(request) {
  const origin = request.headers.get("Origin");
  return !origin || origin === new URL(request.url).origin;
}
