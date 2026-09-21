import type { ProjectMedia } from "@/lib/types";
import { isVideoMedia } from "@/lib/types";

import { CinematicVideo } from "./CinematicVideo";
import { MediaCaption } from "./MediaCaption";
import { ResponsiveImage } from "./ResponsiveImage";

interface MediaGalleryProps {
  /** Mixed stills and clips, in editorial order. */
  items: ProjectMedia[];
  /** Context for the accessible label and fallback alts (e.g. project title). */
  title: string;
  columns?: 2 | 3;
  className?: string;
}

/**
 * Responsive gallery of mixed image/video items for case-study pages.
 *
 * Every item is a semantic figure; provided labels/captions render as
 * figcaptions, videos arrive as lazy click-to-play facades (never autoplay
 * inside a gallery), and the list is labelled for assistive technology.
 * Renders nothing for an empty list so sections can include a gallery
 * before any media exists.
 */
export function MediaGallery({ items, title, columns = 2, className = "" }: MediaGalleryProps) {
  if (items.length === 0) return null;

  return (
    <ul
      aria-label={`${title} — project media`}
      className={`grid list-none grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : ""
      } ${className}`.trim()}
    >
      {items.map((item, index) => (
        <li key={`${item.src}-${index}`} className="min-w-0">
          <figure className="min-w-0">
            {isVideoMedia(item) ? (
              <CinematicVideo
                video={item}
                title={title}
                className="aspect-[4/3] rounded-lg"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            ) : (
              <ResponsiveImage
                image={item}
                title={title}
                className="aspect-[4/3] rounded-lg"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            )}
            <MediaCaption label={item.label} caption={item.caption} className="mt-3" />
          </figure>
        </li>
      ))}
    </ul>
  );
}
