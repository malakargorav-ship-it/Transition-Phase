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

## Constable model-practice starter banks
- [ ] Sign in with an approved account and select the General Constable track; confirm the five clearly labelled starter topics are enabled.
- [ ] Switch to SI; confirm the Constable starter topics are disabled and a direct API request for one is rejected.
- [ ] Sign out or use guest mode; confirm Constable starter topics are disabled and existing guest banks continue to work.
- [ ] Start each starter topic; confirm only question text/options are returned before submission and the number of questions matches the small bank size.
- [ ] Submit each set; confirm server-side scoring and explanations are returned once, and a second submission is rejected.
- [ ] Confirm these starter topics are not described as PYQs or full-length mock tests.

## Cloud progress refresh
- [ ] Complete a stage, sign out, and sign back in without changing devices; confirm the local view refreshes from the server snapshot and unlock records.
- [ ] Sign in to the same account on a second browser/device; confirm server snapshot and stage unlocks are reflected.
- [ ] Temporarily make the progress API unavailable; confirm account UI still loads and local progress is not erased.
- [ ] Sign in as a different account on the same browser; confirm the previous account's local progress is not shown.

## Other Maths topic progression
- [ ] For each of the 22 additional Maths topics, start Stage 1 while signed in; confirm question text/options are returned without answer keys.
- [ ] Submit a complete test; confirm score and explanations are returned only after submission.
- [ ] Confirm 80% unlocks Stage 2 for that topic and track only.
- [ ] Confirm below 80% leaves the next stage locked.
- [ ] Confirm topic A progress does not unlock topic B.
- [ ] Complete a topic exam, sign out and back in, and verify its server-recorded attempt and unlock remain available.
- [ ] Confirm the admin rule list displays both Number System and topic-stage rules after saving either rule.
- [ ] Set an admin minimum difficulty for a topic stage and confirm lower preference is rejected.
- [ ] Confirm guest mode still uses the original local practice flow.

## Automated repository checks
- [ ] Confirm migrations 0001–0006 apply in sequence to a fresh SQLite database and required tables/columns plus foreign-key integrity validate.
- [ ] Confirm automated Node tests cover password hashing, unique salts, session-cookie security flags, same-origin enforcement, approved-account session checks, Constable-only starter restrictions and answer-key isolation.
- [ ] Confirm progress API regression tests enforce per-user query scoping, reject cross-origin writes and reject oversized snapshots.
- [ ] Confirm topic-exam submit regression tests cover server scoring, pass/fail unlock behavior, expired/used sets, incomplete submissions and atomic D1 claim behavior.
- [ ] Confirm GitHub Actions runs `Validate exam data and JavaScript` on the pull request.
- [ ] Confirm the data validator reports all records and no duplicate IDs, invalid category codes or answer mismatches.
- [ ] Confirm JavaScript syntax and `git diff --check` jobs pass.

## Known blockers before public production use
- Number System and the 22 additional existing Maths topics now have server-issued, server-scored five-stage engines. GK, Assam GK, English, Reasoning and Current Affairs question banks are not added by this change.
- Email verification and password reset are not implemented. Admin must independently verify identity before approving students. Login is rate-limited after repeated failed attempts.
- Difficulty preferences are stored and checked against stage minimums, but question banks still need explicit Beginner/Intermediate/Advanced tagging.
- Current Affairs, GK and Assam GK question content is not added by this change.
- Test responsive layout on iPhone and desktop before merging.
