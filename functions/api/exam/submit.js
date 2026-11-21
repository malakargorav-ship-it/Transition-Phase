import { json, fail, currentUser, readJson, isSameOrigin } from "../_lib/auth.js";
export async function onRequestPost({request,env}){
 if(!isSameOrigin(request))return fail("Cross-origin request blocked.",403);
 const user=await currentUser(request,env.DB);if(!user)return fail("Login required.",401);
 const body=await readJson(request);
 if(!body||typeof body.questionSetId!=="string"||!Array.isArray(body.answers)||body.answers.length>50||body.answers.some(x=>!Number.isInteger(x)||x<0||x>3))return fail("Invalid answer submission.");
 const set=await env.DB.prepare("SELECT * FROM question_sets WHERE id=? AND user_id=?").bind(body.questionSetId,user.id).first();
 if(!set)return fail("Question set not found.",404);
 if(set.submitted_at)return fail("This question set has already been submitted.",409);
 if(new Date(set.expires_at).getTime()<Date.now())return fail("Time expired. Start a fresh question set.",410);
 const questions=JSON.parse(set.questions_json),answerKey=JSON.parse(set.answer_key_json);
 if(body.answers.length!==answerKey.length||questions.length!==answerKey.length)return fail("Please answer every question before submitting.");
 const claimed=await env.DB.prepare("UPDATE question_sets SET submitted_at=CURRENT_TIMESTAMP WHERE id=? AND user_id=? AND submitted_at IS NULL AND expires_at>?").bind(set.id,user.id,new Date().toISOString()).run();
 if(!claimed.meta||claimed.meta.changes!==1)return fail("This question set has expired or was already submitted.",409);
 const correct=answerKey.reduce((n,key,i)=>n+(body.answers[i]===key?1:0),0),total=answerKey.length,accuracy=Math.round(correct/total*100),passed=accuracy>=80,stageNo=Number(set.stage_id.slice(6));
 await env.DB.prepare("INSERT INTO stage_attempts (id,user_id,exam_track,stage_id,difficulty,score,passed,question_set_id) VALUES (?,?,?,?,?,?,?,?)").bind(crypto.randomUUID(),user.id,set.exam_track,set.stage_id,set.difficulty,accuracy,passed?1:0,set.id).run();
 if(passed){await env.DB.prepare("INSERT OR IGNORE INTO stage_unlocks (user_id,exam_track,stage_id) VALUES (?,?,?)").bind(user.id,set.exam_track,set.stage_id).run();if(stageNo<5)await env.DB.prepare("INSERT OR IGNORE INTO stage_unlocks (user_id,exam_track,stage_id) VALUES (?,?,?)").bind(user.id,set.exam_track,"stage-"+(stageNo+1)).run();}
 return json({ok:true,correct,total,accuracy,passed,threshold:80,stageId:set.stage_id,unlockedStage:passed&&stageNo<5?"stage-"+(stageNo+1):null,explanations:questions.map((q,i)=>({id:q.id,correctIndex:answerKey[i],explanation:body.answers[i]===answerKey[i]?q.explanation:"Correct answer: "+q.options[answerKey[i]]+". "+q.explanation}))});
}