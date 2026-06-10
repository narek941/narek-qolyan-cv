"use client";

import { useRef, type ReactNode, type SVGProps } from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/shared/lib/cn";

const Pointer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
  </svg>
);

interface CursorHighlightProps {
  children: ReactNode;
  className?: string;
  /** Tailwind gradient stops for the highlight sweep. */
  gradient?: string;
  sweepDurationSeconds?: number;
  showPointer?: boolean;
}

/**
 * Gradient text that sweeps in when scrolled into view, trailed by a
 * cursor-pointer glyph. Ported from ScrollX UI's cursor-highlight,
 * trimmed to the in-view sweep variant.
 */
export const CursorHighlight = ({
  children,
  className,
  gradient = "from-indigo-300 via-fuchsia-300 to-cyan-300",
  sweepDurationSeconds = 1.6,
  showPointer = true,
}: CursorHighlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4, once: true });

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {/* Dim base */}
      <span className="text-white/30">{children}</span>

      {/* Gradient sweep reveal */}
      <motion.span
        aria-hidden
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={{ duration: sweepDurationSeconds, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "absolute inset-0 bg-gradient-to-r bg-clip-text text-transparent",
          gradient
        )}
      >
        {children}
      </motion.span>

      {showPointer && (
        <motion.span
          aria-hidden
          initial={{ left: "0%", opacity: 0, rotate: 70 }}
          animate={
            isInView
              ? { left: "100%", opacity: [0, 1, 1, 0], rotate: 70 }
              : undefined
          }
          transition={{ duration: sweepDurationSeconds, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full -mt-1 text-indigo-300 text-sm pointer-events-none"
        >
          <Pointer />
        </motion.span>
      )}
    </div>
  );
};
