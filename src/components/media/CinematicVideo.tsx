"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { ProjectImage, ProjectVideo } from "@/lib/types";

import { MediaPlaceholder } from "./MediaPlaceholder";
import { ResponsiveImage } from "./ResponsiveImage";

interface CinematicVideoProps {
  video: ProjectVideo;
  /** First real gallery still, used if the poster also fails. */
  fallbackImage?: ProjectImage;
  /** Labelling context for the play control and accessible names. */
  title: string;
  /** Caller supplies sizing (e.g. "aspect-[16/9] rounded-xl"). */
  className?: string;
  /** `sizes` hint for the poster image. */
  sizes?: string;
  /** Load the poster eagerly (above-the-fold hero media). */
  priority?: boolean;
  /** Subtle editorial zoom on hover (showcase frames). */
  hoverZoom?: boolean;
}

/**
 * Module-level registry so at most one ambient (autoplaying) video plays at
 * a time anywhere on the page — starting one pauses any other.
 */
let activeAmbientVideo: HTMLVideoElement | null = null;

function claimAmbientPlayback(element: HTMLVideoElement) {
  if (activeAmbientVideo && activeAmbientVideo !== element) {
    activeAmbientVideo.pause();
  }
  activeAmbientVideo = element;
}

function releaseAmbientPlayback(element: HTMLVideoElement) {
  if (activeAmbientVideo === element) {
    activeAmbientVideo = null;
  }
}

/**
 * The cinematic video component — one native <video> element behind a
 * deliberate, performance-first behaviour model:
 *
 *   ambient  (video.autoplay) — muted, looped, playsInline; the element is
 *           mounted with `preload="none"` and only fetches/starts when it
 *           enters the viewport, pauses when it leaves or the tab hides,
 *           and never autoplays under prefers-reduced-motion.
 *   facade   (default) — poster + accessible play control; zero video bytes
 *           are requested until the visitor chooses to play.
 *
 * Fallback chain when video is unavailable, fails to load, is blocked from
 * autoplaying, or the browser lacks support:
 *
 *   poster → poster as a still → branded placeholder
 *
 * …so there is never a broken media box or an empty black rectangle.
 */
export function CinematicVideo({
  video,
  fallbackImage,
  title,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  hoverZoom = false,
}: CinematicVideoProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref: viewRef, inView, hasEnteredView } = useInView<HTMLDivElement>({
    rootMargin: "0px",
  });

  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const poster = posterFailed ? undefined : video.poster;
  const [supportsVideo, setSupportsVideo] = useState(true);
  const [userStarted, setUserStarted] = useState(false);
  const [ambientBlocked, setAmbientBlocked] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const wantsAmbient = video.autoplay === true;
  const unavailable = failed || !supportsVideo;
  const ambientEligible =
    wantsAmbient && !reducedMotion && !unavailable && !userStarted && !ambientBlocked;
  const mountAmbientVideo = ambientEligible && hasEnteredView;
  const showPlayButton =
    !unavailable && !userStarted && (!wantsAmbient || reducedMotion || ambientBlocked);

  const description = video.alt || `${title} — video`;
  const rootClasses = `group/cv relative overflow-hidden bg-ink-deep ${className}`.trim();

  /* Capability probe — legacy browsers fall back to poster/still. */
  useEffect(() => {
    const probe = document.createElement("video");
    setSupportsVideo(typeof probe.canPlayType === "function" && probe.canPlayType("video/mp4") !== "");
  }, []);

  /* Ambient play/pause: only while actually in view, one at a time. */
  useEffect(() => {
    const element = videoRef.current;
    if (!element || !mountAmbientVideo) return;

    if (!inView) {
      releaseAmbientPlayback(element);
      element.pause();
      return;
    }

    claimAmbientPlayback(element);
    const playPromise = element.play();
    playPromise?.catch(() => {
      /* Autoplay refused (e.g. data-saver): the poster/placeholder stays and
         a play control appears — never a black box. */
      setAmbientBlocked(true);
    });
  }, [mountAmbientVideo, inView]);

  /* Pause ambient playback in hidden tabs. */
  useEffect(() => {
    if (!mountAmbientVideo) return;
    const onVisibility = () => {
      const element = videoRef.current;
      if (!element) return;
      if (document.hidden) {
        element.pause();
      } else if (inView && !ambientBlocked) {
        element.play()?.catch(() => setAmbientBlocked(true));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [mountAmbientVideo, inView, ambientBlocked]);

  /* Release the ambient claim on unmount. */
  useEffect(
    () => () => {
      const element = videoRef.current;
      if (element) {
        releaseAmbientPlayback(element);
        element.pause();
      }
    },
    [],
  );

  /* ------------------------------------------------------------ */
  /* 1. Unavailable (load failure / no codec support)             */
  /* ------------------------------------------------------------ */
  if (unavailable) {
    return (
      <div className={rootClasses}>
        {poster ? (
          <Image
            src={poster}
            alt={description}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setPosterFailed(true)}
            className="object-cover"
          />
        ) : fallbackImage ? (
          <div className="absolute inset-0">
            <ResponsiveImage image={fallbackImage} title={title} sizes={sizes} className="h-full w-full" />
          </div>
        ) : (
          <div className="absolute inset-0">
            <MediaPlaceholder
              media="video"
              kicker={video.label ?? "Video"}
              title={title}
              label="Video unavailable"
              className="h-full w-full"
            />
          </div>
        )}
      </div>
    );
  }

  /* ------------------------------------------------------------ */
  /* 2. User-initiated playback — full native controls            */
  /* ------------------------------------------------------------ */
  if (userStarted) {
    return (
      <div className={rootClasses}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video.src}
          poster={poster}
          controls={video.controls ?? true}
          autoPlay
          playsInline
          muted={video.muted ?? false}
          loop={video.loop ?? false}
          preload="none"
          aria-label={description}
          onError={() => setFailed(true)}
        >
          <div className="sr-only">{description}</div>
        </video>
      </div>
    );
  }

  /* ------------------------------------------------------------ */
  /* 3. Poster/placeholder layer + optional ambient video + play  */
  /* ------------------------------------------------------------ */
  return (
    <div ref={viewRef} className={rootClasses}>
      {poster ? (
        <Image
          src={poster}
          alt={description}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setPosterFailed(true)}
          className={`object-cover ${
            hoverZoom
              ? "transition-transform duration-700 ease-out group-hover/cv:scale-[1.03]"
              : ""
          }`.trim()}
        />
      ) : fallbackImage ? (
        <div className="absolute inset-0">
          <ResponsiveImage image={fallbackImage} title={title} sizes={sizes} className="h-full w-full" />
        </div>
      ) : (
        <div className="absolute inset-0">
          <MediaPlaceholder
            media="video"
            kicker={video.label ?? "Film"}
            title={title}
            label={ambientEligible ? "Loading" : undefined}
            className="h-full w-full"
          />
        </div>
      )}

      {mountAmbientVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ambientPlaying ? "opacity-100" : "opacity-0"
          }`}
          src={video.src}
          muted
          loop={video.loop ?? true}
          playsInline
          preload="none"
          controls={video.controls ?? false}
          aria-label={description}
          onPlaying={() => setAmbientPlaying(true)}
          onPause={() => setAmbientPlaying(false)}
          onError={() => setFailed(true)}
        >
          <div className="sr-only">{description}</div>
        </video>
      )}

      {showPlayButton && (
        <button
          type="button"
          onClick={() => {
            /* A deliberate play outranks ambient playback elsewhere. */
            if (activeAmbientVideo) activeAmbientVideo.pause();
            setUserStarted(true);
          }}
          className="group/play absolute inset-0 z-20 block h-full w-full"
          aria-label={`Play video: ${description}`}
        >
          <span className="absolute inset-0 bg-ink-deep/15 transition-colors duration-200 group-hover/play:bg-ink-deep/5" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              aria-hidden="true"
              className="flex size-16 items-center justify-center rounded-full border border-paper/40 bg-ink-deep/40 transition-transform duration-200 group-hover/play:scale-105"
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
