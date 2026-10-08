import { Eyebrow } from "@/components/ui/Eyebrow";

/** A compact transition from the positioning to the needs it addresses. */
export function Statement() {
  return (
    <section
      aria-labelledby="approach-heading"
      className="border-y border-border bg-surface/60"
    >
      <div className="container-page grid gap-8 py-14 sm:py-16 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
        <div className="reveal">
          <Eyebrow>The practical need</Eyebrow>
          <h2
            id="approach-heading"
            className="mt-5 max-w-md font-display text-3xl font-medium leading-[1.12] tracking-tight text-balance text-foreground sm:text-4xl"
          >
            Technology that <span className="italic text-accent">works for you</span>.
          </h2>
        </div>
        <div
          className="reveal max-w-xl border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0"
          data-reveal-delay="120"
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
            A professional website. A clearer digital experience. A catalogue, a
            portal or a tool that carries a real idea. Technical help when
            something stops working. Businesses, schools and organizations need
            someone who can handle the practical details.
          </p>
          <p className="mt-4 text-base font-medium leading-relaxed text-foreground sm:text-lg">
            I build, improve and support those solutions, starting with the
            problem rather than the technology.
          </p>
        </div>
      </div>
    </section>
  );
}
