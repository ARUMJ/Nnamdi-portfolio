import type { Project, ProjectMedia } from "@/lib/types";
import { isVideoMedia } from "@/lib/types";

import { CinematicVideo } from "./CinematicVideo";
import { MediaCaption } from "./MediaCaption";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { ResponsiveImage } from "./ResponsiveImage";

type MediaSlot = "featured" | "hero";

interface ProjectMediaFrameProps {
  project: Project;
  /**
   * Which data slot to resolve:
   * `featured` (showcase frames on the homepage and /work, the default) or
   * `hero` (case-study hero media).
   */
  slot?: MediaSlot;
  /** Caller supplies sizing (e.g. "aspect-[4/3] rounded-xl"). */
  className?: string;
  /** `sizes` hint for poster/image optimization. */
  sizes?: string;
  /** Load poster/image eagerly (above-the-fold media). */
  priority?: boolean;
  /** Subtle editorial zoom on hover (showcase frames). */
  hoverZoom?: boolean;
}

/**
 * The project media resolver — the single place the site-wide media
 * priority chain lives:
 *
 *   VIDEO → POSTER/COVER → STATIC IMAGE → DESIGNED PLACEHOLDER
 *
 * Slots resolve from the project data model:
 *
 *   featured → featuredMedia → heroMedia → gallery[0]
 *   hero     → heroMedia → featuredMedia → gallery[0]
 *
 * Adding an asset to the project data automatically upgrades every frame
 * that uses it — no component changes required. Media that carries a label
 * or caption renders as a semantic figure with a figcaption.
 */
export function ProjectMediaFrame({
  project,
  slot = "featured",
  className = "",
  sizes,
  priority = false,
  hoverZoom = false,
}: ProjectMediaFrameProps) {
  const media = resolveProjectMedia(project, slot);

  if (!media) {
    return (
      <MediaPlaceholder
        media="video"
        kicker="Project preview"
        title={project.title}
        label="Media coming soon"
        className={className}
      />
    );
  }

  const frame = isVideoMedia(media) ? (
    <CinematicVideo
      video={media}
      title={project.title}
      className={className}
      sizes={sizes}
      priority={priority}
      hoverZoom={hoverZoom}
    />
  ) : (
    <ResponsiveImage
      image={media}
      title={project.title}
      className={className}
      sizes={sizes}
      hoverZoom={hoverZoom}
    />
  );

  if (!media.label && !media.caption) return frame;

  return (
    <figure className="min-w-0">
      {frame}
      <MediaCaption label={media.label} caption={media.caption} className="mt-3" />
    </figure>
  );
}

/**
 * Slot resolution shared with (future) case-study pages: prefer the
 * requested slot, then the other slot, then the first gallery item.
 */
export function resolveProjectMedia(
  project: Project,
  slot: MediaSlot = "featured",
): ProjectMedia | undefined {
  const order =
    slot === "hero"
      ? [project.heroMedia, project.featuredMedia, project.gallery?.[0]]
      : [project.featuredMedia, project.heroMedia, project.gallery?.[0]];
  return order.find((candidate): candidate is ProjectMedia => Boolean(candidate));
}
