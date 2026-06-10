"use client";

import { Children, useState, type ComponentProps, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Info, X } from "lucide-react";

import { cn } from "@/shared/lib/cn";

interface CardFlipProps extends Omit<ComponentProps<"div">, "children"> {
  /** Exactly two children: [front, back]. */
  children: [ReactNode, ReactNode];
}

/**
 * 3D Y-axis flip card. Ported from ScrollX UI's card-flip, restyled to
 * liquid-glass with corner toggle buttons.
 */
export const CardFlip = ({ className, children, ...props }: CardFlipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [front, back] = Children.toArray(children);

  return (
    <div
      className={cn("relative w-full h-full", className)}
      style={{ perspective: "1200px" }}
      {...props}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face */}
        <div
          className="w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <button
            type="button"
            onClick={() => setIsFlipped(true)}
            aria-label="Show details"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-all"
            style={{
              opacity: isFlipped ? 0 : 1,
              pointerEvents: isFlipped ? "none" : "auto",
            }}
          >
            <Info className="w-4 h-4" />
          </button>
          {front}
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(-180deg)",
          }}
        >
          <button
            type="button"
            onClick={() => setIsFlipped(false)}
            aria-label="Close details"
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-all"
            style={{
              opacity: isFlipped ? 1 : 0,
              pointerEvents: isFlipped ? "auto" : "none",
            }}
          >
            <X className="w-4 h-4" />
          </button>
          {back}
        </div>
      </motion.div>
    </div>
  );
};
