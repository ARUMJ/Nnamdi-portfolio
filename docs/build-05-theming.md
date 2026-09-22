# Build 05 — premium light & dark mode: implementation and validation

Validated on 2026-09-22 against the local production build
(`npm run build` + `npm run start`) with headless Chromium 153 driven by
Playwright (browser binary sourced from the npm-distributed serverless
Chromium package, with NSPR/NSS built from source locally, because this
sandbox's network blocks browser CDNs). Screenshots were kept outside the
repository (`.theme-artifacts/`, git-ignored).

## What changed

- Introduced a semantic design-token system for theming. The existing
  light palette (warm paper neutrals, deep ink, one evergreen accent) is
  preserved byte-for-byte as the light values; the dark values are a
  deliberately designed premium alternative: deep-charcoal tonal
  layering, warm off-white type, and the same evergreen accent lifted to a
  readable sage. It is not a color inversion.
- Re-registered every color utility in terms of semantic tokens
  (`bg-background`, `text-foreground`, `border-border`, `bg-button`,
  `text-inverse-muted`, …) so **no component ever tests for the active
  theme**. Switching `.dark` on `<html>` re-themes the entire site.
- Added a small accessible theme toggle (sun/moon) to the header, usable
  on desktop and mobile, with a dynamic accessible name, keyboard
  support, and a tooltip.
- Added a minimal client-side theme controller (`src/lib/theme.ts`) with
  localStorage persistence and system-preference fallback.
- Added an inline, dependency-free bootstrap script in the root layout
  that applies the stored/system theme during the initial HTML parse —
  **no flash of the wrong theme**.
- A short (250 ms) unified color crossfade runs only while the visitor
  manually toggles; it is absent on page loads and fully disabled under
  `prefers-reduced-motion`.

No changes to: routes, section order, project order, messaging,
typography, navigation structure, logo geometry, the five-project media
system, WhatsApp integration, SEO output, or any media asset. No new
runtime dependencies.

## Token architecture

`src/app/globals.css` is the single source of truth:

1. **Raw variables** on `:root` (light) and `.dark` (dark). Each carries a
   comment mapping it to the former token it replaces
   (`paper` → `--background`, `ink` → `--foreground`,
   `ink-deep` → `--inverse-surface`, `muted-dark` → `--inverse-muted`,
   `line` → `--border`, `line-dark` → `--inverse-border`,
   `accent-deep` → `--accent-hover`, …).
2. **`@theme inline`** registration exposes them as Tailwind utilities
   that resolve at use time, so one class on `<html>` re-themes the site.

Semantic groups (light value → dark value):

| Token | Light | Dark |
| --- | --- | --- |
| `--background` (page) | `#f5f4ef` | `#171a1f` |
| `--surface` (secondary/elevated) | `#eceae0` | `#1e2127` |
| `--surface-hover` (row hover) | white 55% | off-white 6% |
| `--foreground` (primary text) | `#1a1c1f` | `#f2f0ea` |
| `--foreground-secondary` | `#5c5d5e` | `#c8c5bc` |
| `--foreground-muted` | `#585c63` | `#9b9d97` |
| `--border` / `--border-subtle` | `#d9d6ca` / `#e2e0d5` | `#313742` / `#282d36` |
| `--accent` / `--accent-hover` | `#1f4a3c` / `#16382d` | `#8cc2aa` / `#abd8c2` |
| `--button` / `--button-foreground` | `#1a1c1f` / `#f5f4ef` | `#f2f0ea` / `#171a1f` |
| `--inverse-surface` (cinematic bands) | `#101214` | `#0f1216` |
| `--inverse-foreground` / `--inverse-muted` | `#f5f4ef` / `#a5a9ad` | `#f2f0ea` / `#9fa19b` |
| `--inverse-border` | `#2c3034` | `#2a2f38` |
| `--placeholder` (media placeholder frames) | `#101214` | `#101318` |
| `--focus-ring` | `#1f4a3c` | `#9ed4bd` |
| `--selection` | evergreen | mid evergreen `#35594c` |
| `--media-overlay` / `--media-control` (video scrim / play disc) | ink 15% / 40% | near-black 22% / 45% |
| `--elevation` (soft shadow) | ink 10% | black 50% |
| `--inverse-glow` / `--placeholder-glow` / `--placeholder-veil` | evergreen/paper glows | lifted evergreen + warm veil |

Notes:

- The "always-dark" cinematic sections (Process band, CtaBand, media
  placeholders) keep their identity via the `inverse-*` tokens. In dark
  mode they sit **one tone darker than the page** (`#0f1216` on
  `#171a1f`) with a lifted glow, so they read as deliberate feature bands
  rather than black-on-black.
- In dark mode the primary button inverts (light surface, dark type) so
  CTAs stay obvious everywhere; `hover`/`active` states resolve through
  `--button-hover` in both themes.
- `color-scheme: light|dark` is set in CSS so native scrollbars and form
  controls follow the theme.
- Media is never filtered: video posters, images, and placeholders carry
  no CSS filter in either theme (asserted in the test suite).

## Theme controller

- `src/app/layout.tsx` renders `themeInitScript()` from `src/lib/theme.ts`
  as the first element of `<body>` and sets `suppressHydrationWarning` on
  `<html>`. The script resolves
  **stored choice → system preference** and toggles `.dark` before first
  paint.
- `src/lib/theme.ts` — the runtime half of the same contract:
  - `getDomTheme()` reads the `.dark` class (source of truth).
  - `toggleTheme()` flips it and persists to
    `localStorage["nnamdi-portfolio:theme"]`.
  - System-preference changes are followed **only while no explicit
    choice is stored** — an explicit choice is never overridden.
  - While a manual switch runs, `.theme-switching` is added to `<html>`
    for 320 ms (skipped under `prefers-reduced-motion`), enabling the
    unified crossfade.
- `src/hooks/useTheme.ts` — `useSyncExternalStore` over the document
  class; server snapshot is `"light"`, so SSR renders the light-state
  icon and hydration reconciles without a mismatch.
- `src/components/layout/ThemeToggle.tsx` — renders the icon of the theme
  it will activate (moon in light, sun in dark) with a dynamic
  `aria-label` ("Switch to dark mode" / "Switch to light mode").

## Validation

`npm run typecheck` and `npm run build` pass; all routes are statically
generated. `tests/build05-theme.cjs` (179 checks, all passing) and the
existing `tests/build04-media.cjs` regression suite (all passing) were run
against the production server:

- **Routes** `/`, `/solutions`, `/work`, `/about`, `/contact` in both
  themes at 1440 px and 390 px: theme class applied, no horizontal
  overflow, no console errors, no broken images, no CSS filters on
  media.
- **Bootstrap**: init script present in SSR HTML before first content;
  first visit respects the system preference and stores nothing; an
  explicit choice persists across reload and client-side navigation and
  beats the system preference in both directions.
- **Toggle**: visible and keyboard-reachable, `aria-label`/`title`
  update with state, Enter toggles; under `prefers-reduced-motion` the
  theme still switches and the `.theme-switching` class is never added.
- **Mobile navigation** (Build 03 fix): intact in both themes —
  aria-expanded/controls, 5 nav links + CTA rendered and visible, body
  scroll lock, Escape close; no overflow with the toggle beside the menu
  button at 390 px.
- **/work media** (Build 04): all five projects visible with decoded
  posters in both themes; click-to-play mounts a native
  `<video controls>`; the Build 04 regression suite additionally passed
  for the failure chains (poster → still → placeholder), blocked/
  no-codec fallbacks, ambient-visibility policy, and
  dynamic-reduced-motion.
- **Contrast**: body text, muted text, nav text, and footer text all
  measure ≥ 4.5:1 against their effective surfaces in both themes
  (computed from rendered styles).
- **SEO**: titles, descriptions, and og metadata are identical in both
  themes; WhatsApp URL `https://wa.me/2348102505135` unchanged.
- **Screenshots**: both themes captured at 1440 px (home, solutions,
  work, about, contact) and 390 px (home, work, mobile menu) for visual
  comparison.
