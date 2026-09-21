# Build 03 — cinematic media system: implementation and validation

Validated on 2026-09-21 against the local production build (`npm run build` +
`npm run start`) and a dev server used for temporary scenario testing.
Browser automation: headless Chromium 153 driven by Playwright (browser
binary sourced from the npm-distributed serverless Chromium package because
this sandbox's network blocks browser CDNs). Tooling and screenshots were
kept outside the repository.

## What changed

- Introduced the site-wide media resolution priority as one shared chain:
  **VIDEO → POSTER/COVER → STATIC IMAGE → DESIGNED PLACEHOLDER**.
- Made the homepage Hero media area data-driven (`siteMedia.heroShowreel`):
  the hero now resolves a film, a poster, a still, or the approved branded
  placeholder with no code changes when assets arrive. Video stays in its
  own column — never behind the headline — muted when ambient, and never
  autoplays under `prefers-reduced-motion`.
- Strengthened Selected Work / `/work` media presentation: showcase frames
  resolve the new project slots and carry a subtle editorial hover zoom
  (disabled under reduced motion by the global transition rule).
- Extended the project data model for richer future case-study pages:
  `heroMedia`, `featuredMedia`, `gallery` (mixed stills/clips with optional
  labels and captions), per-item `alt`, `label`, `caption`, and playback
  intent on videos (`autoplay`, `muted`, `loop`, `controls`).
- Established the asset organization `public/media/` (showreel + one folder
  per project slug) with conventions documented in `public/media/README.md`.
  Only `.gitkeep` files and the README were committed — no binary assets.
- No changes to navigation, WhatsApp integration, portrait, typography,
  color system, routes, project names, homepage section order, or contact
  functionality. No new dependencies.

## Media architecture

`src/lib/types.ts` defines `ProjectImage` / `ProjectVideo` (discriminated by
`kind`), the union `ProjectMedia`, and the slots on `Project`
(`heroMedia`, `featuredMedia`, `gallery`) plus `siteMedia.heroShowreel` in
`src/data/media.ts` for site-level media.

Resolution helpers:

- `resolveProjectMedia(project, slot)` — featured → `featuredMedia` →
  `heroMedia` → `gallery[0]`; hero → `heroMedia` → `featuredMedia` →
  `gallery[0]`.
- Every rendering component applies the same fallback chain, so supplying
  an asset in the data is the only step needed to upgrade any frame.

Conceptual future project entry:
`Project → heroMedia → featuredMedia → gallery (images + videos + captions) → liveUrl`.

## Components added / modified / removed

| Component | Status | Responsibility |
| --- | --- | --- |
| `media/CinematicVideo` | added (replaces `VideoPlayer`) | responsive native `<video>`: poster, muted/autoplay/loop/controls options, `playsInline`, accessible labels, reduced-motion behaviour, in-view lazy loading, single-ambient registry, graceful failure |
| `media/VideoPlayer` | removed | behaviour folded into `CinematicVideo` (no duplicate player) |
| `media/MediaCaption` | added | shared `figcaption` treatment (label + caption) |
| `media/ResponsiveImage` | modified | `sizes`, `fit` (cover/contain for uncropped screenshots), hover zoom, load-failure fallback to the branded placeholder |
| `media/ProjectMediaFrame` | modified | slot-based resolver (`featured` / `hero`), figure/figcaption when media carries label/caption, hover zoom and `sizes`/`priority` pass-through |
| `media/MediaGallery` | modified | mixed image/video items, semantic `ul/li/figure`, captions, accessible list label, lazy facade videos |
| `media/MediaPlaceholder` | unchanged | designed placeholder treatment |
| `home/HeroMedia` | added | Hero media slot resolution (video → poster → still → placeholder) |
| `home/Hero` | modified | renders `HeroMedia`; composition otherwise untouched |
| `work/ProjectShowcase` | modified | passes `hoverZoom` to frames; layout unchanged |
| `hooks/usePrefersReducedMotion`, `hooks/useInView` | added | SSR-safe motion preference + IntersectionObserver visibility |

## Fallback behaviour (verified)

- **No media** → branded placeholder (hero: "Portfolio film / Coming soon";
  projects: "Media coming soon"). Zero `<video>` elements, zero video bytes.
- **Poster/cover** → shown before playback; under reduced motion the facade
  offers an accessible play control instead of autoplay.
- **Video fails to load** → ambient videos degrade in view, without
  interaction, to the poster as a still (meaningful alt, no play control);
  facade videos degrade on click. Without a poster the branded placeholder
  renders with an honest "Video unavailable" label.
- **Image fails to load** → branded placeholder ("Image unavailable").
- **No video support / blocked autoplay / hidden tab / scrolled out of
  view** → poster or placeholder; ambient playback pauses and resumes with
  visibility. No broken media boxes, no empty black rectangles observed.

## Performance considerations

- Facade (click-to-play) is the default: zero video bytes until interaction.
- Ambient videos mount with `preload="none"` and only fetch/start when the
  frame enters the viewport (IntersectionObserver, 256 px margin); they
  pause off-screen and in hidden tabs.
- A module-level registry guarantees at most one ambient video plays at a
  time; a deliberate user play pauses any ambient video.
- Aspect ratios are reserved by the caller (`aspect-*` classes) — measured
  cumulative layout shift on the media test bench was below 0.1.
- Posters/images go through `next/image` with explicit `sizes`; `priority`
  is available for above-the-fold media (used by the hero slot).
- No video binaries were committed; conventions in `public/media/README.md`
  direct large films to optimized files or CDN URLs.
- First Load JS: 114 kB on `/` and `/work` (Build 02: 112 kB) — the media
  system added ~2 kB of client JavaScript.

## Accessibility checks

- axe-core (WCAG 2 A/AA, WCAG 2.1 AA): zero violations on `/`, `/solutions`,
  `/work`, `/about`, `/contact` at 390 and 1440 px and on the open mobile
  menu at 375 px. Scans run with `prefers-reduced-motion: reduce` so every
  element is measured in its settled, fully opaque state; a normal-motion
  scan flags opacity-blended "contrast" on elements that are still fading
  in (entrance-animation artifact, settled colours are ≈6:1).
- Play controls are real buttons with `Play video: …` labels (keyboard
  verified: focus + Enter starts playback); native controls are used for
  user-initiated playback; videos carry `aria-label` descriptions and
  in-element text fallbacks.
- Galleries and captioned frames use semantic `figure`/`figcaption` and a
  labelled list.
- Reduced motion: no autoplay, play affordance shown instead, all
  transitions/animations computed to 0 s.
- Mobile navigation regression (Build 01 fix): inert closed panel,
  `aria-expanded`, scroll lock, focus move/restore, Escape, menu navigation
  — all pass at 320/375/390/430 px; skip link verified.

## Responsive widths tested

320, 375, 390, 430, 768, 1024, 1440 px on all five routes (status, single
H1, no horizontal overflow, console/pageerror clean, WhatsApp hrefs), plus
hero media-state screenshots at 390 and 1440 px and media-lab screenshots
at 1280 px.

## Routes tested

`/`, `/solutions`, `/work`, `/about`, `/contact` (production build), plus
`/media-lab` on a dev server for the temporary scenario bench (route and
its test assets removed before commit).

## Scenario results (temporary bench, removed before commit)

- Facade: no `.mp4` requests before click; click and keyboard Enter start
  playback with controls.
- Ambient: exactly one of two in-view ambient videos plays; muted, looped,
  `playsInline`, `preload="none"`, labelled; pauses off-screen; resumes in
  view; user play pauses ambient.
- Broken sources: facade degrades on click (poster still / "Video
  unavailable" placeholder); ambient degrades in view without interaction.
- `fit="contain"` preserves full sources; hover zoom computes `scale: 1.03`
  and is inert under reduced motion.
- Gallery: 3 figures, 2 figcaptions, list label, facade video not mounted
  before interaction.
- Hero states verified end-to-end by temporarily swapping
  `src/data/media.ts`: none / still / ambient video / broken video with
  poster / broken video without poster — including reduced-motion (no
  autoplay, play affordance) and an h1/media collision check. File restored
  afterwards.

## Build / typecheck results

| Check | Result |
| --- | --- |
| `npm install` | PASS (two advisories reported — see limitations) |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — 11 routes prerendered |
| `git diff --check` | PASS |

## Final re-validation (delivery pass, same date)

After removing all temporary artifacts, the production application was
rebuilt from the final tree (`rm -rf .next`, `npm install` with an unchanged
lockfile, `npx tsc --noEmit`, `npm run build` — 11 routes prerendered) and
the production server restarted from the new output. Against that server:

- Smoke sweep re-run: 5 routes × 320/375/390/430/768/1024/1440 px — PASS
  (status 200, single H1, no horizontal overflow, clean console, WhatsApp
  hrefs correct, zero video elements/requests in the committed state).
- Committed-state checks — PASS: five intentional "Media coming soon"
  placeholder frames on `/` and `/work`, zero `<video>` and zero showcase
  `<img>` elements (no fabricated media), project hierarchy intact with
  Stayora featured first, PureNest's "Fictional concept project — not
  client work." disclosure visible, CLS < 0.1, hero placeholder and readable
  H1, mobile toggle hidden at 1440 px / desktop nav hidden at 390 px,
  closed menu panel measures 0 px height and is inert (open > 100 px,
  re-closed 0 px), skip-link focus outline 2 px solid, and every `<img>` on
  all five routes carries a non-empty alt.
- axe-core re-run (WCAG 2 A/AA + 2.1 AA, reduced-motion settled): zero
  violations on all routes at 390/1440 px and on the open mobile menu.
- Mobile navigation regression re-run at 320/375/390/430 px — PASS.
- Hero media states re-run through temporary `src/data/media.ts` swaps on a
  dev server (six variants: none, still, ambient video, click-to-play
  facade, broken video with poster, broken video without poster; reduced
  motion checked for the video variants): all PASS, including zero video
  bytes before interaction on the facade, controls + accessible label after
  playback, ambient `aria-label`, CLS < 0.1 per variant, and automatic
  restoration of `media.ts`. Temporary `public/media-test/` assets were
  removed afterwards; `git status` is clean and the data file is byte
  identical to the committed version.

## Known limitations

- Browser coverage is headless Chromium 153 with emulated viewports only —
  no WebKit/Firefox or physical-device testing in this environment.
- No real project media exists yet: every slot renders the branded
  placeholder by design. Case-study routes (`/work/[slug]`) are not built;
  the data model and components are ready for them.
- Full-page screenshots taken under normal motion show below-the-fold
  `.reveal` sections in their pre-entry (near-zero opacity) state — an
  artifact of the approved CSS scroll-driven reveal, verified at opacity 1
  interactively.
- Ambient autoplay assumes H.264/MP4 (`canPlayType` probe); unsupported
  browsers fall back to poster/placeholder. Browsers without
  IntersectionObserver load ambient media immediately (legacy grace).
- `npm audit` advisories carried from Build 02 (moderate Next.js via the
  PostCSS chain, high nested PostCSS) remain unaddressed by design;
  remediation needs separate review.
- CEO review of the preview is still required. This build must not be
  merged automatically.
