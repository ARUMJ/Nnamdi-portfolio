import type { ProjectMedia } from "@/lib/types";

interface SiteMedia {
  /**
   * Homepage hero showreel slot. Resolved by the Hero through the site-wide
   * chain: VIDEO → POSTER → STILL → DESIGNED PLACEHOLDER.
   */
  heroShowreel?: ProjectMedia;
}

/**
 * Site-level media slots (media that belongs to the site rather than to a
 * single project).
 *
 * Intentionally empty today: no real showreel exists yet, and none is
 * faked. When the film is ready, drop the optimized files under
 * `public/media/showreel/` and add the entry here — the Hero upgrades
 * itself with no component changes:
 *
 *   heroShowreel: {
 *     kind: "video",
 *     src: "/media/showreel/showreel.mp4",
 *     poster: "/media/showreel/poster.jpg",
 *     alt: "…honest description of what the film shows…",
 *     autoplay: true,   // resolved muted, in-view only, reduced-motion safe
 *     loop: true,
 *   },
 *
 * A still works the same way with `kind: "image"`.
 */
export const siteMedia: SiteMedia = {};
