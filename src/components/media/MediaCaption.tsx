interface MediaCaptionProps {
  /** Small-caps label line (e.g. "Homepage", "Booking flow"). */
  label?: string;
  /** Sentence-length caption. */
  caption?: string;
  className?: string;
}

/**
 * Shared figcaption treatment for media with editorial metadata:
 * an optional small-caps label above an optional sentence caption.
 * Renders nothing when neither is supplied.
 */
export function MediaCaption({ label, caption, className = "" }: MediaCaptionProps) {
  if (!label && !caption) return null;

  return (
    <figcaption
      className={`text-sm leading-relaxed text-foreground-muted ${className}`.trim()}
    >
      {label && (
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground">
          {label}
        </span>
      )}
      {caption && <span className={`${label ? "mt-1 " : ""}block`}>{caption}</span>}
    </figcaption>
  );
}
