import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowIcon } from "./ArrowIcon";

type ButtonLinkVariant = "primary" | "secondary" | "inverse";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  /**
   * primary   — solid button surface, for light sections
   * secondary — outlined, for secondary actions
   * inverse   — solid inverse surface, for dark sections
   *
   * All variants resolve through tokens, so both themes get correct
   * contrast automatically (in dark mode the primary button inverts to a
   * light surface with dark type — it always stays obvious).
   */
  variant?: ButtonLinkVariant;
  withArrow?: boolean;
  className?: string;
}

const baseClasses =
  "btn-motion group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide";

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary: "btn-motion--primary bg-button text-button-foreground hover:bg-button-hover",
  secondary: "btn-motion--secondary border border-border bg-transparent text-foreground hover:border-foreground",
  inverse: "bg-inverse-button text-inverse-button-foreground hover:bg-inverse-button-hover hover:text-inverse-button-hover-foreground",
};

/** The site's only call-to-action element. Always a semantic link. Premium tactile motion. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  withArrow = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
    >
      {children}
      {withArrow && (
        <ArrowIcon className="btn-arrow size-4" />
      )}
    </Link>
  );
}
