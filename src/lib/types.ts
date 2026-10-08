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

/* -------------------------------------------------------------------- */
/* Service pathways — Build 08                                          */
/* -------------------------------------------------------------------- */

/**
 * A primary service pathway: the two clear routes through the work
 * (Web & Digital Development / Digital Assistance & Technical Support).
 * Each pathway owns the solution areas that sit inside it, so the
 * homepage index, the /solutions page and the structured data all read
 * from one source.
 */
export interface ServicePathway {
  id: string;
  /** Editorial number, matching the site's numbered-row language. */
  number: string;
  title: string;
  icon: SolutionIconName;
  /**
   * Visual treatment. "inverse" is the cinematic dark band/card already
   * used by the Process and CTA sections — it keeps the two pathways
   * clearly distinguishable without inventing a new visual language.
   */
  tone: "default" | "inverse";
  /** One or two lines for the pathway summary card. */
  summary: string;
  /** Longer framing for the /solutions page. */
  detail: string;
  /** Concrete capabilities. Only work actually done on these projects. */
  capabilities: string[];
  /** The solution areas that belong to this pathway. */
  areas: Solution[];
}

/* -------------------------------------------------------------------- */
/* Media model                                                          */
/* -------------------------------------------------------------------- */

/**
 * Fields shared by every media item.
 *
 * `alt` is mandatory: images need honest alt text, videos need an honest
 * description of what they show. `label` and `caption` are optional
 * editorial extras rendered as figure captions when supplied.
 */
interface MediaBase {
  /** Meaningful, honest alt text / description of what the media shows. */
  alt: string;
  /** Optional small-caps label (e.g. "Homepage", "Booking flow"). */
  label?: string;
  /** Optional caption, rendered in a figcaption. */
  caption?: string;
}

export interface ProjectImage extends MediaBase {
  kind: "image";
  /** Public path (e.g. /media/projects/stayora/01.jpg) or absolute CDN URL. */
  src: string;
  /** Whether this image loads with priority (LCP image on a case-study page). */
  priority?: boolean;
}

export interface ProjectVideo extends MediaBase {
  kind: "video";
  /** Public path (e.g. /media/projects/stayora/film.mp4) or absolute CDN URL. */
  src: string;
  /**
   * Poster/cover image. Shown before playback, and always shown when the
   * video cannot or should not play (load failure, reduced motion, missing
   * video support) — it is the first step of the fallback chain.
   */
  poster?: string;
  /**
   * Ambient playback intent. CinematicVideo resolves it against
   * prefers-reduced-motion and viewport visibility, always muted and
   * never more than one ambient video at a time. User-initiated playback
   * (click) is always available regardless of this flag.
   */
  autoplay?: boolean;
  /** Sound for user-initiated playback (default false). Ambient is always muted. */
  muted?: boolean;
  /** Loop (default true for ambient playback, false for user-initiated). */
  loop?: boolean;
  /** Native controls (default true for user-initiated playback, false ambient). */
  controls?: boolean;
}

/**
 * Any media that can occupy a slot, discriminated by `kind` so the
 * resolution chain is type-safe at runtime as well as compile time.
 */
export type ProjectMedia = ProjectVideo | ProjectImage;

export function isVideoMedia(media: ProjectMedia): media is ProjectVideo {
  return media.kind === "video";
}

export function isImageMedia(media: ProjectMedia): media is ProjectImage {
  return media.kind === "image";
}

/**
 * A portfolio project.
 *
 * The media slots follow the site-wide resolution priority used by the
 * media components:
 *
 *   Project
 *   → heroMedia      case-study hero (film + poster, or a still)
 *   → featuredMedia  showcase frame on the homepage and /work
 *   → gallery        additional mixed stills/clips (screenshots, details)
 *   → liveUrl
 *
 * A video item carries its own poster, so every slot degrades along the
 * same chain: VIDEO → POSTER/COVER → STATIC IMAGE → DESIGNED PLACEHOLDER.
 * All slots are optional; branded placeholders render until real assets
 * are supplied. Unknown fields stay `undefined` — they are not fabricated.
 */
/**
 * Honest delivery status. Every project states which of these it is, so a
 * concept is never read as client work and a prototype is never read as a
 * production system.
 */
export type ProjectStatus =
  | "Concept"
  | "Prototype"
  | "Deployed Demo"
  | "Production Website";

/**
 * The four-part project proof, so every project answers the same
 * questions: why it exists, what I did, what was produced, and what it
 * is not. `contributionSummary` is the one-line version shown on the
 * compact homepage cards; the lists carry the detail on /work.
 */
export interface ProjectProof {
  /** What problem or business idea the project set out to address. */
  purpose: string;
  /** One-line version of the contribution, for compact cards. */
  contributionSummary: string;
  /** What I personally built, designed, implemented or contributed. */
  contribution: string[];
  /** What functionality or experience was actually produced. */
  delivered: string[];
  /** Optional honest scope note: what the project does not include. */
  notIncluded?: string[];
}

/** One demonstrated area inside a case study. */
export interface ProjectCaseStudySection {
  title: string;
  description: string;
}

/**
 * An evidence-based case study for a single project: what the work
 * demonstrates, framed so nothing beyond the built prototype is implied.
 */
export interface ProjectCaseStudy {
  summary: string;
  demonstrates: ProjectCaseStudySection[];
}

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
  /** Concept | Prototype | Deployed Demo | Production Website. */
  status?: ProjectStatus;
  /** Purpose, contribution, delivery and scope — see ProjectProof. */
  proof?: ProjectProof;
  /** Optional deeper case study (currently used by D Connect). */
  caseStudy?: ProjectCaseStudy;
  /** Hero media for a case-study page: a film (with poster) or a still. */
  heroMedia?: ProjectMedia;
  /** Media for the showcase frames on the homepage and /work. */
  featuredMedia?: ProjectMedia;
  /** Additional mixed stills and clips — screenshots, details, films. */
  gallery?: ProjectMedia[];
  liveUrl?: string;
  githubUrl?: string;
  /** Featured projects render first / larger in showcases. */
  featured?: boolean;
}
