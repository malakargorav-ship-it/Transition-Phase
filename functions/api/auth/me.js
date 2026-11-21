import { json, currentUser } from "../_lib/auth.js";
export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ error: "Account service is not configured yet." }, 503);
  const user = await currentUser(request, env.DB);
  if (!user) return json({ user: null }, 200);
  return json({ user: { id: user.id, email: user.email, role: user.role, difficulty: user.difficulty } });
}
