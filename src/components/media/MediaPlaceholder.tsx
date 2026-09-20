interface MediaPlaceholderProps {
  title: string;
  /** Small-caps label, top-left (e.g. project category or "Showreel"). */
  kicker?: string;
  /** Small-caps label under the title (e.g. "Coming soon"). */
  label?: string;
  /** Which kind of media this slot anticipates. */
  media?: "video" | "still";
  /** Caller supplies sizing (e.g. aspect-[4/3]) and corner radius. */
  className?: string;
}

function CornerTicks() {
  const positions = [
    "left-3 top-3 border-l border-t",
    "right-3 top-3 border-r border-t",
    "bottom-3 left-3 border-b border-l",
    "bottom-3 right-3 border-b border-r",
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {positions.map((position) => (
        <span key={position} className={`absolute size-4 border-paper/25 ${position}`} />
      ))}
    </div>
  );
}

/**
 * Branded, cinematic placeholder for media slots that don't have real
 * assets yet — project films, project stills, the hero showreel.
 *
 * It is deliberately styled like a film frame (corner ticks, timecode,
 * play affordance) so the swap to real media later is a content change,
 * not a redesign. No project imagery is implied or invented here.
 */
export function MediaPlaceholder({
  title,
  kicker,
  label,
  media = "still",
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div className={`relative overflow-hidden bg-ink-deep ${className}`.trim()}>
      {/* layered background: evergreen glow + faint grid + film grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(115%_95%_at_75%_0%,rgba(31,74,60,0.32),transparent_58%),radial-gradient(90%_75%_at_10%_100%,rgba(245,244,239,0.06),transparent_48%)]"
      />
      <div aria-hidden="true" className="texture-grid absolute inset-0" />
      <div aria-hidden="true" className="texture-noise absolute inset-0 opacity-5" />
      <CornerTicks />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 md:p-6">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-paper/50">
          {kicker ?? "Media"}
        </span>
        <span className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-paper/50">
          <span aria-hidden="true" className="pulse-dot size-1.5 rounded-full bg-accent" />
          {media === "video" ? "Film" : "Still"}
        </span>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-20 text-center">
        {media === "video" && (
          <span
            aria-hidden="true"
            className="mb-6 flex size-14 items-center justify-center rounded-full border border-paper/25 md:size-16"
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-paper/85">
              <path d="M8 5.5v13l11-6.5L8 5.5Z" />
            </svg>
          </span>
        )}
        <span className="max-w-md font-display text-2xl font-medium leading-snug tracking-tight text-balance text-paper sm:text-3xl md:text-4xl">
          {title}
        </span>
        {label && (
          <span className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-paper/45">
            {label}
          </span>
        )}
      </div>

      {/* film timecode strip */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-5 md:p-6"
      >
        <span className="h-px flex-1 bg-paper/10" />
        <span className="mx-4 font-mono text-[0.6rem] tracking-[0.3em] text-paper/25">
          00:00
        </span>
        <span className="h-px flex-1 bg-paper/10" />
      </div>
    </div>
  );
}
