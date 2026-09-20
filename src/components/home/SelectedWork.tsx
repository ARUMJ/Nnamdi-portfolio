import { ProjectShowcase } from "@/components/work/ProjectShowcase";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

/**
 * Homepage selected-work preview. All content comes from the projects
 * data array; media frames render branded placeholders until real
 * films/imagery are added.
 */
export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work-heading" className="border-t border-line">
      <div className="container-page py-20 md:py-28">
        <div className="reveal flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="selected-work-heading"
            eyebrow="Selected work"
            title="Projects"
            lead="A selection of current projects. Case studies, project films, and live demonstrations are being prepared."
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
