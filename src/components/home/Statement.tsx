import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Problem / solution introduction: the positioning statement
 * ("Technology should solve a problem") with a concise two-column
 * explanation of the approach.
 */
export function Statement() {
  return (
    <section
      aria-labelledby="approach-heading"
      className="border-y border-line bg-paper-deep/60"
    >
      <div className="container-page py-20 md:py-28">
        <div className="reveal max-w-3xl">
          <Eyebrow>The approach</Eyebrow>
          <h2
            id="approach-heading"
            className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-tight text-balance text-ink sm:text-4xl md:text-5xl"
          >
            Technology should <span className="italic text-accent">solve a problem</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Not the other way around. The right digital solution starts with
            the business need — not with whatever technology happens to be
            available.
          </p>
        </div>

        <div className="reveal mt-14 grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="border-t border-line pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
              The problem
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Businesses and organizations often face digital needs that are
              easy to describe and hard to answer: a presence that doesn&apos;t
              do its job, a process stuck in spreadsheets, or a website that
              has stopped keeping up.
            </p>
          </div>
          <div className="border-t border-line pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">
              The approach
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Understand the business need first — who the solution is for,
              what it has to achieve, and what success looks like. Then design
              and build the appropriate digital solution: clear, practical,
              and built to last.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
