import { json, clearSessionCookie, isSameOrigin } from "../_lib/auth.js";
export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return json({ error: "Cross-origin request blocked." }, 403);
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/(?:^|;\\s*)tp_session=([a-f0-9]{64})(?:;|$)/);
  if (match && env.DB) {
    const bytes = new TextEncoder();
    const hash = [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes.encode(match[1])))]
      .map(x => x.toString(16).padStart(2, "0")).join("");
    await env.DB.prepare("DELETE FROM sessions WHERE token_hash=?").bind(hash).run();
  }
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie });
}
