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
 const [settings,rule]=await Promise.all([
  env.DB.prepare("SELECT difficulty FROM users WHERE id=?").bind(user.id).first(),
  env.DB.prepare("SELECT minimum_difficulty FROM stage_rules WHERE exam_track=? AND stage_id=?").bind(set.exam_track,set.stage_id).first()
 ]);
 const levels=["beginner","intermediate","advanced"];
 if(set.difficulty!==(settings?.difficulty||"intermediate")||levels.indexOf(set.difficulty)<levels.indexOf(rule?.minimum_difficulty||"beginner"))return fail("Account difficulty ya admin stage rule change ho gaya hai. Fresh question set start karo.",403);
 const questions=JSON.parse(set.questions_json),answerKey=JSON.parse(set.answer_key_json);
 if(!Array.isArray(answerKey)||!answerKey.length||body.answers.length!==answerKey.length||questions.length!==answerKey.length)return fail("Please answer every question before submitting.");
 const correct=answerKey.reduce((n,key,i)=>n+(body.answers[i]===key?1:0),0),total=answerKey.length,accuracy=Math.round(correct/total*100),passed=accuracy>=80,stageNo=Number(set.stage_id.slice(6));
 const attemptId=crypto.randomUUID(),claimToken=crypto.randomUUID();
 const statements=[
  env.DB.prepare("UPDATE question_sets SET submitted_at=? WHERE id=? AND user_id=? AND submitted_at IS NULL AND expires_at>?").bind(claimToken,set.id,user.id,new Date().toISOString()),
  env.DB.prepare("INSERT INTO stage_attempts (id,user_id,exam_track,stage_id,difficulty,score,passed,question_set_id) SELECT ?,?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM question_sets WHERE id=? AND user_id=? AND submitted_at=?)").bind(attemptId,user.id,set.exam_track,set.stage_id,set.difficulty,accuracy,passed?1:0,set.id,set.id,user.id,claimToken)
 ];
 if(passed){
  statements.push(env.DB.prepare("INSERT OR IGNORE INTO stage_unlocks (user_id,exam_track,stage_id) SELECT ?,?,? WHERE EXISTS (SELECT 1 FROM stage_attempts WHERE question_set_id=? AND user_id=? AND passed=1)").bind(user.id,set.exam_track,set.stage_id,set.id,user.id));
  if(stageNo<5)statements.push(env.DB.prepare("INSERT OR IGNORE INTO stage_unlocks (user_id,exam_track,stage_id) SELECT ?,?,? WHERE EXISTS (SELECT 1 FROM stage_attempts WHERE question_set_id=? AND user_id=? AND passed=1)").bind(user.id,set.exam_track,"stage-"+(stageNo+1),set.id,user.id));
 }
 const results=await env.DB.batch(statements);
 if(!results[0]?.meta||results[0].meta.changes!==1)return fail("This question set has expired or was already submitted.",409);
 return json({ok:true,correct,total,accuracy,passed,threshold:80,stageId:set.stage_id,unlockedStage:passed&&stageNo<5?"stage-"+(stageNo+1):null,explanations:questions.map((q,i)=>({id:q.id,correctIndex:answerKey[i],explanation:body.answers[i]===answerKey[i]?q.explanation:"Correct answer: "+q.options[answerKey[i]]+". "+q.explanation}))});
}
