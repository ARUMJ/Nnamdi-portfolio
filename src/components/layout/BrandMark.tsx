interface BrandMarkProps {
  className?: string;
}

/** Geometric "A" monogram — the site's brand mark (matches app/icon.svg). */
export function BrandMark({ className = "size-8" }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <rect width="64" height="64" rx="14" className="fill-ink" />
      <path
        d="M20 45 32 19l12 26"
        fill="none"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-paper"
      />
      <path
        d="M25.5 36.5h13"
        strokeWidth="4.5"
        strokeLinecap="round"
        className="stroke-paper"
      />
    </svg>
  );
}
