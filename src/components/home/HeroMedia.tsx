import { CinematicVideo } from "@/components/media/CinematicVideo";
import { MediaCaption } from "@/components/media/MediaCaption";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { siteMedia } from "@/data/media";
import { isVideoMedia } from "@/lib/types";

const frameClass = "aspect-[16/10] rounded-2xl shadow-xl shadow-ink/10";

/**
 * The Hero's cinematic media area.
 *
 * Data-driven from `siteMedia.heroShowreel` and resolved through the
 * site-wide chain: VIDEO → POSTER → STILL → DESIGNED PLACEHOLDER.
 *
 * The media stays deliberately secondary to the headline: it lives in the
 * hero's own column, never behind the text, is always muted when ambient,
 * and never autoplays under prefers-reduced-motion. With no media supplied
 * the approved branded placeholder renders — the hero works beautifully
 * with a film, a poster, a still, or nothing at all, and never depends on
 * media loading.
 */
export function HeroMedia() {
  const media = siteMedia.heroShowreel;

  if (!media) {
    return (
      <MediaPlaceholder
        media="video"
        kicker="Showreel"
        title="Portfolio film"
        label="Coming soon"
        className={frameClass}
      />
    );
  }

  const frame = isVideoMedia(media) ? (
    <CinematicVideo
      video={media}
      title={media.label ?? "Portfolio showreel"}
      className={frameClass}
      sizes="(min-width: 1024px) 45vw, 100vw"
      priority
    />
  ) : (
    <ResponsiveImage
      image={{ ...media, priority: true }}
      title={media.label ?? "Portfolio showreel"}
      className={frameClass}
      sizes="(min-width: 1024px) 45vw, 100vw"
    />
  );

  if (!media.label && !media.caption) return frame;

  return (
    <figure className="min-w-0">
      {frame}
      <MediaCaption label={media.label} caption={media.caption} className="mt-4" />
    </figure>
  );
}
