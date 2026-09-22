import { PortraitFigure } from "@/components/about/PortraitFigure";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";

/**
 * Homepage about preview — only known facts (from site.about data):
 * Computer Engineering background, web development, digital assistance,
 * technical support, business/project work. No invented history.
 *
 * Build 06: image left reveals from left, text from right for subtle direction.
 */
export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-heading" className="border-t border-border">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="mx-auto w-full max-w-sm lg:col-span-5">
          <div className="reveal" data-reveal="left">
            <div className="media-frame overflow-hidden rounded-2xl">
              <PortraitFigure />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="reveal" data-reveal="right" data-reveal-delay="120" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <Eyebrow>About</Eyebrow>
            <h2
              id="about-preview-heading"
              className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-tight text-balance text-foreground sm:text-4xl"
            >
              The person behind the solutions
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg">
              {site.about.summary}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted">
              {site.about.details}
            </p>
          </div>

          <div
            className="reveal mt-10"
            data-reveal-delay="200"
            style={{ ["--reveal-delay" as string]: "200ms" }}
          >
            <ButtonLink href="/about" variant="secondary" withArrow>
              More About Me
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
