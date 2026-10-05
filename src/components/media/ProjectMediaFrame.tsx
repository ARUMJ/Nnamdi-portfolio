import type { Project, ProjectMedia } from "@/lib/types";
import { isImageMedia, isVideoMedia } from "@/lib/types";

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
  /** Show a dedicated live site link directly after the showcase media. */
  showLiveLink?: boolean;
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
  showLiveLink = false,
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
      fallbackImage={project.gallery?.find(isImageMedia)}
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

  if (!media.label && !media.caption && !(showLiveLink && project.liveUrl)) return frame;

  return (
    <figure className="min-w-0">
      {showLiveLink ? <div className="media-frame overflow-hidden rounded-xl">{frame}</div> : frame}
      {showLiveLink && project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} live website (opens in a new tab)`}
          className="mx-1 mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-current focus-visible:rounded-sm"
        >
          View Live Website <span aria-hidden="true">↗</span>
        </a>
      )}
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
