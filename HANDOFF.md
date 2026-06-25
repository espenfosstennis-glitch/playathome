# Handoff guide — Kids Tennis (playathome) app

This is a working Next.js app. You will run it on your own GitHub, Vercel, Supabase, and Sanity.
You do **not** need any secrets or accounts from the previous owner: you create your own and fill
them into `.env.local`. Read `AGENTS.md` for the dev standards (shipping recipe, Next.js 16 notes).

## What you received
A clean copy of the source (no `node_modules`, no `.next`, no secrets, no git history). To start
your own repo: `git init && git add -A && git commit -m "Initial import"` and push to your GitHub.

## Stack
- **Next.js 16 + React 19 + Tailwind v4** (the app).
- **Sanity** = content/CMS (skills, exercises, video links). Edited in `/studio`, read server-side.
- **Supabase** = users, child profiles, progress (Postgres + Row Level Security).
- **Vercel** = hosting (auto-deploys on push to `main`).

## Stand it up (about 30–45 min)

### 1. Install + run locally
```
npm install
cp .env.local.example .env.local   # then fill in the values from steps 2–3
npm run dev                          # one instance only; visit http://localhost:3000
```
Run `npm run build` to confirm a production build passes.

### 2. Sanity (content)
1. Create a project at https://www.sanity.io/manage → note the **Project ID**; dataset `production`.
2. API → Tokens: create a **Viewer** token (read) and an **Editor** token (write, for seeding).
3. Put these in `.env.local`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`
   - `SANITY_API_READ_TOKEN` (Viewer), `SANITY_API_WRITE_TOKEN` (Editor, local only).
4. Seed the starter content: `npx tsx scripts/seed.ts` (uses the Editor token). After that you can
   edit everything visually at `/studio`. (To copy the exact existing content instead of reseeding,
   ask the previous owner for a `sanity dataset export`.)

### 3. Supabase (users + data)
1. Create a project at https://supabase.com/dashboard → Project Settings → API for the URL + keys.
2. Put in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server/test only — never `NEXT_PUBLIC`), and `SUPABASE_DB_PASSWORD`
     (the database password you set when creating the project; used only by the migration script).
3. Apply the schema (creates tables + RLS policies, all owner-scoped):
   `node --env-file=.env.local scripts/migrate.mjs`
   It prints the tables, confirms RLS is on, and lists the policies. **Every table must show RLS
   enabled** before you trust it.
4. Auth: under Authentication → Providers, Email is used (email + password). For easy testing you
   may temporarily disable "Confirm email"; **re-enable it before a public launch.**

### 4. Deploy on Vercel
1. Import your GitHub repo at https://vercel.com/new.
2. Add the same env vars under Project → Settings → Environment Variables. Rules:
   - `NEXT_PUBLIC_*` are public (project id, dataset, Supabase URL + anon key).
   - `SANITY_API_READ_TOKEN` and any server secret go in **without** the `NEXT_PUBLIC_` prefix.
   - **Never** put `SANITY_API_WRITE_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`, or `SUPABASE_DB_PASSWORD`
     in Vercel — those are local-only.
3. Push to `main`; Vercel builds and deploys automatically.

### 5. Tests (optional but recommended)
`npm run test:e2e` runs Playwright. It needs the three Supabase keys in `.env.local` and a browser.
The specs in `e2e/` cover the visitor flow, login + RLS isolation between two parents, and progress.

## Secrets checklist (generate your own — reuse none)
| Secret | Where | Public? |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` | local + Vercel | yes |
| `SANITY_API_READ_TOKEN` (Viewer) | local + Vercel | no |
| `SANITY_API_WRITE_TOKEN` (Editor) | local only | no |
| `NEXT_PUBLIC_SUPABASE_URL` / `_ANON_KEY` | local + Vercel | yes |
| `SUPABASE_SERVICE_ROLE_KEY` | local/test only | no |
| `SUPABASE_DB_PASSWORD` | local only (migrations) | no |

## Gotchas
- **Do not commit `.env.local`** — it is gitignored. Only `.env.local.example` is tracked.
- **Supabase free tier pauses after 7 days of inactivity**; restore it from the dashboard. Regular
  use or a paid plan avoids this.
- Run **one** `npm run dev` at a time; an orphaned Node process can lock `.next` and break builds.
- Don't keep the project folder inside OneDrive/Dropbox while developing — file locks break builds.
- Local tooling that calls Supabase over HTTPS may need `NODE_TLS_REJECT_UNAUTHORIZED=0` only on
  networks that intercept TLS (e.g. some corporate machines); not needed on a normal connection.

## Status / roadmap
Built and working: marketing/landing, the exercise library (Sanity), login + child profiles,
per-child progress + gamification (balls, levels, buddies/gear), and a parent overview at
`/forelder` with practice streaks. Personal data is isolated per parent by RLS.

Not done yet: PWA (installable + offline), showing the streak on the exercises page itself, and
launch prep (custom domain, real video/photos, re-enable email confirmation, remove the noindex so
search engines can find it).
