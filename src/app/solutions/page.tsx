import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { SolutionRow } from "@/components/solutions/SolutionRow";
import { CtaBand } from "@/components/ui/CtaBand";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Practical digital solutions for businesses and organizations including business websites, web products and digital experiences, website improvement, digital and technical support and education and organizational technology.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={
          <>
            Digital problems,{" "}
            <em className="italic text-accent">solved practically</em>.
          </>
        }
        lead="Each solution starts the same way. Understand the business need first, then design and build the right answer. Here is where I help."
      />

      <section aria-label="Solution areas" className="container-page py-4">
        <ul className="border-t border-border">
          {solutions.map((solution, index) => (
            <SolutionRow
              key={solution.id}
              solution={solution}
              index={index + 1}
              variant="detail"
              revealDelay={index * 70}
            />
          ))}
        </ul>
      </section>

      <CtaBand
        eyebrow="Next step"
        title="Not sure which one fits"
        subtitle="Describe the problem. The right solution usually becomes obvious."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </>
  );
}
