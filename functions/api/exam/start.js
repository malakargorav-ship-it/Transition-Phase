import { json, fail, currentUser, readJson, isSameOrigin, uuid } from "../_lib/auth.js";
import { numberSystemStages } from "../_lib/number-system-banks.js";
const difficulties=["beginner","intermediate","advanced"],stages=["stage-1","stage-2","stage-3","stage-4","stage-5"];
function shuffle(items){const copy=items.slice();for(let i=copy.length-1;i>0;i--){const j=crypto.getRandomValues(new Uint32Array(1))[0]%(i+1);[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
export async function onRequestPost({request,env}){
 if(!isSameOrigin(request))return fail("Cross-origin request blocked.",403);
 const user=await currentUser(request,env.DB);if(!user)return fail("Login required.",401);
 const body=await readJson(request);if(!body||!["si","constable"].includes(body.examTrack)||!stages.includes(body.stageId))return fail("Invalid exam stage.");
 const settings=await env.DB.prepare("SELECT difficulty FROM user_settings WHERE user_id=?").bind(user.id).first();
 const difficulty=settings?.difficulty||"intermediate";
 const rule=await env.DB.prepare("SELECT minimum_difficulty FROM stage_rules WHERE exam_track=? AND stage_id=?").bind(body.examTrack,body.stageId).first();
 if(difficulties.indexOf(difficulty)<difficulties.indexOf(rule?.minimum_difficulty||"beginner"))return fail("Is stage ke liye admin ne higher minimum difficulty set ki hai.",403);
 const stageNo=Number(body.stageId.slice(6));
 if(stageNo>1){const previous=await env.DB.prepare("SELECT 1 FROM stage_unlocks WHERE user_id=? AND exam_track=? AND stage_id=?").bind(user.id,body.examTrack,"stage-"+(stageNo-1)).first();if(!previous)return fail("Previous stage ko 80% se clear karna zaroori hai.",403);}
 const bank=numberSystemStages["stage"+stageNo];if(!Array.isArray(bank)||!bank.length)return fail("Question bank is not configured.",503);
 const selected=shuffle(bank).slice(0,stageNo===1?20:bank.length),id=uuid();
 const questions=selected.map((q,index)=>({id:index,question:q[0],options:q[1]})),answers=selected.map(q=>q[2]);
 const expires=new Date(Date.now()+30*60*1000).toISOString();
 await env.DB.prepare("INSERT INTO question_sets (id,user_id,exam_track,stage_id,difficulty,questions_json,answer_key_json,expires_at) VALUES (?,?,?,?,?,?,?,?)").bind(id,user.id,body.examTrack,body.stageId,difficulty,JSON.stringify(questions),JSON.stringify(answers),expires).run();
 return json({questionSetId:id,examTrack:body.examTrack,stageId:body.stageId,difficulty,expiresAt:expires,questions});
}