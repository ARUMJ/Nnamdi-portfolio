import type { Metadata } from "next";

import { PortraitFigure } from "@/components/about/PortraitFigure";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arum Jonathan Nnamdi — a web developer and digital assistant with a Computer Engineering background, working on websites, web products, digital support, and business projects.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Arum"
        lead="A practical approach to digital work — for businesses, organizations, and projects that need technology to do a job."
      />

      <section className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="reveal">
            <PortraitFigure priority />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="reveal">
            <Eyebrow>Background</Eyebrow>
            <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              What I work on
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {site.about.summary}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {site.about.details}
            </p>
          </div>

          <div className="reveal mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
              Focus areas
            </h3>
            <ul aria-label="Focus areas" className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {site.about.focusAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-3 border-t border-line pt-3.5 text-sm font-medium text-ink"
                >
                  <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/solutions" withArrow>
              Explore solutions
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary" withArrow>
              View my work
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Start a project"
        title="Have a digital problem to solve?"
        subtitle="Let's turn the requirement into a practical solution."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </>
  );
}
