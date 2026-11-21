# Individual accounts and exam progression — setup guide

This work is isolated on `feature/individual-accounts-exam-engine`. It does not change the existing landing page, Command Centre, lesson content, question banks, CSS, or production `main` branch.

## Cloudflare Pages setup

1. In the Cloudflare dashboard, open the D1 section and create a database, e.g. `transition-phase-users`.
2. Run `migrations/0001_accounts_progress.sql` against that D1 database.
3. In the Pages project `transition-phase`, add a D1 binding named **DB** pointing to that database for both Preview and Production environments. Do not deploy this branch to production yet.
4. Add these encrypted environment variables for the Preview environment first:
   - `ADMIN_EMAIL` = `malakargorav@gmail.com`
   - `ADMIN_BOOTSTRAP_TOKEN` = a new, random secret of at least 32 characters. Generate it privately; never paste it into GitHub or chat.
5. Deploy this branch only to a Cloudflare Pages Preview URL after the bindings are set.

## First admin registration

The first registration request using the configured admin email must also include `adminBootstrapToken` with the secret above. This creates the one admin account and approves it. Keep the token private; remove/rotate it in Cloudflare after the admin account is created. No default password is included in the repository.

## Current API routes

- `POST /api/auth/register` — student registration; accounts start as pending.
- `POST /api/auth/login` — approved-account login.
- `POST /api/auth/logout` — revoke current session.
- `GET /api/auth/me` — current session.
- `GET /api/admin/users` — admin-only user list.
- `POST /api/admin/users` — admin-only approve/reject/revoke action.
- `POST /api/progress/attempt` — stores a user's stage result; server enforces 80% and per-user unlocks.
- `GET /api/progress/state` — returns only the signed-in user's attempts and unlocks.

## Security and current scope

- Passwords are PBKDF2-SHA-256 hashed with per-user random salts (310,000 iterations); plaintext passwords are never stored.
- Sessions are random 256-bit tokens stored as SHA-256 hashes and sent in Secure, HttpOnly, SameSite=Lax cookies.
- Every progress read/write is scoped to the authenticated user; role checks happen server-side.
- Admin is bootstrapped only when both the configured email and one-time secret match. Public registration cannot assign an admin role.
- Student email ownership is not yet verified by an email provider. Admin should independently verify a student's identity before approving. Add email verification / password reset before broad public launch.
- The API accepts question-set IDs and scores from the browser; this is a first backend foundation, not tamper-proof exam delivery. Before real high-stakes use, move question selection, answer validation, scoring, randomization, and stage progression fully server-side.
- Existing localStorage progress remains untouched. These endpoints are not wired into the existing UI yet.
- Do not merge to `main` or enable Production bindings until preview testing and explicit approval.
