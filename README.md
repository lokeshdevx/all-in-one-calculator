# Calculate Anything — Universal Calculator Platform

A registry-driven Next.js 16 (App Router, TypeScript, Tailwind v4) calculator platform.
**All 70 mandatory calculators from the spec are implemented and tested**, plus one bonus
(71 total: `base-converter` plus dedicated `binary-decimal-converter` / `hex-decimal-converter`
pages).

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve the production build
npx vitest run    # 132 unit tests across every calculation module
```

## What's real vs. what's a documented stub

Everything below **actually calculates real results** — nothing is a mock screen. The few
places that need a live external dependency to be "production real" are called out
explicitly rather than faked:

- **Currency conversion** (`lib/calculations/finance.ts`) ships with a static, dated rate
  snapshot, clearly labeled on the result and the page's FAQ. Wire in a live FX API
  (e.g. exchangerate.host, Open Exchange Rates) before using this for real transactions —
  the currency registry is a flat `Record<string, number>`, so swapping the data source
  doesn't touch any UI code.
- **i18n, PWA/offline, and a live charts library** are architected for (registry-driven,
  category-based, no calculator hardcodes UI) but not wired up in this pass — see "Next
  steps" below.

## Architecture

```
lib/
  types.ts                 CalculatorDefinition, CalcField, CalcOutput shared types
  parse.ts                 shared numeric parsing/formatting (no eval, ever)
  actions.ts                "use server" — runs a calculator's calculate() server-side
  units/tables.ts           flat unit tables (length, weight, area, ...) — add a unit in one line
  calculations/            pure calculation functions, one file per category, each with a
                            sibling *.test.ts file (132 tests total)
registry/
  basic.ts, finance.ts, conversions.ts, mathScience.ts, everyday.ts, developer.ts
                            metadata (fields, formula, explanation, example, FAQ, related)
                            for every calculator — no calculator's UI is hand-built
  index.ts                  ALL_CALCULATORS flat list + lookup/search helpers
components/
  calculator/CalculatorRunner.tsx      generic form + live result readout, driven by field schema
  calculator/CalculatorPageShell.tsx   formula / explanation / example / FAQ / related sections
  search/SearchBar.tsx                 client-side command-palette style search
  layout/Header.tsx, Footer.tsx, ThemeToggle.tsx
app/
  page.tsx                   homepage (hero search, popular, categories)
  calculators/page.tsx       full directory, grouped by category
  calculators/[slug]/page.tsx  ONE dynamic route serves all 71 calculators + SEO metadata + FAQ JSON-LD
  category/[category]/page.tsx
  sitemap.ts                  auto-generated from the registry
```

**Adding calculator #72 (or #5000):** add one object to the relevant `registry/*.ts` array
(or a new category file) and one pure function to `lib/calculations/`. No page, route, or
component changes required — this is the "registry-driven" requirement from the spec.

## Verified correctness

- `npx vitest run` → **132/132 passing**, covering normal, decimal, negative, zero, and
  boundary inputs for every calculation function.
- Spec's own worked examples reproduced exactly: EMI = ₹8,678 for ₹10,00,000 / 8.5% / 20yr;
  10 km → 6.21371 mi / 32,808.4 ft; 72°F → 22.2°C.
- `npm run build` produces a clean production build with zero TypeScript errors; all 71
  calculator pages, the directory, and all 6 category pages were smoke-tested (HTTP 200 +
  result panel present) against the built server.
- Unknown slugs correctly return HTTP 404.

## What shipped vs. the full spec, honestly

The original spec asks for hundreds/thousands of calculators, full i18n across 9 languages,
offline PWA support, a live-data currency service, and E2E test suites — a multi-week scope
for a real team. This pass prioritized:

1. A calculation core that is **actually correct**, not mocked — every one of the 70
   mandatory calculators, tested.
2. A **genuinely extensible architecture** so #71–#5000 are cheap to add.
3. A working, responsive, dark-mode-capable, accessible UI wired to all of it.

### Next steps if you continue this project
- Swap the font stack in `app/globals.css` for the intended Space Grotesk / Inter /
  JetBrains Mono trio via `next/font/google` (skipped here only because this sandbox has no
  network access to fonts.googleapis.com).
- Wire a live FX rate API into `calculateCurrency`.
- Add Playwright/Cypress E2E tests for search, navigation, copy/share, and dark mode.
- Add the "Smart Calculator" natural-language front door (parse free text like "20% of 500"
  or "10 km in miles" and route to the matching registry entry + pre-filled fields).
- Add i18n routing (`next-intl` or the built-in App Router i18n pattern) — the registry's
  flat, data-driven shape means translated copy is additive, not a rewrite.
- Add a service worker + manifest for offline/PWA support for the non-currency calculators.
