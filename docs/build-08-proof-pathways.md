# Build 08 — Proof & Pathways: implementation and validation

Validated on 2026-10-07 against the local production build
(`npm run build` + `npm start`) with headless Chromium 153 driven by
Playwright (serverless Chromium binary from the npm-distributed
`@sparticuz/chromium` package, run from a tooling directory outside the
repository). Screenshots and test artifacts were kept outside the repo.

Build 08 turns the existing portfolio into a portfolio + client-conversion +
professional-opportunity site. It is an improvement to the existing design —
the visual identity, layout system, motion system, typography, theming,
navigation and project media are all preserved.

## What changed

### 1. Two service pathways (the "Pathways" half)

- `src/data/solutions.ts` now defines two primary pathways and groups the
  existing five solution areas beneath them, so nothing was deleted:
  - **01 Web & Digital Development** — responsive websites, business
    websites, frontend development, web interfaces, React, Next.js,
    TypeScript, Tailwind CSS, API integration, deployment, website
    improvements, SEO metadata, structured data, responsive UI.
  - **02 Digital Assistance & Technical Support** — digital administration,
    technical support, computer and device support, website content
    updates, school and office technology support, digital organization,
    documentation, presentation and visual support, Canva graphics,
    day-to-day digital assistance.
- The two pathways are visually distinct using the site's existing design
  language: pathway 01 uses the light surface card; pathway 02 uses the
  inverse (cinematic) treatment already established by the Process and CTA
  bands. No new visual language was invented.
- `src/components/solutions/ServicePathway.tsx` renders a pathway as either a
  homepage summary card or a full `/solutions` section (summary, capability
  chips, and the solution areas inside it).
- Only technologies and capabilities already supported by this repository are
  claimed. No seniority, certifications or invented experience.

### 2. Homepage conversion

- `Hero` now says what is built *and* who it is for (businesses, schools,
  organizations) without marketing inflation.
- `Statement` answers "what can he build or support" in concrete terms.
- `SolutionsPreview` leads with the two pathway cards, then keeps the existing
  editorial index of the five specific areas.
- `SelectedWork` lead states the proof contract: every project is labelled and
  opens on its live site.
- `FinalCta` addresses both audiences (project or professional opportunity).
- CTAs preserved: Start a Project, View My Work, View all work, Chat on
  WhatsApp, Contact.

### 3. Project proof (the "Proof" half)

- `src/lib/types.ts` adds `ProjectStatus` (Concept | Prototype | Deployed Demo
  | Production Website), `ProjectProof` (purpose, contribution summary,
  contribution, delivered, honest scope) and `ProjectCaseStudy`.
- All five projects in `src/data/projects.ts` carry a status and a four-part
  proof block written from what the repository actually shows:
  | Project | Status |
  | --- | --- |
  | Prince M Furnishing Concept | Concept |
  | D Connect Delivery Services | Prototype |
  | PureNest Cleaning Co. | Concept (fictional, not client work) |
  | Stayora | Deployed Demo (mock data, not a booking platform) |
  | PNK and Clarean Peekan | Deployed Demo (development preview) |
- No client, revenue, user, conversion, testimonial, award or production-usage
  claim is made anywhere.
- `src/components/work/ProjectProof.tsx` renders the status badge and the proof
  block (definition list: Purpose / Contribution / Delivered / What it is not).
- Homepage cards show the status and a one-line contribution; `/work` shows the
  full proof for every project.
- The five approved live URLs are unchanged, and every media frame keeps the
  order **media → "View Live Website ↗" → caption** with `target="_blank"`,
  `rel="noopener noreferrer"` and an accessible label (PR #10 behaviour).

### 4. D Connect case study

- `src/components/work/ProjectCaseStudy.tsx` adds an evidence-based case study
  on `/work` for the project that carries a `caseStudy` in the data.
- It demonstrates product discovery, catalogue browsing, delivery-service
  information architecture, responsive presentation, mobile-friendly UI and
  business-oriented product thinking.
- It states plainly what the prototype is **not**: no payment processing, no
  production checkout, no order management, no real-time tracking, no
  logistics infrastructure.

### 5. About and Contact

- About now represents the truthful combination — Computer Engineering
  background, web development, technical support, computer/device support,
  coding instruction, learning systems, school and office technology,
  documentation, digital and visual support — positioned as *technical
  implementation + practical digital support*, with an eight-item capability
  grid. No employers, certifications, years or metrics are invented.
- Contact serves two audiences (project enquiries and professional
  opportunities), preserves the WhatsApp CTA and destination, and **no longer
  prints the phone number** anywhere (visible text, screen-reader text,
  attributes or `tel:` links). WhatsApp remains the only published channel.

### 6. SEO, canonical URLs, metadata, structured data, sitemap

- `src/data/site.ts` resolves the public origin most-explicit-first:
  `NEXT_PUBLIC_SITE_URL` → Vercel's `VERCEL_PROJECT_PRODUCTION_URL` →
  Vercel's `VERCEL_URL` → local development origin. The environment-variable
  architecture is kept and no domain is hard-coded.
- `src/lib/seo.ts` (`pageMetadata`, `absoluteUrl`, `shareImageUrl`,
  `structuredData`) is the single place that decides what absolute URLs may be
  published. In a production build with no configured origin, canonical URLs
  and Open Graph/Twitter images are **omitted** rather than published as
  `http://localhost:3000` — this also removes the `metadataBase` warning path
  where Next resolves relative images against localhost. The sitemap and
  robots.txt follow the same rule: with no configured origin, `sitemap.xml`
  lists no entries and `robots.txt` has no `Sitemap:` line.
- Every route (`/`, `/work`, `/solutions`, `/about`, `/contact`) now has its
  own accurate title, description, canonical, Open Graph and Twitter/X
  metadata.
- JSON-LD adds a `Person` and a `ProfessionalService` whose offer catalogue is
  the two service pathways. No ratings, reviews, prices, awards, locations,
  organization relationships or founding dates.
- `src/app/sitemap.ts` no longer stamps every route with `new Date()`; it uses
  the hand-maintained `site.contentUpdated` dates, which are stable between
  requests and updated when content actually changes.

### 7. Accessibility

- `/work` heading outline fixed: `h1` (page title) → `h2` (project titles and
  case-study sections) → `h3` (case-study subsections) → `h4` (demonstrated
  areas). The previous outline jumped `h1` → `h3`. Visual styling is unchanged;
  only semantics moved. `/solutions` also now runs `h1` → `h2` (pathway) →
  `h3` (area rows).
- The pathway cards are labelled `<section>` elements, so the site keeps one
  convention for `<article>` (project cards) that the media suite depends on.
- Link names, alt text, focus states, reduced motion and contrast were checked
  by the build 08 suite.

### 8. Fail-open scroll reveals (animation is not a prerequisite for content)

- `src/lib/reveal.ts` adds the fail-open contract: the inline bootstrap arms
  the animation before paint (no flash) and schedules a 2.5s failsafe; the
  controller marks `<html data-reveal-controller="ready">` once observers are
  attached.
- If the controller never runs (failed bundle, blocked script, exception) the
  failsafe adds `.reveal-failsafe` and the CSS forces every reveal target
  visible. If the failsafe already fired, a late controller shows everything
  instead of re-hiding it.
- With JavaScript disabled, the `<noscript>` rule (now a working selector —
  the previous `noscript .reveal` could never match) keeps content visible.
- Animation behaviour, reduced-motion behaviour and visual quality are
  otherwise unchanged.

### 9. Copy quality

- Fixed punctuation and awkward phrasing, e.g. "Is your website getting in the
  way." → "Is your website getting in the way?", and the missing question marks
  in the CTA band headings.
- New copy avoids unsupported superlatives (no "world-class",
  "industry-leading", "expert", "best-in-class", "10x", "guaranteed results").

## Validation

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | clean |
| `npm run build` | success, 11/11 static pages, no metadataBase warning |
| `git diff --check` | clean |
| Localhost check, unconfigured build | HTML, `sitemap.xml` and `robots.txt` output contain no `localhost`; a build with a configured origin emits absolute sitemap URLs and a `Sitemap:` line |
| `tests/build08-proof-pathways.cjs` | **82/82 checks passed** |
| `tests/build05-theme.cjs` | **179/179 checks passed** |
| `tests/build04-media.cjs` | stops at the pre-existing film playback loop (see below) |

The Build 08 suite covers: the five routes at 1440px and 390px (status, console
errors, horizontal overflow), the homepage pathways and CTAs, the `/solutions`
pathway structure and anchors, the `/work` heading outline and statuses and
proof labels, all five approved live URLs with their attributes, media → live
link → caption order, the case study's honesty constraints, the contact
audience structure and phone-number absence, JSON-LD validity, and the four
fail-open reveal scenarios (normal, JS chunks blocked, JS disabled, reduced
motion).

### Test maintenance in this build

Three assertions had drifted from the implementation and were corrected while
validating (two of them were already failing before Build 08 — reproduced
against a pristine checkout of `main`):

- `tests/build05-theme.cjs` looked for project titles as `h3` on `/work`;
  Build 08 moves them to `h2`, so the lookup is now role-based and
  level-agnostic.
- Both suites used stale project titles that no longer match the data
  (`"D-Connect Delivery Services"`, `"PNK / Clarean Peekan"` → the actual
  `"D Connect Delivery Services"`, `"PNK and Clarean Peekan"`).
- `tests/build05-theme.cjs` expected the document title `"Work — Arum Jonathan
  Nnamdi"`; the root template has used a pipe separator, so it now asserts
  `"Work | Arum Jonathan Nnamdi"`.

### Pre-existing issue in this sandbox

`tests/build04-media.cjs` stops in the parallel film-playback section
(`locator.scrollIntoViewIfNeeded: Element is not attached to the DOM`, line
167). The identical failure occurs on a pristine `main` checkout in this
environment, so it is not a Build 08 regression. The media system itself was
verified directly: all five play buttons find their films, a user-initiated
playback decodes and plays (1280px, 21s duration), no video bytes are
requested before a click, and poster/asset/byte-range checks pass.

## Known limitations

- `NEXT_PUBLIC_SITE_URL` is not set in this repository, so a local production
  build publishes no canonical/Open Graph URLs and no sitemap entries, and its
  `robots.txt` has no `Sitemap:` line (by design, so nothing points at
  localhost). On Vercel the origin is resolved automatically, and setting the
  variable produces absolute URLs everywhere.
- The single-film playback path is covered by the Build 08 suite; the
  all-films parallel loop in the Build 04 suite cannot complete reliably in
  this sandbox.

## Intentionally not changed

- No redesign: tokens, typography, motion system, theming, navigation, footer
  (PR #11), hero media, project films/stills and routes are untouched.
- The five approved live URLs and the `View Live Website ↗` CTA.
- Build 06 motion and Build 07 typography/humanization work.
- No new runtime dependencies, and no dependency upgrades.
- Project order and the existing project categories/short descriptions.
- No project detail routes were added (`/work/[slug]` remains a future option).
- No pull request — this build stops at the commit for review.
