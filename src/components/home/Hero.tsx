import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";

/**
 * Homepage hero: solution-based positioning on the left, a cinematic
 * media frame on the right that is reserved for the portfolio showreel.
 * The frame is a branded placeholder today — the real film drops in
 * through the same MediaPlaceholder slot without redesign.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden">
      <div className="container-page grid grid-cols-1 items-center gap-10 pb-16 pt-10 sm:gap-12 sm:pb-20 sm:pt-14 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="min-w-0 lg:col-span-6">
          <div className="hero-enter">
            <p className="mb-3 text-base font-semibold tracking-tight text-ink">
              {site.name}
            </p>
            <Eyebrow withRule={false}>{site.positioning}</Eyebrow>
          </div>

          <h1
            id="hero-heading"
            className="hero-enter hero-enter-1 mt-6 font-display text-4xl font-medium leading-[1.06] tracking-tight text-balance text-ink sm:text-5xl lg:text-[3.4rem] xl:text-6xl"
          >
            <em className="italic text-accent">Practical</em> digital
            solutions for businesses and organizations.
          </h1>

          <p className="hero-enter hero-enter-2 mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
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
            <MediaPlaceholder
              media="video"
              kicker="Showreel"
              title="Portfolio film"
              label="Coming soon"
              className="aspect-[4/3] rounded-2xl shadow-xl shadow-ink/10 md:aspect-[16/10]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
