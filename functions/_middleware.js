import { currentUser, json } from "./api/_lib/auth.js";

const PUBLIC_PATHS = new Set([
  "/", "/index.html",
  "/login", "/login.html", "/login.js",
  "/app.js", "/motion.js", "/spotlight.js",
  "/styles.css", "/motion.css", "/spotlight.css",
  "/favicon.svg",
  "/api/auth/login", "/api/auth/register", "/api/auth/me", "/api/auth/logout",
  "/api/health"
]);

function loginRedirect(request) {
  const url = new URL(request.url);
  const next = url.pathname + url.search;
  const target = new URL("/login.html", url.origin);
  if (next !== "/login.html" && next !== "/login" && !next.startsWith("/api/")) {
    target.searchParams.set("next", next);
  }
  return Response.redirect(target.toString(), 302);
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname.length > 1 && url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
  if (PUBLIC_PATHS.has(path)) return next();

  // Public presentation assets are not study content or application data.
  const extension = path.includes(".") ? path.slice(path.lastIndexOf(".")).toLowerCase() : "";
  if ([".css", ".svg", ".png", ".jpg", ".jpeg", ".webp", ".ico", ".woff", ".woff2"].includes(extension)) return next();

  // All study pages, question banks, application JavaScript and non-auth APIs
  // require a valid, approved server-side session.
  if (!env.DB) {
    if (path.startsWith("/api/")) return json({ error: "Login service is unavailable." }, 503);
    return loginRedirect(request);
  }
  const user = await currentUser(request, env.DB);
  if (!user) {
    if (path.startsWith("/api/")) return json({ error: "Login required." }, 401);
    return loginRedirect(request);
  }

  // Authenticated study pages must never be stored in a shared or browser cache.
  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
