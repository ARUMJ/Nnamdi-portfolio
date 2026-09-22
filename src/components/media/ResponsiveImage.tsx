"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProjectImage } from "@/lib/types";

import { MediaPlaceholder } from "./MediaPlaceholder";

interface ResponsiveImageProps {
  image: ProjectImage;
  /** Fallback context if the image has no alt of its own. */
  title: string;
  className?: string;
  /** `sizes` hint passed to next/image. */
  sizes?: string;
  /**
   * `cover` fills the frame (editorial default); `contain` preserves the
   * full source without cropping — for screenshots and UI captures where
   * every pixel of the frame matters.
   */
  fit?: "cover" | "contain";
  /** Subtle editorial zoom on hover (showcase frames). */
  hoverZoom?: boolean;
}

/**
 * Optimized, responsive project image. Always fills its frame with a
 * meaningful alt (the data layer is expected to supply honest alt text).
 *
 * On load failure the image degrades to the branded placeholder instead of
 * a broken-image box — the media chain never shows broken media.
 *
 * Build 06: premium hover scale 1.06 via GPU transform.
 */
export function ResponsiveImage({
  image,
  title,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  fit = "cover",
  hoverZoom = false,
}: ResponsiveImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`relative overflow-hidden bg-placeholder ${className}`.trim()}>
        <div className="absolute inset-0">
          <MediaPlaceholder
            media="still"
            kicker={image.label ?? "Image"}
            title={title}
            label="Image unavailable"
            className="h-full w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`group/img relative overflow-hidden bg-placeholder ${className}`.trim()}>
      <Image
        src={image.src}
        alt={image.alt || `${title} project image`}
        fill
        sizes={sizes}
        priority={image.priority}
        onError={() => setFailed(true)}
        className={`${fit === "contain" ? "object-contain" : "object-cover"} ${
          hoverZoom
            ? "transition-transform duration-700 ease-out will-change-transform group-hover/img:scale-[1.06]"
            : ""
        }`.trim()}
      />
    </div>
  );
}
