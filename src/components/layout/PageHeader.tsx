import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}

/** Consistent h1 hero for inner pages. */
export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <section aria-labelledby="page-title" className="border-b border-border bg-surface/50">
      <div className="container-page py-16 md:py-24">
        <div className="hero-enter max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="page-title"
            className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl"
          >
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
