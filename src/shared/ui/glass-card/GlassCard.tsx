"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  /** Visual weight. */
  variant?: "default" | "strong";
  /** Apply hover-tilt 3D effect. */
  tilt?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * iOS Liquid Glass surface. Composable wrapper for cards/badges with
 * optional hover-tilt 3D.
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ variant = "default", tilt = false, className = "", children, ...rest }, ref) => {
    const base = variant === "strong" ? "liquid-glass-strong" : "liquid-glass";
    const hover = tilt
      ? { y: -8, rotateX: 4, rotateY: -3 }
      : undefined;
    const tiltStyle = tilt
      ? { transformStyle: "preserve-3d" as const, perspective: 1000 }
      : undefined;

    return (
      <motion.div
        ref={ref}
        whileHover={hover}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        style={tiltStyle}
        className={`${base} relative overflow-hidden ${className}`}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
