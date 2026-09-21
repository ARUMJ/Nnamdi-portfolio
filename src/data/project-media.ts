import type { ProjectImage, ProjectVideo } from "@/lib/types";

/** Final browser-captured media. Provenance: docs/build-04-media.md and docs/build-04-revision.md. */
function showcase(slug: string, alt: string, caption: string): ProjectVideo {
  return {
    kind: "video",
    src: `/media/projects/${slug}/showcase.mp4`,
    poster: `/media/projects/${slug}/showcase-poster.jpg`,
    alt,
    label: "Interface film · 21 seconds",
    caption,
    autoplay: false,
    muted: true,
    loop: false,
    controls: true,
  };
}

export const projectFilms = {
  stayora: showcase(
    "stayora",
    "Stayora frontend demo: featured mock property cards, destination browsing, Asheville results, and a mobile property page.",
    "Actual frontend prototype. Listings, prices, ratings and host details are mock data; no live booking, payment or accounts are demonstrated.",
  ),
  pnk: showcase(
    "pnk-clarean-peekan",
    "PNK / Clarean development preview: branded homepage, product categories, supplied flask photographs, and the mobile Vacuum Flasks page.",
    "Actual development-branch website, not a production store. Supplied product photography and labelled illustrative category images; enquiries, not checkout.",
  ),
  princeM: showcase(
    "prince-m-furnishing-concept",
    "Prince M website: black-and-gold homepage, three service panels, Interior Design section, and the mobile homepage.",
    "Captured from the actual website. Interior imagery is illustrative, not completed client projects.",
  ),
  dConnect: showcase(
    "d-connect-delivery-services",
    "D-Connect website: homepage, foodstuff categories, Honey Beans product details, and mobile category browsing.",
    "Prototype catalogue. Product enquiries use WhatsApp; no checkout or payment flow is shown.",
  ),
  pureNest: showcase(
    "purenest-cleaning-co",
    "PureNest fictional concept: homepage, cleaning services, Deep Cleaning page, and an expanding FAQ on mobile.",
    "Fictional concept project — not client work. Captured from the implemented interface.",
  ),
} satisfies Record<string, ProjectVideo>;

export function projectStills(
  slug: string,
  desktopAlt: string,
  mobileAlt: string,
): ProjectImage[] {
  return [
    {
      kind: "image",
      src: `/media/projects/${slug}/desktop.jpg`,
      alt: desktopAlt,
      label: "Desktop interface",
    },
    {
      kind: "image",
      src: `/media/projects/${slug}/mobile.jpg`,
      alt: mobileAlt,
      label: "Mobile interface",
    },
  ];
}
