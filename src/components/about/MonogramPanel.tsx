import { site } from "@/data/site";

interface MonogramPanelProps {
  className?: string;
}

/**
 * Abstract brand panel used as the "portrait" slot for Arum.
 * A deliberate monogram treatment — no invented or placeholder photos —
 * ready to be swapped for a real portrait later.
 */
export function MonogramPanel({ className = "" }: MonogramPanelProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-ink-deep ${className}`.trim()}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_0%,rgba(31,74,60,0.35),transparent_55%)]"
      />
      <div aria-hidden="true" className="texture-grid absolute inset-0" />
      <div aria-hidden="true" className="texture-noise absolute inset-0 opacity-5" />

      <div className="relative flex aspect-[4/5] flex-col items-center justify-center px-6 text-center">
        <span
          aria-hidden="true"
          className="font-display text-7xl font-medium tracking-tight text-paper md:text-8xl"
        >
          AN
        </span>
        <span aria-hidden="true" className="mt-6 h-px w-10 bg-paper/25" />
        <span className="mt-6 text-sm font-medium text-paper/85">{site.name}</span>
        <span className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-paper/45">
          {site.positioning}
        </span>
      </div>
    </div>
  );
}
