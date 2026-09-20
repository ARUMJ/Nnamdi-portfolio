import type { ReactNode } from "react";

import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Renders the light treatment for dark sections. */
  inverse?: boolean;
}

/** Consistent h2 block for page sections: eyebrow, display title, lead. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <Eyebrow tone={inverse ? "inverse" : "default"}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`mt-5 font-display text-3xl font-medium leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
          inverse ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            inverse ? "text-muted-dark" : "text-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
