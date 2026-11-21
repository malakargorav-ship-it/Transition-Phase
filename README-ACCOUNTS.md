# Individual accounts and exam progression — setup guide

This implementation is isolated on `feature/individual-accounts-exam-engine`. The landing page design, lesson pages, syllabus and question content are preserved. The Command Centre now contains the account UI; no production branch has been changed.

## Cloudflare Pages setup

1. Create a D1 database, e.g. `transition-phase-users`.
2. Apply migrations in order:
   - `migrations/0001_accounts_progress.sql`
   - `migrations/0002_stage_rules.sql`
   - `migrations/0003_user_progress.sql`\n   - `migrations/0004_question_sets.sql`
3. In Cloudflare Pages project `transition-phase`, add a D1 binding named **DB** to this database for the Preview environment first.
4. Add encrypted Preview environment variables:
   - `ADMIN_EMAIL` = `malakargorav@gmail.com`
   - `ADMIN_BOOTSTRAP_TOKEN` = a newly generated random secret of at least 32 characters. Generate and keep it private; never commit it or paste it into chat.
5. Deploy the feature branch to a Cloudflare Pages Preview URL only.

## First admin registration

Open the Preview Command Centre. Register using the configured admin email and the private bootstrap token. This creates the only admin account and approves it. After successful creation, remove/rotate `ADMIN_BOOTSTRAP_TOKEN` in Cloudflare. No default admin password is stored in this repository.

## Student flow

- Student registers with email and a password (minimum 12 characters).
- Registration starts as `pending`; login is blocked until approval.
- Admin approves, rejects or revokes accounts from the Command Centre.
- Approved students log in and select Beginner, Intermediate or Advanced. The preference is stored per account and checked against the admin-set stage minimum; the existing question banks are not yet tagged into three difficulty variants, so selection does not yet alter question composition.
- Their Command Centre state is stored under their own account and synced to D1. Different accounts use separate local profiles and cloud snapshots.
- Admin can set a minimum difficulty for each of five stages for SI and Constable separately.

## API routes

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/admin/users`, `POST /api/admin/users`
- `GET /api/admin/stage-rules`, `POST /api/admin/stage-rules`
- `GET /api/account/settings`, `POST /api/account/settings`
- `GET /api/progress/state`, `POST /api/progress/state`
- `POST /api/progress/attempt` (disabled; direct client scores are rejected)\n- `POST /api/exam/start`, `POST /api/exam/submit` (server-issued sets and server-side scoring)\n- Login throttling: 8 failed attempts per 15-minute window per email and email/IP pair

## Security notes and remaining production gates

- Passwords use PBKDF2-SHA-256 with a random per-user salt (310,000 iterations).
- Session tokens are random 256-bit values; only SHA-256 hashes are stored. Cookies are Secure, HttpOnly and SameSite=Lax.
- Server checks admin role, account approval, per-user data scope, selected difficulty, stage minimum and previous-stage unlock before accepting a stage-attempt record.
- Admin bootstrap requires both the configured email and a one-time secret. Public registration cannot self-assign admin.
- Student email ownership is not yet verified by an email provider. Admin must independently verify identity before approval. Password reset and email verification should be added before open public registration.
- Number System Stage 1–5 question selection, answer keys, scoring and unlock decisions now run in Cloudflare Pages Functions. Browser-submitted scores are rejected by the legacy endpoint. Each attempt receives a randomized fresh set; Stage 1 samples 20 of 45 questions and Stages 2–5 use their current 12-question banks. Other topic practice still uses the existing browser-side question engine.\n- The existing question banks are not yet tagged into Beginner/Intermediate/Advanced variants. Difficulty is saved per account and admin minimum difficulty is enforced, but selecting a difficulty currently does not alter question composition. Do not advertise this as adaptive difficulty until banks are tagged and expanded.\n- Before public production use, add email verification and password reset, test the complete auth lifecycle, and consider rate limits/abuse protection on registration and login.
- The new account and cloud progress layer does not replace or delete existing local progress. Anonymous/guest mode remains available.
- Current Affairs, GK and Assam GK content availability is unchanged.
- No changes have been merged to `main`; production remains untouched until preview testing and explicit approval.
