# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager: npm (`package-lock.json`), Node >=24. AGENTS.md restricts which scripts to run: `build-local`, `lint`, `check:types`, `check:deps`, `check:i18n`, `test`, `test:e2e`.

- Single unit test: `npx vitest run --project unit src/utils/Helpers.test.ts`
- Single UI test (`*.test.tsx`, runs in headless Chromium via Playwright): `npx vitest run --project ui path/to/File.test.tsx`
- Single e2e: `npx playwright test tests/e2e/Visual.e2e.ts`
- Dev (`npm run dev`) starts PGlite DB server (persists in `local.db`, auto-migrates) plus Next.js and Spotlight.
- `build-local` uses in-memory PGlite; `build` runs real `db:migrate` against `DATABASE_URL`.
- After editing `src/models/Schema.ts`: `npm run db:generate` (writes to `migrations/`).

## Architecture

Next.js 16 App Router + Tailwind v4 + next-intl. Single-page personal profile site (Bryan Rinaldo). `DESIGN.md` holds the design-token spec; tokens live in `src/styles/global.css` `@theme`. Profile data in `src/utils/Profile.ts`; page sections in `src/components/profile/`. Scroll parallax/reveal is CSS-only (`animation-timeline`) in `global.css`.
- **Static export** (`output: 'export'` in `next.config.ts`) deployed to GitHub Pages by `.github/workflows/deploy.yml`. No middleware, no server routes; `next start` does not work, serve `out/` instead.
- **Routes**: only `src/app/(marketing)/page.tsx`. Clerk/Drizzle libs (`src/libs/DB.ts`, `src/models/Schema.ts`) remain but are unused by pages.
- **i18n**: next-intl without routing; locale fixed to `en` in [src/libs/I18n.ts](src/libs/I18n.ts), messages in `src/locales/en.json`.
- **DB**: schema in `src/models/Schema.ts`; connection factory in `src/utils/DBConnection.ts`; `src/libs/DB.ts` caches instance on `globalThis` in dev to survive hot reload. PGlite locally, Postgres (e.g. Neon) in prod.
- **Env**: all vars declared/validated in `src/libs/Env.ts` (t3-env). Never use `process.env` directly.
- `src/libs/` = third-party setup wrappers (Arcjet, DB, Env, I18n, Logger). `src/utils/` = pure helpers/config.
- Sentry wired via `src/instrumentation.ts` / `instrumentation-client.ts`; logging via LogTape (`src/libs/Logger.ts`).

## Tooling

- Lint/format: Ultracite wrapping oxlint + oxfmt (`oxlint.config.ts`, `oxfmt.config.ts`), not ESLint/Prettier. `lint` is type-aware and type-checks.
- `check:deps` = knip (`knip.config.ts`); flags unused files/exports/deps.
- Git hooks via lefthook; commits validated by commitlint (Conventional Commits). Releases via semantic-release on `main`.
- Test layout: unit `*.test.ts` and UI `*.test.tsx` colocated in `src/`; integration in `tests/integration/*.integ.ts`; e2e in `tests/e2e/*.e2e.ts` (files named `*.check.e2e.ts` are post-deploy sanity checks). Storybook stories (`*.stories.tsx`) are also run as tests via `storybook:test`.
