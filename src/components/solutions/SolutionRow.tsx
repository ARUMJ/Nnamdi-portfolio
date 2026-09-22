import Link from "next/link";

import { ArrowIcon } from "@/components/ui/ArrowIcon";

import { SolutionIcon } from "./SolutionIcon";
import type { Solution } from "@/lib/types";

interface SolutionRowProps {
  solution: Solution;
  index: number;
  /**
   * preview — compact, linked row on the homepage (deep-links to /solutions)
   * detail  — full row on /solutions (real heading, description, fits list)
   */
  variant?: "preview" | "detail";
}

/**
 * One solution, rendered as an editorial index row.
 * A single component serves both the homepage preview and the /solutions
 * page, so a new solution in the data updates both automatically.
 */
export function SolutionRow({ solution, index, variant = "preview" }: SolutionRowProps) {
  const number = String(index).padStart(2, "0");
  const isDetail = variant === "detail";

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pt-1.5 font-display text-sm tracking-[0.18em] text-foreground-muted"
      >
        {number}
      </span>
      <span
        aria-hidden="true"
        className="hidden pt-1.5 text-foreground-secondary transition-colors duration-200 group-hover:text-accent sm:block"
      >
        <SolutionIcon name={solution.icon} className="size-6" />
      </span>
      <div className="min-w-0">
        {isDetail ? (
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {solution.title}
          </h2>
        ) : (
          <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
            {solution.title}
          </h3>
        )}
        <span className="mt-2 block max-w-xl text-sm leading-relaxed text-foreground-muted sm:text-[0.95rem]">
          {solution.shortDescription}
        </span>
        {isDetail && solution.description && (
          <span className="mt-4 block max-w-2xl text-sm leading-relaxed text-foreground-muted">
            {solution.description}
          </span>
        )}
        {isDetail && solution.fits && solution.fits.length > 0 && (
          <span className="mt-5 flex flex-wrap gap-2">
            {solution.fits.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground-muted"
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
          className="hidden justify-self-end pt-1.5 text-foreground-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-foreground sm:flex"
        >
          <ArrowIcon className="size-5" />
        </span>
      )}
    </>
  );

  const rowClass = `group grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 border-b border-border py-7 sm:grid-cols-[2.75rem_2.5rem_1fr_2rem] sm:gap-x-5 md:py-8 ${
    isDetail ? "" : "transition-colors duration-200 hover:bg-surface-hover"
  }`;

  if (isDetail) {
    return (
      <li id={solution.slug} className="scroll-mt-28">
        <div className={rowClass}>{content}</div>
      </li>
    );
  }

  return (
    <li>
      <Link href={`/solutions#${solution.slug}`} className={rowClass}>
        {content}
      </Link>
    </li>
  );
}
