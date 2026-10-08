import Link from "next/link";

import { ArrowIcon } from "@/components/ui/ArrowIcon";

import { SolutionIcon } from "./SolutionIcon";
import type { Solution } from "@/lib/types";

interface SolutionRowProps {
  solution: Solution;
  index: number;
  /**
   * preview — compact, linked row on the homepage (deep-links to /solutions)
   * detail  — full row inside a /solutions pathway (heading level h3, under
   *           the pathway's h2)
   */
  variant?: "preview" | "detail";
  /** Renders for a pathway section on the cinematic inverse band. */
  inverse?: boolean;
  revealDelay?: number;
}

/**
 * One solution, rendered as an editorial index row.
 * A single component serves both the homepage preview and the /solutions
 * page, so a new solution in the data updates both automatically.
 *
 * Build 06: premium hover slide (translateX) + icon accent + arrow.
 * Build 08: `inverse` support so a pathway can sit on the dark band, and
 * the detail heading is h3 (the pathway above it is the h2).
 */
export function SolutionRow({
  solution,
  index,
  variant = "preview",
  inverse = false,
  revealDelay,
}: SolutionRowProps) {
  const number = String(index).padStart(2, "0");
  const isDetail = variant === "detail";

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`pt-1.5 font-display text-sm tracking-[0.18em] ${
          inverse ? "text-inverse-muted" : "text-foreground-muted"
        }`}
      >
        {number}
      </span>
      <span
        aria-hidden="true"
        className={`hidden pt-1.5 transition-colors duration-200 sm:block ${
          inverse
            ? "text-inverse-muted group-hover:text-inverse-foreground"
            : "text-foreground-secondary group-hover:text-accent"
        }`}
      >
        <SolutionIcon name={solution.icon} className="size-6" />
      </span>
      <div className="min-w-0">
        {isDetail ? (
          <h3
            className={`font-display text-2xl font-medium tracking-tight md:text-3xl ${
              inverse ? "text-inverse-foreground" : "text-foreground"
            }`}
          >
            {solution.title}
          </h3>
        ) : (
          <h3
            className={`font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl ${
              inverse ? "text-inverse-foreground" : "text-foreground"
            }`}
          >
            {solution.title}
          </h3>
        )}
        <span
          className={`mt-2 block max-w-xl text-sm leading-relaxed sm:text-[0.95rem] ${
            inverse ? "text-inverse-muted" : "text-foreground-muted"
          }`}
        >
          {solution.shortDescription}
        </span>
        {isDetail && solution.description && (
          <span
            className={`mt-4 block max-w-2xl text-sm leading-relaxed ${
              inverse ? "text-inverse-muted" : "text-foreground-muted"
            }`}
          >
            {solution.description}
          </span>
        )}
        {isDetail && solution.fits && solution.fits.length > 0 && (
          <span className="mt-5 flex flex-wrap gap-2">
            {solution.fits.map((item) => (
              <span
                key={item}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                  inverse
                    ? "border-inverse-border text-inverse-muted"
                    : "border-border bg-surface text-foreground-muted"
                }`}
              >
                {item}
              </span>
            ))}
          </span>
        )}
      </div>
      {!isDetail && (
        <span
          aria-hidden="true"
          className={`solution-arrow hidden justify-self-end pt-1.5 transition-colors duration-200 sm:flex ${
            inverse
              ? "text-inverse-muted group-hover:text-inverse-foreground"
              : "text-foreground-muted group-hover:text-foreground"
          }`}
        >
          <ArrowIcon className="size-5" />
        </span>
      )}
    </>
  );

  const rowClass = `solution-row group grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 border-b py-7 sm:grid-cols-[2.75rem_2.5rem_1fr_2rem] sm:gap-x-5 md:py-8 ${
    inverse ? "border-inverse-border" : "border-border"
  } ${isDetail ? "" : inverse ? "hover:bg-inverse-foreground/5" : "hover:bg-surface-hover"}`;

  const revealProps =
    typeof revealDelay === "number"
      ? {
          "data-reveal-delay": String(revealDelay),
          style: { ["--reveal-delay" as string]: `${revealDelay}ms` } as React.CSSProperties,
        }
      : {};

  if (isDetail) {
    return (
      <li id={solution.slug} className="reveal scroll-mt-28" {...revealProps}>
        <div className={rowClass}>{content}</div>
      </li>
    );
  }

  return (
    <li className="reveal" {...revealProps}>
      <Link href={`/solutions#${solution.slug}`} className={rowClass}>
        {content}
      </Link>
    </li>
  );
}
