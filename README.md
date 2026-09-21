# Nnamdi-portfolio

Solution-driven personal portfolio for **Arum Jonathan Nnamdi — Digital Assistant & Web Developer**.

The site positions Arum as a practical technology problem-solver who helps businesses and organizations turn digital needs into working solutions.

## Stack

- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- React (Server Components by default; client components only where state/interaction is required)
- Self-hosted variable fonts via `@fontsource-variable` (Fraunces + Instrument Sans) — no build-time font fetching

## Getting started

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run start
```

Type-checking:

```bash
npm run typecheck
```

## Environment

Copy `.env.example` to `.env.local` and set the production origin:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Until a domain is configured the app falls back to a local origin; the
sitemap should not be submitted to search engines until this is set.

## Structure

```
src/
  app/            # routes: /, /solutions, /work, /about, /contact
                  # + sitemap.ts, robots.ts, layout, metadata, favicon
  components/
    layout/       # header, navigation, footer, page header
    ui/           # buttons, section headings, CTA band, icons
    media/        # media system: cinematic video, frames, galleries, placeholders
    solutions/    # solution row + icons (homepage + /solutions)
    work/         # project showcase layout + meta
    home/         # homepage sections (hero, hero media, statement, work, …)
  data/           # site identity, site media slots, solutions, projects
  hooks/          # media behaviour hooks (reduced motion, in-view)
  lib/            # shared TypeScript data models
public/
  media/          # real media assets once they exist (see public/media/README.md)
```

## Content conventions

- All portfolio content is **data-driven** from `src/data/`. Adding a
  project or solution is a data change, not an architecture change.
- **Unknown fields are left empty** — components render branded
  placeholders. Content must never be fabricated (no invented clients,
  results, statistics, or project details).
- The media system follows one resolution priority everywhere:
  **VIDEO → POSTER/COVER → STATIC IMAGE → DESIGNED PLACEHOLDER**.
  Each project exposes three optional slots — `heroMedia` (case-study
  hero), `featuredMedia` (showcase frames) and `gallery` (mixed stills and
  clips with optional labels/captions) — and the site exposes
  `siteMedia.heroShowreel` for the homepage hero. `ProjectMediaFrame`,
  `CinematicVideo`, `MediaGallery` and `HeroMedia` resolve them
  automatically; supplying an asset is a pure data change.
- Videos are lazy by design: click-to-play facades request zero bytes until
  clicked, ambient (`autoplay`) videos load only in view, always muted,
  never more than one at a time, and never under `prefers-reduced-motion`.
  Every video degrades to its poster, then to the branded placeholder.
- Media files live under `public/media/` (conventions in
  `public/media/README.md`). Large video files must never be committed to
  the repository; use optimized static/CDN hosting and reference by URL.
- The hero "Portfolio film" slot and the About "portrait" slot are
  deliberate branded placeholders with the same treatment.
