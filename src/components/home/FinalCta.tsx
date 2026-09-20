import { CtaBand } from "@/components/ui/CtaBand";

/** Homepage closing call to action. */
export function FinalCta() {
  return (
    <CtaBand
      eyebrow="Start a project"
      title="Have a digital problem to solve?"
      subtitle="Let's turn the requirement into a practical solution."
      ctaLabel="Start a Project"
      ctaHref="/contact"
    />
  );
}
