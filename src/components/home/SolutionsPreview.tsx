import { ServicePathway } from "@/components/solutions/ServicePathway";
import { SolutionRow } from "@/components/solutions/SolutionRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicePathways, solutions } from "@/data/solutions";

/**
 * Homepage solutions preview — Build 08 leads with the two service
 * pathways (visually distinct: pathway 02 carries the inverse treatment),
 * then keeps the existing editorial index of the five specific areas.
 * Each row deep-links into the /solutions page.
 *
 * Build 06: staggered reveal per row for premium list entrance.
 */
export function SolutionsPreview() {
  return (
    <section aria-labelledby="solutions-heading" className="bg-background">
      <div className="container-page py-16 sm:py-20 md:py-28">
        <div className="reveal max-w-2xl">
          <SectionHeading
            id="solutions-heading"
            eyebrow="Solutions"
            title={
              <>
                Digital problems,{" "}
                <span className="italic text-accent">solved practically</span>
              </>
            }
            lead="Two pathways: build or improve the web side of your work, or get dependable digital and technical support around it. Here is what each one covers."
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {servicePathways.map((pathway, index) => (
            <ServicePathway
              key={pathway.id}
              pathway={pathway}
              variant="card"
              revealDelay={index * 90}
            />
          ))}
        </div>

        <p className="mt-16 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted">
          Specific areas
        </p>
        <ul aria-label="Specific solution areas" className="mt-5 border-t border-border">
          {solutions.map((solution, index) => (
            <SolutionRow
              key={solution.id}
              solution={solution}
              index={index + 1}
              revealDelay={60 + index * 70}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
