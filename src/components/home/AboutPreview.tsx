import { PortraitFigure } from "@/components/about/PortraitFigure";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";

/**
 * Homepage about preview — only known facts (from site.about data):
 * Computer Engineering background, web development, digital assistance,
 * technical support, business/project work. No invented history.
 */
export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-heading" className="border-t border-line">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="mx-auto w-full max-w-sm lg:col-span-5">
          <div className="reveal">
            <PortraitFigure />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="reveal">
            <Eyebrow>About</Eyebrow>
            <h2
              id="about-preview-heading"
              className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-tight text-balance text-ink sm:text-4xl"
            >
              The person behind the solutions
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {site.about.summary}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {site.about.details}
            </p>
          </div>

          <div className="reveal mt-10">
            <ButtonLink href="/about" variant="secondary" withArrow>
              More About Me
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
