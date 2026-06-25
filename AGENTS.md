# Kids Tennis, dev standards

Next.js 16 + React 19 + Tailwind v4 app. Norwegian Bokmål, ages 3 til 5. Private preview on Vercel
(noindex). Content in Sanity (private dataset, read server-side). Personal data will live in
Supabase with RLS.

## Next.js 16 note

This is Next.js 16, which has breaking changes vs older training data. When unsure about an API,
read the guide in `node_modules/next/dist/docs/` before writing code, and heed deprecation notices.

## Shipping recipe (mandatory)

Before applying any database migration or a larger feature change (anything except small UI
tweaks; ask if in doubt), run the pipeline:

1. **Reuse** - reuse existing components/utils/queries/policies/patterns instead of building new.
2. **Design** - matches the design system; mobile-first and app-like on phones; works for all
   users and views; accessible; never the dash character in visible copy; age 3 til 5.
3. **Security** (mandatory for data access) - only the correct recipient can read/change/create.
   Every Supabase table ships with RLS enabled and explicit owner-scoped policies (`auth.uid()`)
   in the same migration. RPCs/views never bypass RLS. Secrets stay server-side.
4. **Function** - live-check the real database that referenced tables/columns exist; build passes;
   the path returns 200 with no errors. No schema guessing.

Address every failure before shipping. For larger features, after the reviews pass, write and run
a **Playwright** script that drives the feature as each relevant user role (including a negative
case proving an unauthorized role is blocked), then **always reverse the test data** afterwards
(teardown even on failure).

The four reviewers and the orchestration live in the parent Claude project
(`.claude/agents/` and the `dev-pipeline` skill).

## Local dev

- `npm run dev` (one instance only; orphan node processes lock `.next`).
- `npm run build` to verify.
- Env: copy `.env.local.example` to `.env.local`. Sanity dataset is private; the app reads with
  `SANITY_API_READ_TOKEN` server-side. `NEXT_PUBLIC_SANITY_*` hold only project id and dataset.
