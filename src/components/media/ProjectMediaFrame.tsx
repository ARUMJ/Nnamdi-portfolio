import type { Project } from "@/lib/types";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { ResponsiveImage } from "./ResponsiveImage";
import { VideoPlayer } from "./VideoPlayer";

interface ProjectMediaFrameProps {
  project: Project;
  /** Caller supplies sizing (e.g. "aspect-[4/3] rounded-xl"). */
  className?: string;
}

/**
 * The project media resolver. Renders the best available media for a
 * project in this order:
 *
 *   1. video  → lazy poster + play control (VideoPlayer)
 *   2. image  → optimized next/image (ResponsiveImage)
 *   3. none   → branded cinematic placeholder
 *
 * Adding an asset to the projects data automatically upgrades the frame —
 * no component changes required.
 */
export function ProjectMediaFrame({ project, className = "" }: ProjectMediaFrameProps) {
  const video = project.videos?.[0];
  const image = project.images?.[0];

  if (video) {
    return <VideoPlayer video={video} title={project.title} className={className} />;
  }

  if (image) {
    return <ResponsiveImage image={image} title={project.title} className={className} />;
  }

  return (
    <MediaPlaceholder
      media="video"
      kicker={project.category ?? "Project"}
      title={project.title}
      label="Film & case study coming soon"
      className={className}
    />
  );
}
