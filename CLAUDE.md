# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager: npm (`package-lock.json`), Node >=24. AGENTS.md restricts which scripts to run: `build-local`, `lint`, `check:types`, `check:deps`, `check:i18n`, `test`, `test:e2e`.

- Single unit test: `npx vitest run --project unit path/to/File.test.ts` (none exist yet)
- Single UI test (`*.test.tsx`, runs in headless Chromium via Playwright): `npx vitest run --project ui path/to/File.test.tsx`
- Single e2e: `npx playwright test tests/e2e/Visual.e2e.ts`
- `npm run dev` starts Next.js; `npm run build` writes the static site to `out/`.

## Architecture

Next.js 16 App Router + Tailwind v4 + next-intl. Single-page personal profile site (Bryan Rinaldo). `DESIGN.md` holds the design-token spec; tokens live in `src/styles/global.css` `@theme`. Profile data in `src/utils/Profile.ts`; page sections in `src/components/profile/`. Scroll parallax/reveal is CSS-only (`animation-timeline`) in `global.css`.
- **Static export** (`output: 'export'` in `next.config.ts`) deployed to GitHub Pages by `.github/workflows/deploy.yml`. No middleware, no server routes; `next start` does not work, serve `out/` instead.
- **Routes**: only `src/app/(marketing)/page.tsx`.
- **i18n**: next-intl without routing; locale fixed to `en` in [src/libs/I18n.ts](src/libs/I18n.ts), messages in `src/locales/en.json`.
- **Env**: vars declared/validated in `src/libs/Env.ts` (t3-env). Never use `process.env` directly.
- `src/libs/` = setup wrappers (Env, I18n). `src/utils/` = helpers/config.

## Tooling

- Lint/format: Ultracite wrapping oxlint + oxfmt (`oxlint.config.ts`, `oxfmt.config.ts`), not ESLint/Prettier. `lint` is type-aware and type-checks.
- `check:deps` = knip (`knip.config.ts`); flags unused files/exports/deps.
- Git hooks via lefthook; commits validated by commitlint (Conventional Commits).
- Test layout: unit `*.test.ts` and UI `*.test.tsx` colocated in `src/`; e2e in `tests/e2e/*.e2e.ts` (files named `*.check.e2e.ts` are post-deploy sanity checks).
