# Preview test checklist — accounts and progress

Run this checklist only after the Preview D1 binding and secrets are configured and migrations 0001–0003 have been applied.

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

## Known blockers before public production use
- Question banks and answer checking still run in browser JavaScript; a user can tamper with a submitted score. Server-side question delivery and scoring must replace this before stage progression is treated as secure.
- Email verification and password reset are not implemented. Admin must independently verify identity before approving students.
- Difficulty preferences are stored and checked against stage minimums, but question banks still need explicit Beginner/Intermediate/Advanced tagging.
- Current Affairs, GK and Assam GK question content is not added by this change.
- Test responsive layout on iPhone and desktop before merging.
