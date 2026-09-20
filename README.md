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
    media/        # media system: placeholders, images, lazy video, galleries
    solutions/    # solution row + icons (homepage + /solutions)
    work/         # project showcase layout + meta
    home/         # homepage sections (hero, statement, work, process, ...)
  data/           # site identity, solutions, projects (the content source)
  lib/            # shared TypeScript data models
```

## Content conventions

- All portfolio content is **data-driven** from `src/data/`. Adding a
  project or solution is a data change, not an architecture change.
- **Unknown fields are left empty** — components render branded
  placeholders. Content must never be fabricated (no invented clients,
  results, statistics, or project details).
- Project media (films/stills) is added by filling `images`/`videos` on a
  project. The `ProjectMediaFrame` resolves video → image → placeholder
  automatically. Large video files must never be committed to the
  repository; use optimized static/CDN hosting and reference by URL.
- The hero "Portfolio film" slot and the About "portrait" slot are
  deliberate branded placeholders with the same treatment.
