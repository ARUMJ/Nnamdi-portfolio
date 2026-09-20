interface ArrowIconProps {
  className?: string;
}

/** Right-pointing arrow used by CTAs and inline links. */
export function ArrowIcon({ className = "size-4" }: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 8h11" />
      <path d="m9 3.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}
