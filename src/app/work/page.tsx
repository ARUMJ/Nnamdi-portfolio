import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCaseStudy } from "@/components/work/ProjectCaseStudy";
import { ProjectShowcase } from "@/components/work/ProjectShowcase";
import { CtaBand } from "@/components/ui/CtaBand";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Projects by Arum Jonathan Nnamdi — Stayora, D Connect Delivery Services, PureNest Cleaning Co., Prince M Furnishing Concept and PNK and Clarean Peekan. Each project states its purpose, my contribution, what was delivered and whether it is a concept, prototype or deployed demo, with the live site to open.",
  path: "/work",
});

export default function WorkPage() {
  const caseStudyProject = projects.find((project) => project.caseStudy);

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        lead="Real interfaces in motion. Every project below states its purpose, what I built, what was delivered and whether it is a concept, prototype or deployed demo — with the live site to open."
      />

      <section aria-label="Project list" className="container-page py-16 md:py-24">
        {/* Heading level 2: the page title above is the h1, project titles
            are the h2s, and the case study's subsections are the h3s. */}
        <ProjectShowcase projects={projects} headingLevel={2} detailed />
      </section>

      {caseStudyProject && <ProjectCaseStudy project={caseStudyProject} />}

      <CtaBand
        eyebrow="Start a project"
        title="Have a project in mind?"
        subtitle="Let us turn the requirement into a practical solution."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </>
  );
}
