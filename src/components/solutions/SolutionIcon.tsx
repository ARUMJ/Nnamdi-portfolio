import type { SolutionIconName } from "@/lib/types";

interface SolutionIconProps {
  name: SolutionIconName;
  className?: string;
}

/**
 * Minimal line icons for the five solution areas.
 * Pure geometry, no icon library — keeps the dependency list lean.
 */
export function SolutionIcon({ name, className = "size-6" }: SolutionIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "website":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="15" rx="2" />
          <path d="M3 9h18" />
          <path d="M6.2 6.8h.01M8.8 6.8h.01" />
        </svg>
      );
    case "product":
      return (
        <svg {...common}>
          <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M12 12l8-4.5M12 12v9m0-9L4 7.5" />
        </svg>
      );
    case "improve":
      return (
        <svg {...common}>
          <path d="M6 4v4.5M6 13.5V20M12 4v2M12 10v10M18 4v7.5M18 16.5V20" />
          <circle cx="6" cy="11" r="2" />
          <circle cx="12" cy="8" r="2" />
          <circle cx="18" cy="14" r="2" />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
        </svg>
      );
    case "education":
      return (
        <svg {...common}>
          <path d="m12 4 10 5-10 5L2 9l10-5Z" />
          <path d="M6 11.8V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.2" />
          <path d="M22 9v5" />
        </svg>
      );
  }
}
