import { ProjectShowcase } from "@/components/work/ProjectShowcase";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

/**
 * Homepage selected-work preview. All content comes from the projects
 * data array; completed projects have click-to-play interface films.
 */
export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work-heading" className="border-t border-border">
      <div className="container-page py-16 sm:py-20 md:py-28">
        <div className="reveal flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="selected-work-heading"
            eyebrow="Selected work"
            title="Digital solutions & concepts"
            lead="A selection of digital projects and concepts I’ve worked on. Explore the real interfaces, on desktop and mobile."
          />
          <ButtonLink
            href="/work"
            variant="secondary"
            withArrow
            className="shrink-0 self-start md:self-auto"
          >
            View all work
          </ButtonLink>
        </div>

        <div className="mt-12 lg:mt-16">
          <ProjectShowcase projects={projects} />
        </div>
      </div>
    </section>
  );
}
