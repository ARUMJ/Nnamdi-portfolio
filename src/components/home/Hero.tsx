import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";

const focusAreas = [
  "Business websites",
  "Web products",
  "Website improvement",
  "Technical support",
];

/**
 * Homepage hero: solution-based positioning on the left, a cinematic
 * media frame on the right that is reserved for the portfolio showreel.
 * The frame is a branded placeholder today — the real film drops in
 * through the same MediaPlaceholder slot without redesign.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden">
      <div className="container-page grid grid-cols-1 items-center gap-12 pb-20 pt-14 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-6">
          <div className="hero-enter">
            <Eyebrow>
              {site.name} — {site.positioning}
            </Eyebrow>
          </div>

          <h1
            id="hero-heading"
            className="hero-enter hero-enter-1 mt-6 font-display text-4xl font-medium leading-[1.06] tracking-tight text-balance text-ink sm:text-5xl lg:text-[3.4rem] xl:text-6xl"
          >
            Building <em className="italic text-accent">practical</em> digital
            solutions for businesses and organizations.
          </h1>

          <p className="hero-enter hero-enter-2 mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I help turn digital ideas, business needs, and technology problems
            into practical web experiences and digital solutions.
          </p>

          <div className="hero-enter hero-enter-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/solutions" withArrow>
              Explore Solutions
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              View My Work
            </ButtonLink>
          </div>

          <ul
            aria-label="Focus areas"
            className="hero-enter hero-enter-4 mt-10 flex flex-wrap gap-x-5 gap-y-2.5"
          >
            {focusAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted"
              >
                <span aria-hidden="true" className="size-1 rounded-full bg-accent/60" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div className="hero-enter hero-enter-2">
            <MediaPlaceholder
              media="video"
              kicker="Showreel"
              title="Portfolio film"
              label="Coming soon"
              className="aspect-[4/3] rounded-2xl shadow-2xl shadow-ink/25 md:aspect-[16/10]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
