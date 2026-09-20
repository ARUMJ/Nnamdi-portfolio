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
      <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
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
              A practical approach to digital work
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {site.about.summary}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {site.about.details}
            </p>
          </div>

          <ul
            aria-label="Focus areas"
            className="reveal mt-9 grid gap-x-8 gap-y-3 sm:grid-cols-2"
          >
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

          <div className="reveal mt-10">
            <ButtonLink href="/about" variant="secondary" withArrow>
              More about me
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
