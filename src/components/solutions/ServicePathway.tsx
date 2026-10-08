import Link from "next/link";

import { SolutionRow } from "@/components/solutions/SolutionRow";
import { SolutionIcon } from "@/components/solutions/SolutionIcon";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ServicePathway as ServicePathwayModel } from "@/lib/types";

interface ServicePathwayProps {
  pathway: ServicePathwayModel;
  /**
   * card   — homepage summary card (capabilities + link into /solutions)
   * detail — full /solutions section for the pathway, including the
   *          solution areas that sit inside it
   */
  variant: "card" | "detail";
  /** Position of this pathway's first area in the page-wide numbering. */
  areaStartIndex?: number;
  revealDelay?: number;
}

/**
 * A primary service pathway — Build 08.
 *
 * The two pathways are the clearest statement of what the work is:
 * Web & Digital Development and Digital Assistance & Technical Support.
 * Pathway 02 carries the inverse (cinematic) treatment, so the two are
 * visually distinct using the existing design language rather than a new
 * one. Both variants read from the same data in src/data/solutions.ts.
 */
export function ServicePathway({
  pathway,
  variant,
  areaStartIndex = 1,
  revealDelay = 0,
}: ServicePathwayProps) {
  const inverse = pathway.tone === "inverse";

  const revealProps = {
    "data-reveal-delay": String(revealDelay),
    style: { ["--reveal-delay" as string]: `${revealDelay}ms` } as React.CSSProperties,
  };

  const capabilityList = (className: string) => (
    <ul aria-label={`${pathway.title} capabilities`} className={className}>
      {pathway.capabilities.map((capability) => (
        <li
          key={capability}
          className={`rounded-full border px-2.5 py-1 text-[0.7rem] font-medium sm:px-3 sm:py-1.5 sm:text-xs ${
            inverse
              ? "border-inverse-border text-inverse-muted"
              : "border-border bg-background text-foreground-muted"
          }`}
        >
          {capability}
        </li>
      ))}
    </ul>
  );

  if (variant === "card") {
    const cardHeadingId = `${pathway.id}-pathway-card`;
    return (
      // A page sub-section rather than an <article>: the site's <article>
      // elements are project cards (the media suite counts them).
      <section
        aria-labelledby={cardHeadingId}
        className={`reveal flex h-full min-w-0 flex-col rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-elevation sm:p-7 ${
          inverse
            ? "on-dark border-inverse-border bg-inverse-surface"
            : "border-border bg-surface/60"
        }`}
        {...revealProps}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={`flex size-11 items-center justify-center rounded-full border ${
              inverse
                ? "border-inverse-border text-inverse-foreground"
                : "border-border bg-background text-accent"
            }`}
          >
            <SolutionIcon name={pathway.icon} className="size-5" />
          </span>
          <span
            aria-hidden="true"
            className={`font-display text-sm tracking-[0.18em] ${
              inverse ? "text-inverse-muted" : "text-foreground-muted"
            }`}
          >
            {pathway.number}
          </span>
        </div>

        <h3
          id={cardHeadingId}
          className={`mt-6 font-display text-xl font-medium tracking-tight sm:text-2xl ${
            inverse ? "text-inverse-foreground" : "text-foreground"
          }`}
        >
          {pathway.title}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-[0.95rem] ${
            inverse ? "text-inverse-muted" : "text-foreground-muted"
          }`}
        >
          {pathway.summary}
        </p>

        {capabilityList("mt-5 flex flex-wrap gap-1.5")}

        <Link
          href={`/solutions#${pathway.id}`}
          className={`group/pathway mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-medium underline decoration-transparent underline-offset-4 transition-colors duration-200 ${
            inverse
              ? "text-inverse-foreground hover:decoration-inverse-border"
              : "text-foreground hover:text-accent hover:decoration-current"
          }`}
        >
          Explore this pathway
          <ArrowIcon className="size-4 transition-transform duration-200 group-hover/pathway:translate-x-1" />
        </Link>
      </section>
    );
  }

  return (
    <section
      id={pathway.id}
      aria-labelledby={`${pathway.id}-heading`}
      className={`scroll-mt-24 border-t ${
        inverse ? "on-dark border-inverse-border bg-inverse-surface" : "border-border"
      }`}
    >
      <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="reveal" {...revealProps}>
            <Eyebrow tone={inverse ? "inverse" : "default"}>Pathway {pathway.number}</Eyebrow>
            <h2
              id={`${pathway.id}-heading`}
              className={`mt-5 font-display text-3xl font-medium leading-[1.08] tracking-tight text-balance sm:text-4xl ${
                inverse ? "text-inverse-foreground" : "text-foreground"
              }`}
            >
              {pathway.title}
            </h2>
            <p
              className={`mt-4 text-base leading-relaxed sm:text-lg ${
                inverse ? "text-inverse-muted" : "text-foreground-muted"
              }`}
            >
              {pathway.detail}
            </p>
            {capabilityList("mt-6 flex flex-wrap gap-1.5")}
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul
            aria-label={`${pathway.title} areas`}
            className={`border-t ${inverse ? "border-inverse-border" : "border-border"}`}
          >
            {pathway.areas.map((area, index) => (
              <SolutionRow
                key={area.id}
                solution={area}
                index={areaStartIndex + index}
                variant="detail"
                inverse={inverse}
                revealDelay={(index + 1) * 70}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
