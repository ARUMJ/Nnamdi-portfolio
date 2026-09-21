import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import type { Project } from "@/lib/types";

interface ProjectShowcaseProps {
  projects: Project[];
}

/**
 * Premium showcase layout: the first project renders as a wide cinematic
 * feature frame, the remainder as a two-column grid.
 * Used by the homepage preview and the /work page.
 *
 * Media frames carry a subtle editorial zoom on hover so project media
 * reads as part of the project story; the motion is disabled entirely
 * under prefers-reduced-motion (global transition rule).
 */
export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  if (projects.length === 0) return null;

  const [featured, ...rest] = projects;

  return (
    <div>
      <article className="reveal min-w-0">
        <ProjectMediaFrame
          project={featured}
          hoverZoom
          className="aspect-[16/10] rounded-xl sm:aspect-[16/9] lg:aspect-[21/9]"
        />
        <ProjectMeta project={featured} className="mt-4" />
      </article>

      {rest.length > 0 && (
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:gap-x-8">
          {rest.map((project) => (
            <article key={project.id} className="reveal min-w-0">
              <ProjectMediaFrame project={project} hoverZoom className="aspect-[4/3] rounded-xl" />
              <ProjectMeta project={project} className="mt-4" />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

interface ProjectMetaProps {
  project: Project;
  className?: string;
}

/** Credit line under a project frame: semantic title, known category, context, and real links. */
export function ProjectMeta({ project, className = "" }: ProjectMetaProps) {
  return (
    <div
      className={`flex flex-wrap items-start justify-between gap-x-6 gap-y-2 ${className}`.trim()}
    >
      <div className="min-w-0">
        <h3 className="font-display text-xl font-medium tracking-tight text-ink">
          {project.title}
        </h3>
        {project.category && (
          <p className="mt-1 text-sm text-muted">{project.category}</p>
        )}
        {project.shortDescription && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {project.shortDescription}
          </p>
        )}
      </div>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:text-accent"
        >
          Visit live
          <ArrowIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}
