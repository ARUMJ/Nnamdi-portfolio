import Image from "next/image";

interface PortraitFigureProps {
  /**
   * Renders with `priority` (eager, LCP eligible) for pages where the
   * portrait sits at the top of the content. Keep it off for
   * mid page placements so it loads lazily.
   */
  priority?: boolean;
  className?: string;
}

/**
 * The approved professional portrait in its editorial frame.
 *
 * Treatment: the image itself is untouched. An offset hairline frame and a
 * photo credit caption give it an intentional, mounted print presence that
 * matches the site visual language (hairlines, small caps, warm paper).
 *
 * `width`/`height` match the source (848x1264), so Next.js emits the exact
 * aspect ratio inline. No layout shift while the image loads.
 */
export function PortraitFigure({ priority = false, className = "" }: PortraitFigureProps) {
  return (
    <figure className={className}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-3 rounded-2xl border border-border"
        />
        <Image
          src="/images/portrait-professional-preview.jpg"
          alt="Arum Jonathan Nnamdi in a charcoal suit and navy tie, arms folded, in a professional full length studio portrait"
          width={848}
          height={1264}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          quality={85}
          sizes="(min-width: 1024px) 33vw, 92vw"
          className="relative w-full h-auto rounded-2xl"
        />
      </div>
      <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
        <span>Arum Jonathan Nnamdi</span>
        <span className="hidden sm:inline">Digital Assistant and Web Developer</span>
      </figcaption>
    </figure>
  );
}
