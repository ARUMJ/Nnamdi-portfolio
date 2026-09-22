import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  /** "inverse" renders the light treatment for dark sections. */
  tone?: "default" | "inverse";
  withRule?: boolean;
  className?: string;
}

/** Small-caps section label with a short leading rule. */
export function Eyebrow({
  children,
  tone = "default",
  withRule = true,
  className = "",
}: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${
        tone === "inverse" ? "text-inverse-muted" : "text-accent"
      } ${className}`.trim()}
    >
      {withRule && (
        <span
          aria-hidden="true"
          className={`h-px w-8 ${tone === "inverse" ? "bg-inverse-border" : "bg-accent/40"}`}
        />
      )}
      {children}
    </p>
  );
}
