# Media assets

Home for the portfolio's real media once it exists. The media system
(components in `src/components/media/`) reads everything through the data
model in `src/lib/types.ts` — files placed here only become visible on the
site once they are referenced from `src/data/projects.ts` or
`src/data/media.ts`.

## Structure

```
public/media/
  showreel/                     # site-level portfolio film + poster
    showreel.mp4
    poster.jpg
  projects/
    <project-slug>/             # one folder per project slug in src/data/projects.ts
      film.mp4                  # featured project film
      poster.jpg                # film poster / cover image
      screenshots/              # UI captures, referenced as gallery images
        01-home.jpg
      images/                   # any other stills (details, context shots)
        01.jpg
```

## Conventions

- **Never commit large binaries.** Films should be optimized (H.264/AAC MP4,
  1080p or lower, ~2–8 Mbps for showreels, shorter loops smaller). If a film
  outgrows the repository, host it on a CDN/static bucket and reference the
  absolute URL in the data model instead — add remote domains to
  `images.remotePatterns` in `next.config.ts` only for images.
- **Every video needs a poster.** The poster is the first fallback step and
  what reduced-motion visitors see; export a JPG/WebP at the video's aspect
  ratio, ~1600–2000 px wide.
- **Aspect ratios are reserved in the components** (`aspect-[16/9]`,
  `aspect-[4/3]`, …). Prefer media that matches the frame ratio; screenshots
  that must not be cropped can set `fit` handling via the gallery/image
  components instead of being stretched.
- **Alt text is mandatory and honest** — describe what the media actually
  shows. No invented claims in captions or labels either.
- Files: lowercase, hyphen-separated, no spaces.

## Wiring an asset

```ts
// src/data/projects.ts
{
  id: "proj-01",
  slug: "stayora",
  title: "Stayora",
  featured: true,
  featuredMedia: {
    kind: "video",
    src: "/media/projects/stayora/film.mp4",
    poster: "/media/projects/stayora/poster.jpg",
    alt: "Screen recording of the Stayora booking flow",
  },
  gallery: [
    {
      kind: "image",
      src: "/media/projects/stayora/screenshots/01-home.jpg",
      alt: "Stayora homepage on desktop",
      label: "Homepage",
      caption: "The landing view a visitor sees first.",
    },
  ],
}
```

Until a file exists for a slot, the components render the branded
placeholder — an empty folder here changes nothing on the site.
