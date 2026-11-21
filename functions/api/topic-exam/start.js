import { json, fail, currentUser, readJson, isSameOrigin, uuid } from "../_lib/auth.js";
import { topicBanks } from "../_lib/topic-banks.js";
const levels=["beginner","intermediate","advanced"],stages=["stage-1","stage-2","stage-3","stage-4","stage-5"];
const allowed=new Set(Object.keys(topicBanks).filter(x=>x!=="number-system"));
function shuffle(items){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=crypto.getRandomValues(new Uint32Array(1))[0]%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export async function onRequestPost({request,env}){
 if(!isSameOrigin(request))return fail("Cross-origin request blocked.",403);
 const user=await currentUser(request,env.DB);if(!user)return fail("Login required.",401);
 const body=await readJson(request);
 if(!body||!allowed.has(body.topicId)||!["si","constable"].includes(body.examTrack)||!stages.includes(body.stageId))return fail("Invalid topic exam request.");
 const settings=await env.DB.prepare("SELECT difficulty FROM users WHERE id=?").bind(user.id).first(),difficulty=settings?.difficulty||"intermediate";
 const rule=await env.DB.prepare("SELECT minimum_difficulty FROM topic_stage_rules WHERE exam_track=? AND topic_id=? AND stage_id=?").bind(body.examTrack,body.topicId,body.stageId).first();
 if(levels.indexOf(difficulty)<levels.indexOf(rule?.minimum_difficulty||"beginner"))return fail("Admin ne is topic stage ke liye higher minimum difficulty set ki hai.",403);
 const n=Number(body.stageId.slice(6));
 if(n>1){const prev=await env.DB.prepare("SELECT 1 FROM topic_stage_unlocks WHERE user_id=? AND exam_track=? AND topic_id=? AND stage_id=?").bind(user.id,body.examTrack,body.topicId,"stage-"+(n-1)).first();if(!prev)return fail("Previous stage ko 80% se clear karna zaroori hai.",403);}
 const bank=topicBanks[body.topicId];if(!Array.isArray(bank)||bank.length<5)return fail("Is topic ka question bank abhi available nahi hai.",503);
 const count=Math.min(10,bank.length),selected=shuffle(bank).slice(0,count),id=uuid();
 const stored=selected.map((q,i)=>({id:i,question:q[0],options:q[1],explanation:q[3]})),questions=stored.map(({id,question,options})=>({id,question,options})),answers=selected.map(q=>q[2]);
 const expires=new Date(Date.now()+30*60*1000).toISOString();
 await env.DB.prepare("INSERT INTO topic_question_sets (id,user_id,exam_track,topic_id,stage_id,difficulty,questions_json,answer_key_json,expires_at) VALUES (?,?,?,?,?,?,?,?,?)").bind(id,user.id,body.examTrack,body.topicId,body.stageId,difficulty,JSON.stringify(stored),JSON.stringify(answers),expires).run();
 return json({questionSetId:id,topicId:body.topicId,examTrack:body.examTrack,stageId:body.stageId,difficulty,expiresAt:expires,questions});
}