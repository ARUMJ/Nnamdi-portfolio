import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Understand",
    description: "Understand the business, the problem, the users, and what the solution needs to do.",
  },
  {
    title: "Plan",
    description: "Define the structure, content, technical approach, and priorities.",
  },
  {
    title: "Build",
    description: "Design and implement the solution carefully, with responsive layouts.",
  },
  {
    title: "Refine",
    description: "Test across devices, improve the experience, and fix issues.",
  },
  {
    title: "Deliver",
    description: "Deploy the finished solution and provide the necessary handoff and support.",
  },
] as const;

/**
 * "How I work" — a dark, cinematic band with the five-step process.
 * Numbered steps and hairline rules carry the visual interest;
 * no animation beyond the shared subtle reveal.
 *
 * Build 06: staggered reveal for steps, subtle ambient grid drift.
 */
export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="on-dark relative overflow-hidden bg-inverse-surface"
    >
      <div aria-hidden="true" className="texture-grid ambient-grid absolute inset-0 opacity-40" />
      <div aria-hidden="true" className="glow-drift absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,var(--inverse-glow),transparent_62%)] opacity-60" />
      <div className="container-page relative py-16 sm:py-20 md:py-28">
        <div className="reveal" data-reveal-delay="0">
          <SectionHeading
            inverse
            id="process-heading"
            eyebrow="How I work"
            title="Understand first. Build with care."
            lead="A clear path from the first conversation to a working solution and handoff."
          />
        </div>

        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="reveal border-t border-inverse-border pt-6"
              data-reveal-delay={String(80 + index * 70)}
              style={{ ["--reveal-delay" as string]: `${80 + index * 70}ms` }}
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl tracking-tight text-inverse-muted"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-inverse-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-inverse-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
