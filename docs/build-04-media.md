# Build 04 — real interface films

> **Revised:** all five projects now have films. The initial main-only Stayora/PNK
> assessment below was superseded by a complete branch/history audit. See
> [Build 04 revision](build-04-revision.md) for source SHAs, assets and five-film validation.

Produced and validated 21 September 2026. Base: `6d7a9d0b94d814165a8f612c3d7c4bc92390e5c9`
(Build 03, verified against fetched `origin/main`). Working branch:
`arena/01a0c56f-nnamdi-portfolio`. No new case-study routes or redesign.

## Source audit and editorial decisions

| Project / repository | Inspected source commit | Decision |
| --- | --- | --- |
| [D-Connect](https://github.com/ARUMJ/d-connect-delivery-services) | `ac772a7b08df76e46bff0e8808a0700fc684a990` | Film: implemented homepage, categories, product detail and mobile cards. Prototype catalogue; WhatsApp enquiries, not a checkout/payment/tracking system. |
| [Prince M](https://github.com/ARUMJ/prince-m-furnishing-concept) | `7c25816b1038cc73deb97885323d8b35f83475c0` | Film: implemented homepage, service triptych, Interior Design chapter and mobile homepage. Existing renders are illustrative, not photographs of completed client projects. |
| [PureNest](https://github.com/ARUMJ/purenest-cleaning-website) | `da7ff4df53c4bd1a70d5427998c16f88ae76c5f7` | Film: implemented homepage, services, Deep Cleaning route and mobile FAQ. **Fictional concept — not client work.** No quote is submitted, no business results or testimonials are claimed. |
| [Stayora](https://github.com/ARUMJ/stayora) | `97871513500fbdecf7e0b78f4fa73003a2f1cb97` | Initial `main` inspection only. **Superseded:** an existing Arena branch contains implemented discovery UI; its film is now integrated (see revision report). |
| [PNK / Clarean](https://github.com/ARUMJ/pnk-enterprises-website) | `522ded38ab099b6e80f29f9938d6cfaeeb97f116` | Initial `main` inspection only. **Superseded:** `dev` contains a multi-page brand/product website; its film is now integrated (see revision report). |

### Deployment access and local capture

Attempted the GitHub-listed deployments in Chromium:

- `https://d-connect-delivery-services.vercel.app`
- `https://prince-m-furnishing-concept-weld.vercel.app`
- `https://purenest-cleaning-website-sooty.vercel.app`
- `https://stayora-phi.vercel.app`

All returned `net::ERR_CONNECTION_CLOSED` from this environment. This is an access
limitation, **not a claim that the public sites are down**. The three capture
candidates were cloned, inspected, installed, production-built, and served locally
from the commits above. No UI, copy, features, product images, or layout were
recreated. No source-project changes were committed.

D-Connect's Google Fonts endpoint was also inaccessible: browser requests were
fulfilled with the same Fraunces and Plus Jakarta Sans families from Fontsource.
PureNest's documented optional `public/fonts` setup was completed with its specified
DM Sans and Playfair Display WOFF2 files from Fontsource. Prince M's checked-in
local fonts were used directly. These restore the source projects' intended fonts,
not a new visual identity.

## Production method

Playwright/Chromium captured the rendered interfaces at **1280 × 800 desktop** and
**390 × 844 mobile**, after fonts, visible images, hydration, and entrances settled.
Frame-by-frame eased scrolling gives controlled 30 fps motion without cursor
wandering or waiting/loading frames. Actual links were used to enter D-Connect's
Beans category and Honey Beans page, Prince M's Interior Design chapter, and
PureNest's Deep Cleaning route. PureNest's real mobile FAQ button was activated.
No forms were submitted or WhatsApp conversations sent.

FFmpeg assembles five paced shots with clean cuts, a restrained flat matte, and a
small persistent disclosure **outside** the captured interface. The responsive
shot pairs an actual desktop frame with actual moving mobile UI. No synthetic UI,
new generated imagery, stock footage, fake devices, audio, or musical track was
added. Existing website imagery stays inside its original UI.

### Shot lists (all films: 21 seconds)

| Time | D-Connect | Prince M | PureNest |
| --- | --- | --- | --- |
| 0–4s | Homepage, slow scroll | Black/gold homepage, slow scroll | Concept homepage, slow scroll |
| 4–9s | Foodstuff category cards | Three service panels | Cleaning service cards |
| 9–14s | Honey Beans product detail; prototype note and WhatsApp CTA | Interior Design service chapter | Deep Cleaning service page |
| 14–19s | Desktop + mobile category browsing | Desktop + mobile homepage | Desktop + mobile FAQ; recurring-cleaning answer opens |
| 19–21s | Return to homepage identity | Return to homepage identity | Return to homepage identity |

Opening/ending frames, shot boundaries, the responsive segment, and intermediate
frames were inspected. The D-Connect category shot was re-captured to give its
heading better clearance under the sticky header. All frames are the actual
interfaces. Source pages produced no JavaScript page errors during final capture.

## Final assets

Each directory contains exactly these four final deliverables (plus the existing
`.gitkeep`): `showcase.mp4`, `showcase-poster.jpg`, `desktop.jpg`, `mobile.jpg`.
No raw frames, temporary recordings, encoding intermediates, tools, clones, or
unreferenced duplicate films are committed.

| Directory under `public/media/projects/` | MP4 bytes | MP4 MB (decimal) | Poster bytes |
| --- | ---: | ---: | ---: |
| `d-connect-delivery-services/` | 1,920,603 | 1.92 | 82,064 |
| `prince-m-furnishing-concept/` | 1,659,435 | 1.66 | 76,648 |
| `purenest-cleaning-co/` | 1,414,735 | 1.41 | 92,367 |

All MP4s: **H.264, yuv420p, 1280 × 800, 30 fps, 630 frames, 21.000 seconds**,
fast-start metadata, **no audio stream**. Total video payload: 4,994,773 bytes.
Posters are optimized JPEGs from each exported opening frame. Desktop/mobile JPEGs
are independent real browser captures, available to future galleries and fallback.

## Integration (Build 03 retained)

- `src/data/project-media.ts` centralizes the three film descriptors and gallery
  paths. No media URLs are scattered through components.
- `src/data/projects.ts` populates `heroMedia`, `featuredMedia`, and `gallery`.
  Prince M is first/featured, followed by D-Connect and PureNest. The revision adds Stayora and PNK films from their implemented non-main branches. PureNest's original fictional-project disclosure is
  unchanged, with additional disclosure in the caption and film itself.
- `src/data/media.ts` references the **same** Prince M file for the homepage hero.
  Only this instance has ambient playback intent. There is no duplicate showreel.
- Homepage Selected Work and `/work` use the existing resolver and poster-first
  click-to-play facades. Work requests **zero MP4s** until a visitor plays one.
- Real films use reserved 16:10 frames so UI and disclosure are not cropped into
  the previous ultrawide/4:3 treatments. No fonts, palette, navigation, contact,
  portrait, or unrelated sections were redesigned.
- Small hardening in the existing player: poster errors now fall through to the
  first gallery still via `ResponsiveImage`, then the existing designed placeholder;
  poster alt text is meaningful; ambient visibility uses a zero-margin observer
  so bytes/playback wait for actual visibility. The facade tint is lighter so real
  posters remain legible. The architecture was not replaced.
- Muted/inline playback, native controls, keyboard play, single ambient registry,
  hidden-tab pause, off-screen pause, lazy facades and reduced-motion behavior remain.
- No case-study routes existed; none were added. Media data is ready for them.
- No runtime/build dependencies were added, and the lockfile is unchanged.

## Validation

### Build and source checks

- `npm install` — passed; package/lockfile unchanged.
- `npm run typecheck` — passed.
- `npm run build` — passed; all existing routes prerendered.
- `git diff --check` — passed.
- Dedicated lint command/config: **not configured**. No claim of an independent
  ESLint run. Next's production build ran its available validation.
- `npm audit`: existing dependency tree reports one moderate (`next`, via PostCSS)
  and one high (`postcss`) advisory entry. Dependency upgrades are not included in
  this media-focused build; follow up separately.

### Chromium desktop/mobile against the production server

- `/`, `/solutions`, `/work`, `/about`, `/contact`: HTTP 200 at 1440px and 390px.
- No unexpected console/page errors or failed asset responses in normal browsing.
- No horizontal overflow, including after scrolling every Work card into view.
- Mobile navigation: open, Escape, and navigation to Work passed. WhatsApp links
  retain the existing `https://wa.me/2348102505135`; no external message was sent.
- All 12 final media URLs: HTTP 200. MP4 Range request: HTTP 206, correct 1024 bytes.
- All three films played through to 21 seconds on both viewport sizes, muted with
  inline/native controls. All files decoded completely with FFmpeg, no errors.
- Opening/closing frames, aspect ratio, shot sequence, mobile composition and
  disclosure text inspected. No invented functionality or capture/loading chrome.
- Reduced motion at both sizes: **zero MP4 requests, zero mounted videos**, real
  posters retained. Changing motion preference during ambient playback removes it.
- Home: exactly **one** playing ambient video; off-screen pause, return-to-view
  resume and hidden-document visibility handler tested.
- Blocked autoplay: poster + accessible Play button. Missing codec: static fallback.
- Aborted video: poster. Aborted video and poster: real gallery still. All project
  image requests aborted too: designed placeholder. Fault injection errors are
  intentional and excluded from the normal-browsing error assertions.
- Keyboard Enter starts each project film. Native controls permit pause/fullscreen.
- Work's complete scroll-through requests **zero videos** before interaction.
- Cold homepage sanity sample: ~2.18 MB total transfer including its 1.66 MB film;
  three optimized poster responses ~18–25 KB each. No request for the other films.
- Video frame dimensions remain identical before/after playback. Measured homepage
  CLS ~0.00185 desktop / 0 mobile; Work ~0.00003 desktop / ~0.003 mobile. Maximum
  measured route CLS ~0.031 on existing Solutions; **not a claim of zero site-wide
  layout shift**. Media frames have reserved geometry.

A repeatable standalone test is included at `tests/build04-media.cjs`. It exercises
routes, asset/range responses, full playback, media policies, reduced motion,
error fallbacks, mobile navigation and network/layout sanity. With the production
server running, provide Playwright through separate tooling (not app dependencies):

```sh
NODE_PATH=/path/to/tooling/node_modules node tests/build04-media.cjs
```

Optional environment variables: `BASE_URL`, `CHROMIUM_EXECUTABLE_PATH`, and
`MEDIA_TEST_ARTIFACTS`. The test defaults to a temporary directory for screenshots
and results, never to the Git tree. It passed in this environment.

### Boundaries of verification

Mobile checks use Chromium viewport emulation, not physical iOS/Android devices;
Safari/WebKit was not available. Network timing is a local production-server sanity
check, not a field Core Web Vitals or cellular benchmark. A six-context simultaneous
playback stress run completed all films, with ~18–27 dropped frames of 630 per
context on the software-rendered sandbox; that stress is not the portfolio's
single-ambient policy. Deployed project pages were not browser-verifiable due to
the outbound connection limitation above. No public-site uptime claim is made.
