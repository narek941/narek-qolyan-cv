"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

import { cn } from "@/shared/lib/cn";

interface TextSpotlightProps {
  text: string;
  className?: string;
  textClassName?: string;
  /** RGB triplet, e.g. "255, 255, 255". */
  spotlightColor?: string;
  spotlightSize?: number;
}

/**
 * Dim text revealed by a cursor-following spotlight.
 * Ported from ScrollX UI's text-spotlight (mobile reveal path dropped —
 * on touch screens the text simply renders at readable opacity).
 */
export const TextSpotlight = ({
  text,
  className,
  textClassName,
  spotlightColor = "255, 255, 255",
  spotlightSize = 380,
}: TextSpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
    setIsHovered(true);
  };

  const maskImage = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, rgba(${spotlightColor}, 1), transparent 80%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* Base layer — dim on desktop, readable on touch */}
      <p
        className={cn(
          "relative z-10 select-none text-white/25 lg:text-white/15",
          textClassName
        )}
      >
        {text}
      </p>

      {/* Revealed layer under the spotlight mask */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-20 pointer-events-none hidden lg:block"
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        <p className={cn("select-none text-white", textClassName)}>{text}</p>
      </motion.div>
    </div>
  );
};
