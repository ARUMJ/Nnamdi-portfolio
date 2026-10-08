import type { ProjectProof, ProjectStatus } from "@/lib/types";

const labelClass =
  "text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground-muted";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

/**
 * The delivery status of a project — Concept, Prototype, Deployed Demo or
 * Production Website. Always rendered as text (never colour alone), so a
 * concept is never mistaken for client work or production.
 */
export function ProjectStatusBadge({ status, className = "" }: ProjectStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted ${className}`.trim()}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {status}
    </span>
  );
}

interface ProjectProofBlockProps {
  proof: ProjectProof;
  className?: string;
}

/**
 * The four-part proof block — Build 08.
 *
 * Every project answers the same questions: why it exists (purpose), what
 * I personally did (contribution), what was actually produced (delivered)
 * and what the project is not (scope). The wording comes from src/data
 * and contains no invented clients, metrics or results.
 */
export function ProjectProofBlock({ proof, className = "" }: ProjectProofBlockProps) {
  return (
    <dl
      className={`grid gap-x-10 gap-y-6 border-t border-border pt-6 sm:grid-cols-2 ${className}`.trim()}
    >
      <div className="sm:col-span-2">
        <dt className={labelClass}>Purpose</dt>
        <dd className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground">
          {proof.purpose}
        </dd>
      </div>

      <div>
        <dt className={labelClass}>Contribution</dt>
        <dd className="mt-2">
          <ul className="space-y-2">
            {proof.contribution.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-relaxed text-foreground-muted"
              >
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </dd>
      </div>

      <div>
        <dt className={labelClass}>Delivered</dt>
        <dd className="mt-2">
          <ul className="space-y-2">
            {proof.delivered.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-relaxed text-foreground-muted"
              >
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </dd>
      </div>

      {proof.notIncluded && proof.notIncluded.length > 0 && (
        <div className="sm:col-span-2">
          <dt className={labelClass}>What it is not</dt>
          <dd className="mt-2">
            <ul className="space-y-2">
              {proof.notIncluded.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-foreground-muted"
                >
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-border" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      )}
    </dl>
  );
}
