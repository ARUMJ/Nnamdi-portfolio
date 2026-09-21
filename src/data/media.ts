import type { ProjectMedia } from "@/lib/types";
import { projectFilms } from "./project-media";

interface SiteMedia {
  heroShowreel?: ProjectMedia;
}

/** One ambient film only. All project cards remain click-to-play facades. */
export const siteMedia: SiteMedia = {
  heroShowreel: {
    ...projectFilms.princeM,
    label: "In focus · Prince M Furnishing Concept",
    caption: "The actual website, on desktop and mobile. Interior imagery is illustrative.",
    autoplay: true,
    loop: true,
  },
};
