# Preview test checklist — accounts and progress

Run this checklist only after the Preview D1 binding and secrets are configured and migrations 0001–0006 have been applied.

## Authentication
- [ ] Register the configured admin email with the private bootstrap token.
- [ ] Confirm the account is the only admin and is signed in.
- [ ] Remove/rotate the bootstrap token in Cloudflare after bootstrap.
- [ ] Register a normal student account; confirm it is pending.
- [ ] Confirm pending student login is blocked.
- [ ] Approve the student from the admin panel; confirm login succeeds.
- [ ] Reject a pending account and confirm it cannot log in.
- [ ] Revoke an approved account and confirm its active sessions stop working.
- [ ] Confirm the reserved admin email cannot be registered without the bootstrap token.

## Per-account progress
- [ ] Student A completes Number System Stage 1 with at least 80%; verify Stage 2 is unlocked in the account database.
- [ ] Student B completes Stage 1 below 80%; verify Stage 2 remains locked for B.
- [ ] Confirm B cannot submit Stage 2 directly through the API.
- [ ] Log out A and log in B; confirm the Command Centre shows B's own progress.
- [ ] Log in A again; confirm A's progress is restored.
- [ ] Change A's difficulty and confirm it persists after logout/login.
- [ ] Set a higher minimum stage difficulty as admin; confirm attempts below that minimum are rejected.
- [ ] Confirm each new practice set randomizes question order.
- [ ] Confirm existing guest progress is still present in guest mode.

## Other Maths topic progression
- [ ] For each of the 22 additional Maths topics, start Stage 1 while signed in; confirm question text/options are returned without answer keys.
- [ ] Submit a complete test; confirm score and explanations are returned only after submission.
- [ ] Confirm 80% unlocks Stage 2 for that topic and track only.
- [ ] Confirm below 80% leaves the next stage locked.
- [ ] Confirm topic A progress does not unlock topic B.
- [ ] Set an admin minimum difficulty for a topic stage and confirm lower preference is rejected.
- [ ] Confirm guest mode still uses the original local practice flow.

## Known blockers before public production use
- Number System and the 22 additional existing Maths topics now have server-issued, server-scored five-stage engines. GK, Assam GK, English, Reasoning and Current Affairs question banks are not added by this change.
- Email verification and password reset are not implemented. Admin must independently verify identity before approving students. Login is rate-limited after repeated failed attempts.
- Difficulty preferences are stored and checked against stage minimums, but question banks still need explicit Beginner/Intermediate/Advanced tagging.
- Current Affairs, GK and Assam GK question content is not added by this change.
- Test responsive layout on iPhone and desktop before merging.
