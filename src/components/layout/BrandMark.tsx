interface BrandMarkProps {
  className?: string;
}

/**
 * Geometric "A" monogram — the site's brand mark (matches app/icon.svg).
 * The mark is ink on paper in light mode and inverts to paper on ink in
 * dark mode via the foreground/background tokens — same mark, both themes.
 */
export function BrandMark({ className = "size-8" }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <rect width="64" height="64" rx="14" className="fill-foreground" />
      <path
        d="M20 45 32 19l12 26"
        fill="none"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-background"
      />
      <path
        d="M25.5 36.5h13"
        strokeWidth="4.5"
        strokeLinecap="round"
        className="stroke-background"
      />
    </svg>
  );
}
