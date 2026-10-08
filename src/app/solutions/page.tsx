import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { ServicePathway } from "@/components/solutions/ServicePathway";
import { CtaBand } from "@/components/ui/CtaBand";
import { servicePathways } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description:
    "Two service pathways: Web & Digital Development — responsive websites, business websites, frontend development with React, Next.js, TypeScript and Tailwind CSS, website improvements, SEO metadata and structured data — and Digital Assistance & Technical Support for digital administration, device support, documentation and day-to-day technical help.",
  path: "/solutions",
});

export default function SolutionsPage() {
  // Page-wide area numbering (01–05), across both pathways.
  const areaStarts = servicePathways.map(
    (_, index) =>
      1 +
      servicePathways
        .slice(0, index)
        .reduce((total, pathway) => total + pathway.areas.length, 0),
  );

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title={
          <>
            Two pathways,{" "}
            <em className="italic text-accent">one practical approach</em>.
          </>
        }
        lead="One pathway builds and improves the web side of your work. The other keeps everything digital around it running. Both start the same way — understand the need first, then build the right answer."
      />

      {servicePathways.map((pathway, index) => (
        <ServicePathway
          key={pathway.id}
          pathway={pathway}
          variant="detail"
          areaStartIndex={areaStarts[index]}
        />
      ))}

      <CtaBand
        eyebrow="Next step"
        title="Not sure which pathway fits?"
        subtitle="Describe the problem. The right starting point usually becomes obvious."
        ctaLabel="Start a Project"
        ctaHref="/contact"
      />
    </>
  );
}
