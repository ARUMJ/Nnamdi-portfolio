import type { Metadata } from "next";

import { PortraitFigure } from "@/components/about/PortraitFigure";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Arum Jonathan Nnamdi — a web developer and digital assistant with a Computer Engineering background. Web development, technical support, learning systems, coding instruction and practical digital work for businesses, schools and organizations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Arum"
        lead="Web development, digital assistance and technical support — practical technology work for businesses, schools and organizations."
      />

      <section className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="reveal" data-reveal="left">
            <div className="media-frame overflow-hidden rounded-2xl">
              <PortraitFigure priority />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="reveal" data-reveal="right" data-reveal-delay="100" style={{ ["--reveal-delay" as string]: "100ms" }}>
            <Eyebrow>Background</Eyebrow>
            <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              What I work on
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
              {site.about.summary}
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground-muted">
              {site.about.details}
            </p>
            <p className="mt-6 border-l-2 border-accent pl-4 font-display text-lg tracking-tight text-foreground">
              {site.about.positioning}
            </p>
          </div>

          <div className="reveal mt-10" data-reveal-delay="180" style={{ ["--reveal-delay" as string]: "180ms" }}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
              Focus areas
            </h3>
            <ul aria-label="Focus areas" className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {site.about.focusAreas.map((area, index) => (
                <li
                  key={area}
                  className="flex items-center gap-3 border-t border-border pt-3.5 text-sm font-medium text-foreground"
                  style={{ transitionDelay: `${260 + index * 40}ms` } as React.CSSProperties}
                >
                  <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal mt-12 flex flex-wrap gap-3" data-reveal-delay="280" style={{ ["--reveal-delay" as string]: "280ms" }}>
            <ButtonLink href="/solutions" withArrow>
              Explore solutions
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary" withArrow>
              View my work
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities-heading" className="border-t border-border bg-surface/50">
        <div className="container-page py-16 md:py-24">
          <div className="reveal">
            <SectionHeading
              id="capabilities-heading"
              eyebrow="What I bring"
              title="Practical work, clearly defined"
              lead="The capabilities behind the two service pathways — the same work, described as what it involves rather than as categories."
            />
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {site.about.capabilities.map((capability, index) => (
              <li
                key={capability.title}
                className="reveal border-t border-border pt-5"
                data-reveal-delay={String(index * 60)}
                style={{ ["--reveal-delay" as string]: `${index * 60}ms` }}
              >
                <h3 className="font-display text-lg font-medium tracking-tight text-foreground">
                  {capability.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground-muted">
                  {capability.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Start a project"
        title="Have a digital problem to solve?"
        subtitle="Let us turn the requirement into a practical solution."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </>
  );
}
