import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { Tilt } from "@/components/motion/Tilt";
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
 * Build 06 motion:
 * - Each card is a subtle 3D tilt on pointer move (max ~5°, premium, not dramatic)
 *   with glare and depth. Disabled on mobile and reduced motion.
 * - Media frames have controlled hover scale (1.06) via GPU transform.
 * - Cards elevate on hover (shadow + slight scale).
 * - Staggered reveal: featured immediate, grid items staggered 90ms each.
 */
export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  if (projects.length === 0) return null;

  const [featured, ...rest] = projects;

  return (
    <div>
      <article
        className="reveal group min-w-0"
        data-reveal-delay="0"
        style={{ ["--reveal-delay" as string]: "0ms" }}
      >
        <Tilt className="rounded-xl">
          <div className="overflow-hidden rounded-xl border border-transparent transition-all duration-300 group-hover:border-border/60 group-hover:shadow-xl group-hover:shadow-elevation">
            <div className="media-frame">
              <ProjectMediaFrame
                project={featured}
                hoverZoom
                className="aspect-[16/10] rounded-xl"
              />
            </div>
          </div>
          <div className="tilt-meta">
            <ProjectMeta project={featured} className="mt-4" />
          </div>
        </Tilt>
      </article>

      {rest.length > 0 && (
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:gap-x-8">
          {rest.map((project, index) => (
            <article
              key={project.id}
              className="reveal group min-w-0"
              data-reveal-delay={String((index + 1) * 80)}
              style={{ ["--reveal-delay" as string]: `${(index + 1) * 80}ms` }}
            >
              <Tilt className="rounded-xl">
                <div className="overflow-hidden rounded-xl border border-transparent transition-all duration-300 group-hover:border-border/60 group-hover:shadow-xl group-hover:shadow-elevation">
                  <div className="media-frame">
                    <ProjectMediaFrame
                      project={project}
                      hoverZoom
                      className={project.featuredMedia ? "aspect-[16/10] rounded-xl" : "aspect-[4/3] rounded-xl"}
                    />
                  </div>
                </div>
                <div className="tilt-meta">
                  <ProjectMeta project={project} className="mt-4" />
                </div>
              </Tilt>
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
        <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
          {project.title}
        </h3>
        {project.category && (
          <p className="mt-1 text-sm text-foreground-muted">{project.category}</p>
        )}
        {project.shortDescription && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground-muted">
            {project.shortDescription}
          </p>
        )}
      </div>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
        >
          Visit live
          <ArrowIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}
