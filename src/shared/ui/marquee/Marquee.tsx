"use client";

import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  vertical?: boolean;
  /** How many copies of the children to chain (must fill the track). */
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Fade the edges into the page background. */
  applyMask?: boolean;
  /** CSS duration of one loop, e.g. "30s". */
  duration?: string;
}

/**
 * Infinite marquee track. Ported from ScrollX UI's canopy pattern
 * (flowing-logos / animated-testimonials), adapted to Tailwind v3 and
 * the cosmic dark theme.
 */
export const Marquee = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = true,
  reverse = false,
  applyMask = true,
  duration = "30s",
  className,
  ...props
}: MarqueeProps) => (
  <div
    {...props}
    style={{ "--duration": duration, "--gap": "12px" } as React.CSSProperties}
    className={cn(
      "group relative flex h-full w-full overflow-hidden p-1 gap-[var(--gap)]",
      vertical ? "flex-col" : "flex-row",
      className
    )}
  >
    {Array.from({ length: repeat }).map((_, copyIndex) => (
      <div
        key={`copy-${copyIndex}`}
        className={cn("flex shrink-0 gap-[var(--gap)]", {
          "group-hover:paused": pauseOnHover,
          "direction-reverse": reverse,
          "animate-canopy-horizontal flex-row": !vertical,
          "animate-canopy-vertical flex-col": vertical,
        })}
      >
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full from-[#02030a] via-transparent to-[#02030a]",
          vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"
        )}
      />
    )}
  </div>
);
