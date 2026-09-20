import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Arum Jonathan Nnamdi — practical digital solutions for businesses and organizations.",
};

/**
 * Brief guidance for a first conversation. Category-level only —
 * nothing here invents services, guarantees or commitments.
 */
const briefItems = [
  {
    title: "The problem",
    description:
      "The digital need or problem you're facing — in a few honest sentences.",
  },
  {
    title: "The audience",
    description: "Who the solution is for — customers, members, staff, students.",
  },
  {
    title: "The outcome",
    description: "What success looks like when the project is done.",
  },
  {
    title: "The timing",
    description: "Any timeframe you have in mind — useful, never binding.",
  },
] as const;

/**
 * Contact page, Build 01: a brief guide plus an honest status card for the
 * contact channels. No form backend, no invented email address — the real
 * channel drops into this layout when it is provided.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a Project"
        lead="Tell me about the digital problem — the business need, the people it's for, and what success looks like. From there, let's define the practical solution together."
      />

      <section aria-label="How to get in touch" className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Eyebrow>What to include</Eyebrow>
          <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
            A short brief goes a long way
          </h2>
          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {briefItems.map((item, index) => (
              <li key={item.title} className="border-t border-line pt-5">
                <span
                  aria-hidden="true"
                  className="font-display text-sm tracking-[0.18em] text-muted"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-medium text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-deep/60 p-7 md:p-9">
            <div className="relative">
              <span className="flex size-11 items-center justify-center rounded-full bg-ink text-paper">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">
                Contact channels — coming soon
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Direct contact channels and project intake are being set up.
                This section will link to the fastest way to reach me once
                they&apos;re live.
              </p>
              <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                In the meantime, keep the brief above ready — it&apos;s exactly
                what shapes the first answer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
