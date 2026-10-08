import { ProjectMediaFrame } from "@/components/media/ProjectMediaFrame";
import { Tilt } from "@/components/motion/Tilt";
import { ProjectProofBlock, ProjectStatusBadge } from "@/components/work/ProjectProof";
import type { Project } from "@/lib/types";

interface ProjectShowcaseProps {
  projects: Project[];
  /**
   * Semantic heading level for project titles. The homepage uses h3 (the
   * section already provides an h2); /work uses h2 directly under the page
   * h1, so the document outline stays h1 → h2 → h3.
   */
  headingLevel?: 2 | 3;
  /** Render the full four-part proof block for every project (/work). */
  detailed?: boolean;
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
 *
 * Build 08: every card states its delivery status; /work renders the full
 * purpose/contribution/delivered/scope proof (see ProjectProofBlock).
 */
export function ProjectShowcase({
  projects,
  headingLevel = 3,
  detailed = false,
}: ProjectShowcaseProps) {
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
          <div className="rounded-xl border border-transparent transition-all duration-300 group-hover:border-border/60 group-hover:shadow-xl group-hover:shadow-elevation">
            <ProjectMediaFrame
              project={featured}
              hoverZoom
              showLiveLink
              className="aspect-[16/10] rounded-xl"
            />
          </div>
          <div className="tilt-meta">
            <ProjectMeta
              project={featured}
              headingLevel={headingLevel}
              detailed={detailed}
              className="mt-4"
            />
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
                <div className="rounded-xl border border-transparent transition-all duration-300 group-hover:border-border/60 group-hover:shadow-xl group-hover:shadow-elevation">
                  <ProjectMediaFrame
                    project={project}
                    hoverZoom
                    showLiveLink
                    className={project.featuredMedia ? "aspect-[16/10] rounded-xl" : "aspect-[4/3] rounded-xl"}
                  />
                </div>
                <div className="tilt-meta">
                  <ProjectMeta
                    project={project}
                    headingLevel={headingLevel}
                    detailed={detailed}
                    className="mt-4"
                  />
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
  headingLevel?: 2 | 3;
  detailed?: boolean;
  className?: string;
}

/** Credit line under a project frame: semantic title, status, known category, context, and real links. */
export function ProjectMeta({
  project,
  headingLevel = 3,
  detailed = false,
  className = "",
}: ProjectMetaProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className={`min-w-0 ${className}`.trim()}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Heading className="font-display text-xl font-medium tracking-tight text-foreground">
          {project.title}
        </Heading>
        {project.status && <ProjectStatusBadge status={project.status} />}
      </div>
      {project.category && (
        <p className="mt-1 text-sm text-foreground-muted">{project.category}</p>
      )}
      {project.shortDescription && (
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground-muted">
          {project.shortDescription}
        </p>
      )}

      {detailed && project.proof ? (
        <ProjectProofBlock proof={project.proof} className="mt-6" />
      ) : (
        project.proof && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground">
            <span className="font-medium">What I did: </span>
            {project.proof.contributionSummary}
          </p>
        )
      )}
    </div>
  );
}
