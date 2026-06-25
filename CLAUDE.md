# CLAUDE.md

Guidance for an AI assistant (Claude Code or similar) working in this repo. Read this first.

## What this project is
Kids Tennis (playathome) — a Next.js 16 + React 19 + Tailwind v4 app for at-home kids' tennis,
Norwegian Bokmål, ages 3 til 5. Content in Sanity, users/progress in Supabase (RLS), hosted on
Vercel. New here? Read `HANDOFF.md` for full setup, then `AGENTS.md` for the engineering standards.

## How to work (engineering)
Follow `AGENTS.md`. The short version:
- Before a database migration or a larger feature (anything but small UI tweaks), run the recipe:
  **reuse → design → security → function**. Every Supabase table ships with RLS enabled and
  owner-scoped policies (`auth.uid()`) in the same migration. Secrets stay server-side.
- For larger features, after the reviews pass, write and run a **Playwright** test that drives the
  feature as each user role (including a negative case proving an unauthorized role is blocked),
  and always tear the test data down afterwards.
- This is Next.js 16: when unsure about an API, read `node_modules/next/dist/docs/` before writing.
- Run one `npm run dev` at a time. `npm run build` to verify.

## How to write (voice)
- **Assistant output** (chat, PR comments, drafts, files): follow `.claude/karpathy-style.md`.
  Concise, precise, lead with the point, and never use the em-dash.
- **User-facing app copy** (anything Norwegian that ships on the site): follow
  `.claude/playathome-voice.md`, enforced by the `playathome-writing-reviewer` agent. Plain bokmål,
  short concrete sentences, no hype, no accent marks, no em-dash, "3 til 5" not a dash range.

## Layout
- `app/` routes (App Router), `components/` UI, `lib/` shared logic (Supabase clients, gamification,
  streaks, Sanity queries), `sanity/` + `/studio` content, `supabase/migrations/` schema, `e2e/`
  Playwright specs, `scripts/` migrate + seed.
