import { fail } from "../_lib/auth.js";
export async function onRequestPost(){return fail("Direct score submission is disabled. Use /api/exam/start and /api/exam/submit.",410);}
