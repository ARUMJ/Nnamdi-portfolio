import { MediaGallery } from "@/components/media/MediaGallery";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectStatusBadge } from "@/components/work/ProjectProof";
import type { Project } from "@/lib/types";

interface ProjectCaseStudyProps {
  project: Project;
}

/**
 * Evidence-based case study section — Build 08.
 *
 * Renders only for a project that carries a caseStudy in the data (D
 * Connect). It demonstrates the product thinking behind the work and
 * states plainly what the prototype is not, so nothing beyond the built
 * interface is implied. Media reuses the project's real screenshots.
 */
export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const caseStudy = project.caseStudy;
  if (!caseStudy) return null;

  const headingId = `${project.slug}-case-study`;
  const scope = project.proof?.notIncluded ?? [];

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-border bg-surface/50"
    >
      <div className="container-page py-16 md:py-24">
        <div className="reveal max-w-3xl">
          <Eyebrow>Case study</Eyebrow>
          <h2
            id={headingId}
            className="mt-5 font-display text-3xl font-medium leading-[1.08] tracking-tight text-balance text-foreground sm:text-4xl"
          >
            {project.title}
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            {project.status && <ProjectStatusBadge status={project.status} />}
            {project.category && (
              <p className="text-sm text-foreground-muted">{project.category}</p>
            )}
          </div>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:text-lg">
            {caseStudy.summary}
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="reveal">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                What this demonstrates
              </h3>
              <ul className="mt-6 space-y-6">
                {caseStudy.demonstrates.map((item) => (
                  <li key={item.title} className="border-t border-border pt-4">
                    <h4 className="font-display text-lg font-medium tracking-tight text-foreground">
                      {item.title}
                    </h4>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {scope.length > 0 && (
              <div className="reveal mt-10" data-reveal-delay="120">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                  What it is not
                </h3>
                <ul className="mt-5 space-y-2">
                  {scope.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-foreground-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 rounded-full bg-border"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div className="reveal" data-reveal-delay="80">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                Built interface
              </h3>
              {project.gallery && project.gallery.length > 0 && (
                <MediaGallery
                  items={project.gallery}
                  title={project.title}
                  className="mt-5"
                />
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live website (opens in a new tab)`}
                  className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-current focus-visible:rounded-sm"
                >
                  View Live Website <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
