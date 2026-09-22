# Build 04 revision — five projects, five real interface films

Revision of `6a7ca3fe7cffe1ecd2fde36d383bfc240c97268f` on the existing
`arena/01a0c56f-nnamdi-portfolio` branch and PR **#5**. No new branch or PR.

## Correction to the initial audit

The original inspection was too narrowly limited to `main`. A complete remote-head
and reachable-history audit found substantial implemented work on existing
non-main branches. The earlier decision to leave Stayora and PNK as placeholders
is **superseded**. Neither new film required an invented UI, brand animation, or
new concept design: **both are captures of actual implemented websites**.

The restored workspace initially had the completed Build 04 file patch on the old
base commit. Every file was compared by Git blob hash with the already-pushed
Build 04 commit before restoring local HEAD/index to that commit without changing
working files. The portfolio remained on its existing Arena branch throughout.

## Complete source inspection

### Stayora

Repository: <https://github.com/ARUMJ/stayora>

- `main`: `97871513500fbdecf7e0b78f4fa73003a2f1cb97` — foundation/navigation only.
- Existing `arena/019fdeda-stayora`:
  **`97071d2dd59fe791af7a14da37602cb4201b5621`** — captured source.
- Inspected all remote heads, full reachable history, route/component/data/asset
  inventories and the product-definition documentation. Six implementation commits
  after `main` add homepage/search, mock data/cards, browsing, property details,
  destination content and image assets.
- Implemented routes: `/`, `/stays`, `/stays/[id]` (15 static mock-property pages),
  plus the not-found state.
- Real available components: homepage/search panel, featured property grid,
  destination grid, query-driven filtering, property card/gallery, reservation
  demo, responsive header/menu and footer.
- Assets: `hero.jpg`, five destination images, 15 property images, four shared
  demo gallery interiors. Existing imagery is not evidence of real property
  inventory or availability.
- The local property array contains **mock titles, hosts, prices, ratings and
  review counts**. Filtering works on that array. The reservation panel only sets
  local state after a timeout; it is **not a booking backend**. Header account/host
  affordances still point to placeholder anchors.

#### Editorial decision

Capture the strongest completed discovery UI: featured cards, destination imagery,
actual Asheville results, and the mobile cabin-detail layout. The desktop hero's
background-image container has no useful rendered height in this source/browser;
we did **not** repair it or fake a more complete hero for capture. The shared
interior demo gallery is not used; the genuine mobile layout shows only its
primary cabin image. No reservation, authentication, payment, account, host,
review or database interaction is claimed or demonstrated.

Persistent film disclosure:

> STAYORA / Frontend demo — mock listings, prices and ratings. No live booking.

The project caption also identifies mock host details and excludes payment and
accounts. Gallery alt text explicitly identifies the frontend demo and mock data.

### PNK / Clarean

Repository: <https://github.com/ARUMJ/pnk-enterprises-website>

- `main`: `522ded38ab099b6e80f29f9938d6cfaeeb97f116` — README/ignore only.
- Both existing `dev` and `arena/019ff0d3-pnk-enterprises-website` resolve to
  **`cbbf86b4806c3e34c4be1add912847fef9c75c77`** — captured source.
- Inspected complete remote heads and reachable history, including original asset
  addition (`658f564`), asset integration (`6328037`), approved photograph work,
  the illustrative-image disclosure fix, and current motion/portrait fixes.
- Reviewed README, `KICKOFF.md`, `HANDOFF.md`, `PROJECT_STATE.md`, all route and
  component inventories, category/business data and public asset directories.
- Implemented routes: `/`, `/products`, five `/products/[slug]` category pages,
  `/about`, `/contact`, plus not-found and SEO/share routes.
- Genuine available material includes the supplied PNK brand mark, six supplied
  product photographs (GLÜCK food jar/beverage bottle/tumbler, Crown Star cookware,
  Sokany air fryer, Pyramid blender), original source photographs, and the approved
  founder photograph. The founder photograph was **not edited or used in this film**.
- Cooler and household-category illustrations already exist in the project and are
  explicitly labelled illustrative in its UI/data. Those labels remain visible.
- Documentation confirms a **development preview**, not a production deployment.
  Category enquiry links are real interface elements; the site is not a checkout
  or payment system. Product availability must be confirmed with the business.

#### Editorial decision

Capture its actual brand/product website: homepage, category cards, supplied flask
photographs, mobile Vacuum Flasks page. No concept-only substitute was necessary.
No new brand assets, product claims, images or UI were generated.

Persistent film disclosure:

> PNK / CLAREAN / Development preview — enquiries, not checkout.

The portfolio caption also states “not a production store” and distinguishes
supplied product photographs from labelled illustrative category images.

## Deployment and capture conditions

GitHub deployment records report successful previews for the exact captured SHAs:

- Stayora: <https://stayora-595x3b9r7-gospelboys.vercel.app>
- PNK: <https://pnk-enterprises-website-6yfgbwop6-gospelboys.vercel.app>

Both were attempted in Chromium and returned `net::ERR_CONNECTION_CLOSED` from
this sandbox. This is an access limitation, not a public-uptime assertion. Capture
used production builds from Git archives of the exact source commits above.
Source repository branches were not modified, merged or pushed.

Stayora's `next/font/google` build could not reach Google Fonts. A build-time
font response supplied the **same Geist family** from Fontsource, without editing
its UI source or replacing the design. PNK uses its original system-font stacks.

PNK's normal-motion masked image wrappers stayed clipped in this capture browser.
The film uses its **existing reduced-motion presentation**, which reveals those
images correctly. No DOM/CSS patch was used to force a different interface. Film
camera motion is the controlled page scroll, not a claim that masked entrances
are fixed. This source-project motion issue is outside this portfolio revision.

### Shot lists — both films are 21 seconds

| Time | Stayora | PNK / Clarean |
| --- | --- | --- |
| 0–4s | Featured mock property cards on the real homepage | Actual branded homepage with supplied product tiles |
| 4–9s | Destination cards, eased scroll | Product/category cards, with illustrative labels retained |
| 9–14s | Asheville-filtered results, real cabin-card hover | Vacuum Flasks “From the range” photo section |
| 14–19s | Desktop + actual 390px mobile cabin detail | Desktop + actual 390px mobile Vacuum Flasks page |
| 19–21s | Return to featured-property identity | Return to homepage identity |

Stayora's destination card was actually clicked to reach the filtered results;
the cabin card was actually clicked to enter its mobile detail. PNK's Vacuum
Flasks category link was actually followed. No enquiry or booking was submitted.

Desktop capture: Stayora 1280×800; PNK 1600×1000 (then uniformly downscaled).
Mobile capture: 390×844 for both. Final output: 1280×800. This preserves the actual
responsive layouts and matches the existing three films' flat framing, small
external disclosure strip, eased movement, clean cuts and desktop/mobile pairing.

## Final assets

Each new folder contains four referenced, final optimized assets:

| Directory under `public/media/projects/` | `showcase.mp4` | `showcase-poster.jpg` |
| --- | ---: | ---: |
| `stayora/` | 2,030,992 bytes (~2.03 MB) | 115,743 bytes (~116 KB) |
| `pnk-clarean-peekan/` | 1,056,548 bytes (~1.06 MB) | 80,567 bytes (~81 KB) |

Both also contain `desktop.jpg` and `mobile.jpg` real UI captures. No raw captures,
clones, render intermediates, duplicate exports or tooling are committed.

All **five** films were checked with FFprobe/FFmpeg:

- H.264, yuv420p, 1280×800, 30 fps, 630 frames, 21.000 seconds;
- exactly one stream per file: video, **no audio**;
- `moov` precedes `mdat` (fast-start verified);
- complete decode without errors;
- existing three films and their disclosures/assets unchanged.

The complete five-film payload is **8,082,313 bytes (~8.08 MB)**, but it is **not
loaded together**. The two new films add ~3.09 MB of click-to-play media.

## Integration

- Central descriptors added to `src/data/project-media.ts`.
- `heroMedia`, `featuredMedia`, and `gallery` populated for both projects in
  `src/data/projects.ts`, with factual status/capture descriptions.
- Existing components/resolver/fallback architecture unchanged in this revision.
- Five Work cards have actual posters and Play buttons; none normally shows a
  placeholder. Designed placeholders remain only as error fallbacks.
- Prince M remains the **only** ambient homepage film. All five project-card
  films remain lazy, muted, inline, native-control, click-to-play facades.
- Existing project ordering, portfolio design, navigation and WhatsApp unchanged.
- PureNest fictional disclosure, D-Connect prototype disclosure and Prince M
  illustrative-render disclosure retained verbatim.
- No runtime dependencies or lockfile changes; no case-study routes added.

## Revision validation

`npm install`, `npm run typecheck`, `npm run build`, `git diff --check`: passed.
There is still no standalone lint script/configuration in the portfolio.

`tests/build04-media.cjs` now covers all five projects (rather than three):

- `/`, `/solutions`, `/work`, `/about`, `/contact`: 200 at 1440px and 390px;
  no normal-browsing console/page errors or failing resources, no horizontal overflow.
- All **20** final asset URLs: 200; MP4 byte-range request: 206.
- All five films played through to completion at desktop and mobile viewport sizes
  (10 complete playback checks), activated with keyboard Enter. Muted, inline,
  native controls, duration and dimensions asserted.
- For **each** project: aborted video → poster; video+poster failure → its real
  gallery still; all project-image failures → designed placeholder. **15 fallback
  checks passed.** Intentional failure responses are not normal-browsing errors.
- Reduced motion: every card's static poster decoded, Play controls remained
  available, **zero mounted videos and zero MP4 requests** before interaction.
- Work scroll-through: **five Play buttons, zero “Media coming soon” placeholders,
  zero MP4 requests before interaction** at both widths.
- Denied autoplay and no-codec fallbacks passed. Dynamic reduced-motion toggle
  removed the ambient video.
- Homepage off-screen pause, return-to-view resume and hidden-document handler passed.
- Mobile menu open/Escape and navigation to Work passed. WhatsApp remains
  `https://wa.me/2348102505135`; no external message was sent.
- Homepage: one video mounted/playing, only the unchanged Prince M MP4 requested;
  ~2.18 MB local cold-transfer sample, unchanged reserved video geometry.
- Reviewed both new films' opening/end frames, section cuts, intermediate frames,
  mobile composition, disclosure strip and Work presentation.

Re-run using separate Playwright tooling as documented in the original report;
no browser/capture dependencies were added to the app. The playback test now runs
one film's desktop/mobile pair at a time rather than all films simultaneously.
This sandbox run decoded 630 frames per film with ~3 dropped frames per context
for both new films, not a physical-device or field-network benchmark.

## Remaining limitations

- Browser verification is Chromium desktop/mobile emulation, not physical
  iOS/Android or Safari/WebKit.
- External preview URLs remain inaccessible from the capture sandbox. Local
  production builds were tested; remote browser validation is not claimed.
- Stayora remains a frontend prototype with mock inventory and incomplete header
  destinations/account links; its simulated reservation is not showcased.
- PNK is implemented on development branches, not production. The film uses its
  existing reduced-motion layout because of the masked-reveal issue above.
- Source-project images/layouts remain exactly their existing material; this task
  does not fix source-project UI issues or replace supplied/source imagery.
- Existing portfolio dependency-audit findings noted in the original report remain
  outside scope. No framework or source-project dependency upgrade was introduced.
