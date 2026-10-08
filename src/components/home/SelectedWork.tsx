import { ProjectShowcase } from "@/components/work/ProjectShowcase";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

/**
 * Homepage selected-work preview. All content comes from the projects
 * data array; completed projects have click-to-play interface films.
 *
 * Build 06: staggered heading + cta reveal.
 */
export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work-heading" className="border-t border-border">
      <div className="container-page py-16 sm:py-20 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="reveal max-w-2xl">
            <SectionHeading
              id="selected-work-heading"
              eyebrow="Selected work"
              title="Digital solutions and concepts"
              lead="Five projects, each labelled for what it is — concept, prototype or deployed demo — with the live site to open and a plain account of what I built and delivered."
            />
          </div>
          <div
            className="reveal shrink-0 self-start md:self-auto"
            data-reveal-delay="140"
            style={{ ["--reveal-delay" as string]: "140ms" }}
          >
            <ButtonLink href="/work" variant="secondary" withArrow>
              View all work
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <ProjectShowcase projects={projects} />
        </div>
      </div>
    </section>
  );
}
