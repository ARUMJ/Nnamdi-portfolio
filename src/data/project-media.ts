import type { ProjectImage, ProjectVideo } from "@/lib/types";

/** Final browser-captured media. Provenance and shot lists: docs/build-04-media.md. */
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
