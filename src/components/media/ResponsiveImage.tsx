import Image from "next/image";

import type { ProjectImage } from "@/lib/types";

interface ResponsiveImageProps {
  image: ProjectImage;
  /** Fallback context if the image has no alt of its own. */
  title: string;
  className?: string;
}

/**
 * Optimized, responsive project image. Always fills its frame with a
 * meaningful alt (the data layer is expected to supply honest alt text).
 */
export function ResponsiveImage({ image, title, className = "" }: ResponsiveImageProps) {
  return (
    <div className={`relative overflow-hidden bg-ink-deep ${className}`.trim()}>
      <Image
        src={image.src}
        alt={image.alt || `${title} project image`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={image.priority}
        className="object-cover"
      />
    </div>
  );
}
