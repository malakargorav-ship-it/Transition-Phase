# Individual accounts and exam progression

All changes are isolated on `feature/individual-accounts-exam-engine`, based on the approved `feature/hybrid-motion` branch. The production `main` branch has not been changed by this implementation.

## Cloudflare Pages setup

1. Create a D1 database, for example `transition-phase-users`.
2. Apply these migrations in order:
   - `migrations/0001_accounts_progress.sql`
   - `migrations/0002_stage_rules.sql`
   - `migrations/0003_user_progress.sql`
   - `migrations/0004_question_sets.sql`
   - `migrations/0005_auth_rate_limits.sql
   - `migrations/0006_topic_exam_engine.sql``
3. In the Cloudflare Pages project `transition-phase`, add a D1 binding named `DB` to this database for the Preview environment first.
4. Add encrypted Preview environment variables:
   - `ADMIN_EMAIL` = `malakargorav@gmail.com`
   - `ADMIN_BOOTSTRAP_TOKEN` = a newly generated random secret of at least 32 characters. Keep it private; never commit it or paste it into chat.
5. Deploy this feature branch to a Cloudflare Pages Preview URL only.

## First admin registration

Open the Preview Command Centre. Register using the configured admin email and the private bootstrap token. This creates the initial admin account and signs it in. Remove the `ADMIN_BOOTSTRAP_TOKEN` variable after successful bootstrap. No default admin password is stored in the repository.

## Student flow

- A student registers with an email and a password of at least 12 characters.
- New registrations start as `pending`; login is blocked until approval.
- The admin can approve, reject or revoke student accounts.
- Approved students can select Beginner, Intermediate or Advanced. The preference is stored per account and checked against the admin-set minimum difficulty for each exam stage.
- The existing question banks are not yet tagged into three difficulty variants, so the preference currently enforces the stage minimum but does not yet change question composition.
- Command Centre progress snapshots are stored separately per user and synced to D1.
- Admin can configure a minimum difficulty for each of five Number System stages, separately for SI and Constable.

## Server-side Number System exam engine

- `POST /api/exam/start` checks login, approval, exam track, stage unlock and minimum difficulty. It selects a randomized question set and stores the answer key in D1.
- Stage 1 selects 20 questions from the existing 45-question Number System bank. Stages 2–5 each select 10 questions from their existing 12-question bank. Order and selected subset are randomized on every new attempt.
- The start response contains only question text and choices. Correct answers and explanations remain server-side.
- `POST /api/exam/submit` accepts selected option indexes, checks the stored answer key, calculates the score and applies the 80% pass rule on the server.
- A question set is single-use and expires after 30 minutes.
- Stage unlocks are stored per account and exam track. Passing a stage with at least 80% unlocks the next stage for that user only.
- The old `POST /api/progress/attempt` route rejects direct client-computed scores with HTTP 410.
- Other existing Maths topics now use the topic exam endpoints and secure five-stage flow. Topics without question banks remain unavailable until verified content is added.

## Server-side topic exam engine

- The same account-gated, randomized, server-scored five-stage engine is extended to all 22 additional existing Maths topic banks: Place Value, Divisibility, Factors & Multiples, HCF & LCM, Remainders, Simplification, Fractions & Decimals, Percentage, Ratio & Proportion, Profit/Loss/Discount, Simple/Compound Interest, Average, Ages, Time & Work, Pipes & Cisterns, Partnership, Mixture & Alligation, Time/Speed/Distance, Mensuration, Geometry, Trigonometry and Data Interpretation.
- Each attempt selects up to 10 random questions from that topic bank. Each topic has independent per-student, per-exam-track stage unlocks; 80% is required to unlock the next stage.
- Correct answers and explanations stay server-side until submission. Question sets are single-use and expire after 30 minutes.
- Admin can set minimum difficulty independently for every topic, stage and exam track. The existing question banks are not yet difficulty-tagged, so the preference is an access rule, not a different question mix.
- This does not add new GK, Assam GK, English, Reasoning or Current Affairs question banks. Those subjects are not present in the currently integrated 23-topic Maths bank and need verified content before being added.

## API routes

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/admin/users`, `POST /api/admin/users`
- `GET /api/admin/stage-rules`, `POST /api/admin/stage-rules`
- `GET /api/account/settings`, `POST /api/account/settings`
- `GET /api/progress/state`, `POST /api/progress/state`
- `POST /api/exam/start`, `POST /api/exam/submit` (Number System)
- `POST /api/topic-exam/start`, `POST /api/topic-exam/submit` (other existing Maths topics)
- `GET /api/admin/topic-stage-rules`, `POST /api/admin/topic-stage-rules`
- `POST /api/progress/attempt` (disabled; direct client scores are rejected)

## Security and remaining production gates

- Passwords use PBKDF2-SHA-256 with a random per-user salt (310,000 iterations).
- Session tokens are random 256-bit values; only SHA-256 token hashes are stored. Cookies are Secure, HttpOnly and SameSite=Lax.
- Login is throttled after 8 failed attempts per 15-minute window, by email and email/IP pair.
- Admin bootstrap requires both the configured admin email and the one-time secret. Public registration cannot self-assign admin.
- Server routes check account approval, admin role, per-user data scope, saved difficulty, stage minimum and previous-stage unlock.
- Email ownership verification and password reset are not integrated. The admin should independently verify a student's identity before approving them. Add an email provider and password recovery flow before open public registration.
- The Number System stages use the existing question banks. No questions have been falsely labeled as previous-year questions; verified PYQ sourcing and tagging remains separate work.
- Current Affairs, GK and Assam GK question content availability is unchanged.
- The account layer does not delete existing guest progress. Guest mode remains available.
- No production merge or deployment has been performed. Preview configuration and end-to-end testing are still required.

## Official Assam Police exam catalog and PYQ ingestion

The following research artifacts are maintained on this feature branch:

- `data/official-exam-catalog.json`: separate recruitment profiles for SI (UB), SI (AB) Commando, general Constable (UB), general Constable (AB), and Commando Constable (AB). Historical CWT references are not treated as future recruitment dates.
- `docs/official-assam-police-baseline.md`: source-linked official recruitment and examination baseline.
- `data/pyq/cwt-2025-paper-i-set-a-sample.json`: first four answer-key-matched Paper-I Set A questions. Question wording is transcribed from a secondary paper rendering; answers are matched against the SLPRB final Set A key. The records are explicitly marked `SECONDARY_TRANSCRIPTION`, not direct-PDF text extraction.
- `scripts/validate-exam-data.mjs`: validates exam profiles, unique question IDs, MCQ options, correct-answer consistency, source labels, and PYQ answer-key references. Run with `node scripts/validate-exam-data.mjs`.

The CWT-2025 Paper-II Set A answer key currently located is provisional. It must remain labelled provisional until a final key is found. General Constable (AB) must remain separate from Commando Constable (AB); the latter's identified advertisement does not list a written test.

These research artifacts do not yet change the production exam UI or replace the existing Number System / Maths engine. Full paper extraction, all-set reconciliation, and the exam-category-aware UI/API integration remain subsequent implementation steps.
