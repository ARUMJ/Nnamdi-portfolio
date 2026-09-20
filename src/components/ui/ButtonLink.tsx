import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowIcon } from "./ArrowIcon";

type ButtonLinkVariant = "primary" | "secondary" | "inverse";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  /**
   * primary   — solid ink, for light sections
   * secondary — outlined, for secondary actions
   * inverse   — solid paper, for dark sections
   */
  variant?: ButtonLinkVariant;
  withArrow?: boolean;
  className?: string;
}

const baseClasses =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200";

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary: "bg-ink text-paper hover:bg-accent-deep",
  secondary: "border border-line bg-transparent text-ink hover:border-ink",
  inverse: "bg-paper text-ink hover:bg-accent hover:text-paper",
};

/** The site's only call-to-action element. Always a semantic link. */
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
        <ArrowIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
