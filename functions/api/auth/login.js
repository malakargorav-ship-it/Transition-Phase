import { json, fail, readJson, validEmail, verifyPassword, createSession, sessionCookie, isSameOrigin } from "../_lib/auth.js";
const encoder=new TextEncoder();
async function digest(value){const bytes=new Uint8Array(await crypto.subtle.digest("SHA-256",encoder.encode(value)));return [...bytes].map(x=>x.toString(16).padStart(2,"0")).join("");}
async function rateKeys(email,ip){return [await digest("email:"+email),await digest("email-ip:"+email+":"+ip)];}
async function blocked(db,keys){for(const key of keys){const row=await db.prepare("SELECT blocked_until FROM auth_rate_limits WHERE key_hash=?").bind(key).first();if(row?.blocked_until&&new Date(row.blocked_until).getTime()>Date.now())return true;}return false;}
async function recordFailure(db,keys){for(const key of keys){await db.prepare(`INSERT INTO auth_rate_limits (key_hash,attempts,window_started_at,blocked_until)
 VALUES (?,1,CURRENT_TIMESTAMP,NULL)
 ON CONFLICT(key_hash) DO UPDATE SET
 attempts=CASE WHEN window_started_at < datetime('now','-15 minutes') THEN 1 ELSE attempts+1 END,
 window_started_at=CASE WHEN window_started_at < datetime('now','-15 minutes') THEN CURRENT_TIMESTAMP ELSE window_started_at END,
 blocked_until=CASE WHEN (CASE WHEN window_started_at < datetime('now','-15 minutes') THEN 1 ELSE attempts+1 END)>=8
 THEN datetime('now','+15 minutes') ELSE blocked_until END`).bind(key).run();}}
export async function onRequestPost({request,env}){
 if(!isSameOrigin(request))return fail("Cross-origin request blocked.",403);
 if(!env.DB)return fail("Account service is not configured yet.",503);
 const body=await readJson(request);
 if(!body||!validEmail(body.email)||typeof body.password!=="string")return fail("Email aur password required hai.");
 const email=body.email.trim().toLowerCase(),ip=request.headers.get("CF-Connecting-IP")||"unknown",keys=await rateKeys(email,ip);
 if(await blocked(env.DB,keys))return fail("Too many login attempts. 15 minutes baad try karo.",429);
 const user=await env.DB.prepare("SELECT * FROM users WHERE email=?").bind(email).first();
 if(!user||!(await verifyPassword(body.password,user))){await recordFailure(env.DB,keys);return fail("Email ya password incorrect hai.",401);}
 if(user.status!=="approved"){
  const message=user.status==="pending"?"Account admin approval ka wait kar raha hai.":user.status==="rejected"?"Registration approve nahi hua.":"Account access revoke kiya gaya hai.";
  return fail(message,403);
 }
 await Promise.all(keys.map(key=>env.DB.prepare("DELETE FROM auth_rate_limits WHERE key_hash=?").bind(key).run()));
 const session=await createSession(env.DB,user.id);
 return json({ok:true,user:{id:user.id,email:user.email,role:user.role,difficulty:user.difficulty}},200,{"Set-Cookie":sessionCookie(session.token,session.expires)});
}