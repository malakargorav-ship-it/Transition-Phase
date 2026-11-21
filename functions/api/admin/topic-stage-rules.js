import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";
import { topicBanks } from "../_lib/topic-banks.js";
const topics=Object.keys(topicBanks).filter(x=>x!=="number-system"),levels=["beginner","intermediate","advanced"];
export async function onRequestGet({request,env}){
 const actor=await currentUser(request,env.DB);if(!actor||actor.role!=="admin")return fail("Admin access required.",403);
 const {results}=await env.DB.prepare("SELECT exam_track,topic_id,stage_id,minimum_difficulty,updated_at FROM topic_stage_rules ORDER BY exam_track,topic_id,stage_id").all();
 return json({topics,rules:results});
}
export async function onRequestPost({request,env}){
 if(!isSameOrigin(request))return fail("Cross-origin request blocked.",403);
 const actor=await currentUser(request,env.DB);if(!actor||actor.role!=="admin")return fail("Admin access required.",403);
 const b=await readJson(request);
 if(!b||!topics.includes(b.topicId)||!["si","constable"].includes(b.examTrack)||!/^stage-[1-5]$/.test(b.stageId)||!levels.includes(b.minimumDifficulty))return fail("Invalid topic stage rule.");
 await env.DB.prepare("INSERT INTO topic_stage_rules (exam_track,topic_id,stage_id,minimum_difficulty,updated_at,updated_by) VALUES (?,?,?,?,CURRENT_TIMESTAMP,?) ON CONFLICT(exam_track,topic_id,stage_id) DO UPDATE SET minimum_difficulty=excluded.minimum_difficulty,updated_at=CURRENT_TIMESTAMP,updated_by=excluded.updated_by").bind(b.examTrack,b.topicId,b.stageId,b.minimumDifficulty,actor.id).run();
 return json({ok:true});
}