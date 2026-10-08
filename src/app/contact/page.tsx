import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Arum Jonathan Nnamdi about a project — a website, web interface, website improvement or digital and technical support — or about professional opportunities in web development, digital assistance and technical support.",
  path: "/contact",
});

/**
 * Brief guidance for a first conversation. Category level only.
 * Nothing here invents services, guarantees or commitments.
 */
const briefItems = [
  {
    title: "The problem",
    description:
      "The digital need or problem you are facing, in a few honest sentences.",
  },
  {
    title: "The audience",
    description: "Who the solution is for: customers, members, staff, students.",
  },
  {
    title: "The outcome",
    description: "What success looks like when the project is done.",
  },
  {
    title: "The timing",
    description: "Any timeframe you have in mind. Useful but never binding.",
  },
] as const;

/**
 * Contact page for both audiences — a project enquiry or a professional
 * opportunity. WhatsApp is the only published channel; no form backend,
 * no invented email address, and the number itself is never shown as text.
 *
 * Build 06: staggered reveals for brief items, tactile card motion.
 * Build 08: two-audience structure and the number removed from view.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lead="For a project enquiry or a professional opportunity. Tell me what you need, the context around it, and we will take it from there."
      />

      <section aria-label="How to get in touch" className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="reveal">
            <Eyebrow>Who this is for</Eyebrow>
            <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              Two ways to start
            </h2>
          </div>
          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {site.contact.audiences.map((audience, index) => (
              <li
                key={audience.id}
                className="reveal border-t border-border pt-5"
                data-reveal-delay={String(80 + index * 70)}
                style={{ ["--reveal-delay" as string]: `${80 + index * 70}ms` }}
              >
                <h3 className="text-base font-medium text-foreground">{audience.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {audience.description}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {audience.detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="reveal mt-14">
            <Eyebrow>What to include</Eyebrow>
            <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              A short brief goes a long way
            </h2>
          </div>
          <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {briefItems.map((item, index) => (
              <li
                key={item.title}
                className="reveal border-t border-border pt-5"
                data-reveal-delay={String(80 + index * 70)}
                style={{ ["--reveal-delay" as string]: `${80 + index * 70}ms` }}
              >
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
          <div
            className="reveal group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-7 transition-all duration-300 hover:shadow-xl hover:shadow-elevation md:p-9"
            data-reveal="scale"
            data-reveal-delay="180"
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgb(31_74_60/0.06),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgb(140_194_170/0.05),transparent_70%)]" aria-hidden="true" />
            <div className="relative">
              <span className="flex size-11 items-center justify-center rounded-full bg-button text-button-foreground transition-transform duration-300 group-hover:scale-105">
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
                The fastest way to reach me — whether this is a project enquiry
                or a professional opportunity. Send the brief above, or
                introduce yourself and what you have in mind.
              </p>
              <a
                href={site.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-motion group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-button px-6 py-3 text-sm font-medium tracking-wide text-button-foreground hover:bg-button-hover"
              >
                Chat on WhatsApp
                <ArrowIcon className="btn-arrow size-4" />
              </a>
              <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-foreground-muted">
                Opens WhatsApp on mobile, or WhatsApp Web on desktop.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                Prefer to look first?{" "}
                <Link
                  href="/work"
                  className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-current"
                >
                  Review the work
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
