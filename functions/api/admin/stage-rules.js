import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";
const levels = ["beginner","intermediate","advanced"];
export async function onRequestGet({ request, env }) {
  const actor = await currentUser(request, env.DB);
  if (!actor || actor.role !== "admin") return fail("Admin access required.", 403);
  const { results } = await env.DB.prepare("SELECT exam_track,stage_id,minimum_difficulty,updated_at FROM stage_rules ORDER BY exam_track,stage_id").all();
  return json({ rules: results });
}
export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const actor = await currentUser(request, env.DB);
  if (!actor || actor.role !== "admin") return fail("Admin access required.", 403);
  const body = await readJson(request);
  if (!body || !["si","constable"].includes(body.examTrack) || typeof body.stageId !== "string" ||
      !/^stage-[1-5]$/.test(body.stageId) || !levels.includes(body.minimumDifficulty)) return fail("Invalid stage rule.");
  await env.DB.prepare(`INSERT INTO stage_rules (exam_track,stage_id,minimum_difficulty,updated_at,updated_by)
    VALUES (?,?,?,CURRENT_TIMESTAMP,?)
    ON CONFLICT(exam_track,stage_id) DO UPDATE SET minimum_difficulty=excluded.minimum_difficulty,
    updated_at=CURRENT_TIMESTAMP,updated_by=excluded.updated_by`)
    .bind(body.examTrack,body.stageId,body.minimumDifficulty,actor.id).run();
  return json({ ok: true });
}
