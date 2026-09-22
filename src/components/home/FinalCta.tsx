import { CtaBand } from "@/components/ui/CtaBand";
import { site } from "@/data/site";

/** Homepage closing call to action, using the shared contact destination. */
export function FinalCta() {
  return (
    <CtaBand
      eyebrow="Let’s talk"
      title="Have a digital project or problem to solve?"
      subtitle="Let’s discuss what you need and determine the most practical way to move it forward."
      ctaLabel={site.primaryCta.label}
      ctaHref={site.primaryCta.href}
      secondaryAction={
        <a
          href={site.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-inverse-foreground/40 px-6 py-3 text-sm font-medium tracking-wide text-inverse-foreground transition-colors duration-200 hover:border-inverse-foreground hover:bg-inverse-foreground/5"
        >
          Chat on WhatsApp
        </a>
      }
    />
  );
}
