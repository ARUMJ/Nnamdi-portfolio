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
        <span key={position} className={`absolute size-4 border-inverse-foreground/25 ${position}`} />
      ))}
    </div>
  );
}

/**
 * Branded, cinematic placeholder for media slots that don't have real
 * assets yet — project films, project stills, the hero showreel.
 *
 * It is deliberately styled like a film frame (corner ticks and a grid)
 * so the swap to real media later is a content change,
 * not a redesign. No play control or imagery is implied before media exists.
 */
export function MediaPlaceholder({
  title,
  kicker,
  label,
  media = "still",
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div className={`relative overflow-hidden bg-placeholder ${className}`.trim()}>
      {/* layered background: evergreen glow + faint grid + film grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(115%_95%_at_75%_0%,var(--placeholder-glow),transparent_58%),radial-gradient(90%_75%_at_10%_100%,var(--placeholder-veil),transparent_48%)]"
      />
      <div aria-hidden="true" className="texture-grid absolute inset-0" />
      <div aria-hidden="true" className="texture-noise absolute inset-0 opacity-5" />
      <CornerTicks />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 px-6 py-5">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-inverse-muted">
          {kicker ?? "Media"}
        </span>
        <span className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-inverse-muted">
          {media === "video" ? "Film" : "Still"}
        </span>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 py-14 text-center">
        <span className="max-w-md font-display text-xl font-medium leading-snug tracking-tight text-balance text-placeholder-foreground sm:text-2xl lg:text-3xl">
          {title}
        </span>
      </div>

      {label && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-3 px-6 py-5">
          <span aria-hidden="true" className="h-px max-w-12 flex-1 bg-inverse-foreground/20" />
          <span className="text-center text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-inverse-muted">
            {label}
          </span>
          <span aria-hidden="true" className="h-px max-w-12 flex-1 bg-inverse-foreground/20" />
        </div>
      )}
    </div>
  );
}
