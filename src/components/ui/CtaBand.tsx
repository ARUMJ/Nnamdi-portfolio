import { useId } from "react";
import type { ReactNode } from "react";

import { ButtonLink } from "./ButtonLink";
import { Eyebrow } from "./Eyebrow";

interface CtaBandProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  ctaLabel: string;
  ctaHref: string;
  /** Optional companion action; existing page CTAs remain unchanged. */
  secondaryAction?: ReactNode;
}

/**
 * Reusable closing call-to-action band (dark, cinematic).
 * Used verbatim on the homepage and adapted on inner pages —
 * so there is one CTA treatment across the site.
 *
 * Build 06: ambient glow drift, reveal for content.
 */
export function CtaBand({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryAction,
}: CtaBandProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="on-dark relative overflow-hidden bg-inverse-surface"
    >
      <div aria-hidden="true" className="texture-grid ambient-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="glow-drift absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_120%,var(--inverse-glow),transparent_60%)]"
      />
      <div className="container-page relative py-20 text-center md:py-28">
        <div className="reveal mx-auto max-w-2xl">
          {eyebrow && (
            <div className="flex justify-center">
              <Eyebrow tone="inverse">{eyebrow}</Eyebrow>
            </div>
          )}
          <h2
            id={headingId}
            className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-tight text-balance text-inverse-foreground sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base leading-relaxed text-inverse-muted sm:text-lg">
              {subtitle}
            </p>
          )}
          <div
            className={`mt-9 flex justify-center ${
              secondaryAction ? "flex-col items-stretch gap-3 sm:flex-row sm:items-center" : ""
            }`}
          >
            <ButtonLink href={ctaHref} variant="inverse" withArrow>
              {ctaLabel}
            </ButtonLink>
            {secondaryAction}
          </div>
        </div>
      </div>
    </section>
  );
}
