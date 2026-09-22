import { HeroMedia } from "@/components/home/HeroMedia";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";

/**
 * Homepage hero: solution-based positioning on the left, a cinematic
 * media frame on the right that is reserved for the portfolio showreel.
 * The frame resolves through the media chain (video → poster → still →
 * branded placeholder) — a real film drops into `siteMedia.heroShowreel`
 * without any redesign.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden">
      <div className="container-page grid grid-cols-1 items-center gap-10 pb-16 pt-10 sm:gap-12 sm:pb-20 sm:pt-14 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="min-w-0 lg:col-span-6">
          <div className="hero-enter">
            <p className="mb-3 text-base font-semibold tracking-tight text-foreground">
              {site.name}
            </p>
            <Eyebrow withRule={false}>{site.positioning}</Eyebrow>
          </div>

          <h1
            id="hero-heading"
            className="hero-enter hero-enter-1 mt-6 font-display text-4xl font-medium leading-[1.06] tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.4rem] xl:text-6xl"
          >
            <em className="italic text-accent">Practical</em> digital
            solutions for businesses and organizations.
          </h1>

          <p className="hero-enter hero-enter-2 mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            I build websites and web products, improve existing digital experiences,
            and provide dependable digital and technical support.
          </p>

          <div className="hero-enter hero-enter-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={site.primaryCta.href} withArrow>
              {site.primaryCta.label}
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              View My Work
            </ButtonLink>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6">
          <div className="hero-enter hero-enter-2">
            <HeroMedia />
          </div>
        </div>
      </div>
    </section>
  );
}
