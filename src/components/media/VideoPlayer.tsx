"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProjectVideo } from "@/lib/types";

interface VideoPlayerProps {
  video: ProjectVideo;
  title: string;
  className?: string;
}

/**
 * Lazy project video: shows only the poster and a play control until the
 * visitor chooses to play. The <video> element is mounted on interaction,
 * so no video bytes load during the initial page render and nothing
 * autoplays.
 */
export function VideoPlayer({ video, title, className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-ink-deep ${className}`.trim()}>
      {isPlaying ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group absolute inset-0 block h-full w-full"
          aria-label={`Play video for ${title}`}
        >
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-ink-deep/40 transition-colors duration-200 group-hover:bg-ink-deep/25" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              aria-hidden="true"
              className="flex size-16 items-center justify-center rounded-full border border-paper/40 bg-ink-deep/40 transition-transform duration-200 group-hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-paper">
                <path d="M8 5.5v13l11-6.5L8 5.5Z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
