import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}

/** Consistent h1 hero for inner pages. Build 06 keeps hero-enter for premium load-in. */
export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-border bg-surface/50">
      <div aria-hidden="true" className="ambient-orb absolute -top-24 right-10 h-64 w-64 rounded-full bg-[radial-gradient(60%_60%_at_50%_50%,rgb(31_74_60/0.05),transparent_70%)] dark:bg-[radial-gradient(60%_60%_at_50%_50%,rgb(140_194_170/0.06),transparent_70%)]" />
      <div className="container-page relative py-16 md:py-24">
        <div className="hero-enter max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="page-title"
            className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl"
          >
            {title}
          </h1>
          {lead && (
            <p className="hero-enter hero-enter-1 mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
