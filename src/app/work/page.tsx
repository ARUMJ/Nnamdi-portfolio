import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";
import { CtaBand } from "@/components/ui/CtaBand";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Arum Jonathan Nnamdi including Stayora, D Connect Delivery Services, PureNest Cleaning Co., Prince M Furnishing Concept and PNK and Clarean Peekan. Watch real interface films from completed websites and concepts.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        lead="Real interfaces in motion. Watch selected website showcases, including clearly labelled prototypes and fictional concepts."
      />

      <section aria-label="Project list" className="container-page py-16 md:py-24">
        <ProjectShowcase projects={projects} />
      </section>

      <CtaBand
        eyebrow="Start a project"
        title="Have a project in mind"
        subtitle="Let us turn the requirement into a practical solution."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </>
  );
}
