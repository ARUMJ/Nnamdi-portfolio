import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { title: "Discover", description: "Understand the business, users and problem." },
  { title: "Plan", description: "Define the appropriate digital solution." },
  { title: "Design", description: "Structure the user experience and interface." },
  { title: "Build", description: "Develop the working solution." },
  { title: "Test", description: "Check usability, responsiveness and technical quality." },
  { title: "Launch", description: "Deploy and prepare the finished product." },
] as const;

/**
 * "How I work" — a dark, cinematic band with the six-step process.
 * Outline numerals and hairline rules carry the visual interest;
 * no animation beyond the shared subtle reveal.
 */
export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="on-dark relative overflow-hidden bg-ink-deep"
    >
      <div aria-hidden="true" className="texture-grid absolute inset-0 opacity-40" />
      <div className="container-page relative py-20 md:py-28">
        <div className="reveal">
          <SectionHeading
            inverse
            id="process-heading"
            eyebrow="How I work"
            title="A process that follows the problem"
            lead="Six steps, in order — from understanding the need to shipping the finished solution."
          />
        </div>

        <ol className="reveal mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="group border-t border-line-dark pt-6">
              <span
                aria-hidden="true"
                className="font-display text-4xl tracking-tight text-transparent transition-all duration-300 [-webkit-text-stroke:1px_rgba(245,244,239,0.35)] group-hover:[-webkit-text-stroke:1px_rgba(245,244,239,0.75)]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-paper">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-dark">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
