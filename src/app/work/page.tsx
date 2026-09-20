import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";
import { CtaBand } from "@/components/ui/CtaBand";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Arum Jonathan Nnamdi — Stayora, D-Connect Delivery Services, PureNest Cleaning Co., Prince M Furnishing Concept, PNK / Clarean Peekan. Case studies and project films coming soon.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        lead="A growing selection of projects. Full case studies, project films, and live demonstrations are being prepared for each one."
      />

      <section aria-label="Project list" className="container-page py-16 md:py-24">
        <ProjectShowcase projects={projects} />
      </section>

      <CtaBand
        eyebrow="Start a project"
        title="Have a project in mind?"
        subtitle="Let's turn the requirement into a practical solution."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </>
  );
}
