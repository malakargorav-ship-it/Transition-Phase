import { json, fail, currentUser, readJson, isSameOrigin, uuid } from "../_lib/auth.js";

const difficulties = ["beginner","intermediate","advanced"];
export async function onRequestPost({ request, env }) {
  if (!isSameOrigin(request)) return fail("Cross-origin request blocked.", 403);
  const user = await currentUser(request, env.DB);
  if (!user) return fail("Login required.", 401);
  const body = await readJson(request);
  if (!body || !["si","constable"].includes(body.examTrack) || typeof body.stageId !== "string" ||
      !/^stage-[1-5]$/.test(body.stageId) || !difficulties.includes(body.difficulty) ||
      !Number.isInteger(body.score) || body.score < 0 || body.score > 100 ||
      typeof body.questionSetId !== "string" || body.questionSetId.length > 100) return fail("Invalid attempt data.");

  const settings = await env.DB.prepare("SELECT difficulty FROM user_settings WHERE user_id=?").bind(user.id).first();
  if (body.difficulty !== (settings?.difficulty || "intermediate")) return fail("Attempt difficulty does not match your saved profile.", 403);
  const rule = await env.DB.prepare("SELECT minimum_difficulty FROM stage_rules WHERE exam_track=? AND stage_id=?").bind(body.examTrack,body.stageId).first();
  const rank = difficulties.indexOf(body.difficulty);
  const minimum = difficulties.indexOf(rule?.minimum_difficulty || "beginner");
  if (rank < minimum) return fail("Is stage ke liye selected difficulty admin minimum se kam hai.", 403);

  const firstStage = body.stageId === "stage-1";
  if (!firstStage) {
    const previous = body.stageId.match(/^stage-(\d+)$/);
    if (!previous) return fail("Unknown stage.", 400);
    const prevId = `stage-${Number(previous[1])-1}`;
    const unlocked = await env.DB.prepare("SELECT 1 FROM stage_unlocks WHERE user_id=? AND exam_track=? AND stage_id=?")
      .bind(user.id,body.examTrack,prevId).first();
    if (!unlocked) return fail("Previous stage pass kiye bina yeh stage unlock nahi hoga.", 403);
  }

  const passed = body.score >= 80;
  await env.DB.prepare("INSERT INTO stage_attempts (id,user_id,exam_track,stage_id,difficulty,score,passed,question_set_id) VALUES (?,?,?,?,?,?,?,?)")
    .bind(uuid(),user.id,body.examTrack,body.stageId,body.difficulty,body.score,passed ? 1 : 0,body.questionSetId).run();

  if (passed) {
    await env.DB.prepare("INSERT OR IGNORE INTO stage_unlocks (user_id,exam_track,stage_id) VALUES (?,?,?)")
      .bind(user.id,body.examTrack,body.stageId).run();
    const next = body.stageId.match(/^stage-(\d+)$/);
    if (next) {
      const nextId = `stage-${Number(next[1])+1}`;
      await env.DB.prepare("INSERT OR IGNORE INTO stage_unlocks (user_id,exam_track,stage_id) VALUES (?,?,?)")
        .bind(user.id,body.examTrack,nextId).run();
    }
  }
  return json({ ok: true, passed, threshold: 80, unlockedNext: passed });
}
