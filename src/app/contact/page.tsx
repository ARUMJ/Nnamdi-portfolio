import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";

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
 * Contact page: a brief guide plus the real contact channel. WhatsApp is the
 * only channel published — no form backend and no invented email address.
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
          <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            A short brief goes a long way
          </h2>
          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {briefItems.map((item, index) => (
              <li key={item.title} className="border-t border-border pt-5">
                <span
                  aria-hidden="true"
                  className="font-display text-sm tracking-[0.18em] text-foreground-muted"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-medium text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-7 md:p-9">
            <div className="relative">
              <span className="flex size-11 items-center justify-center rounded-full bg-button text-button-foreground">
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
                  <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 8.6 8.6 0 0 1-4-1L4 20l1.3-4.3a8.2 8.2 0 0 1-1.1-4.2A8.4 8.4 0 0 1 12.7 3 8.4 8.4 0 0 1 21 11.5Z" />
                </svg>
              </span>
              <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-foreground">
                WhatsApp
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                The fastest way to reach me. Send the brief above and
                we&apos;ll take it from there.
              </p>
              <p className="mt-5 font-display text-xl tracking-tight text-foreground">
                <span className="sr-only">WhatsApp number: </span>
                {site.contact.whatsappNumber}
              </p>
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-button px-6 py-3 text-sm font-medium tracking-wide text-button-foreground transition-colors duration-200 hover:bg-button-hover"
              >
                Chat on WhatsApp
                <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-foreground-muted">
                Opens WhatsApp on mobile, or WhatsApp Web on desktop.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
