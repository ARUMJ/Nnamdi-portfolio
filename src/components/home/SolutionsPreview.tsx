import { SolutionRow } from "@/components/solutions/SolutionRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutions } from "@/data/solutions";

/**
 * Homepage solutions preview: an editorial index of the five solution
 * areas. Each row deep-links into the /solutions page.
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
            lead="Five areas where I help businesses and organizations turn a need into a working solution."
          />
        </div>

        <ul className="reveal mt-12 border-t border-border">
          {solutions.map((solution, index) => (
            <SolutionRow key={solution.id} solution={solution} index={index + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
