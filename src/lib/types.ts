/**
 * Data models for the portfolio.
 *
 * Every field that cannot yet be filled with *known* information is optional.
 * Components are required to render graceful, branded placeholders for empty
 * fields — never fabricate content to fill a gap.
 */

export type SolutionIconName =
  | "website"
  | "product"
  | "improve"
  | "support"
  | "education";

/** A solution area (homepage preview + /solutions page). */
export interface Solution {
  id: string;
  slug: string;
  icon: SolutionIconName;
  title: string;
  /** One or two lines, framed around the business problem it addresses. */
  shortDescription: string;
  /** Longer description for the /solutions page. Same positioning, no invented claims. */
  description?: string;
  /** Short, category-level items describing the kind of need the solution fits. */
  fits?: string[];
}

export interface ProjectImage {
  /** Public path (e.g. /projects/stayora/01.jpg) or absolute CDN URL. */
  src: string;
  /** Meaningful, honest alt text. */
  alt: string;
  /** Whether this image loads with priority (LCP image on a case-study page). */
  priority?: boolean;
}

export interface ProjectVideo {
  /** Public path (e.g. /projects/stayora/film.mp4) or absolute CDN URL. */
  src: string;
  /** Poster image shown before the visitor starts playback. */
  poster: string;
  /** Description of what the video shows. */
  alt: string;
}

/**
 * A portfolio project. Anticipates the full case-study fields so future
 * builds can populate them without schema changes.
 *
 * Unknown fields stay `undefined` — they are not fabricated.
 */
export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Known category only. Omit when it is not known. */
  category?: string;
  shortDescription?: string;
  description?: string;
  problem?: string;
  solution?: string;
  role?: string;
  technologies?: string[];
  features?: string[];
  images?: ProjectImage[];
  videos?: ProjectVideo[];
  liveUrl?: string;
  githubUrl?: string;
  /** Featured projects render first / larger in showcases. */
  featured?: boolean;
}
