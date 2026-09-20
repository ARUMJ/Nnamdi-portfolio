import type { ProjectImage } from "@/lib/types";

import { ResponsiveImage } from "./ResponsiveImage";

interface MediaGalleryProps {
  images: ProjectImage[];
  title: string;
  columns?: 2 | 3;
}

/**
 * Simple responsive gallery for case-study pages.
 * Renders nothing for an empty list so sections can include it
 * before media exists.
 */
export function MediaGallery({ images, title, columns = 2 }: MediaGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div
      role="list"
      aria-label={`${title} — project media`}
      className={
        columns === 3
          ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          : "grid grid-cols-1 gap-3 sm:grid-cols-2"
      }
    >
      {images.map((image, index) => (
        <div role="listitem" key={`${image.src}-${index}`}>
          <ResponsiveImage
            image={image}
            title={title}
            className="aspect-[4/3] rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
