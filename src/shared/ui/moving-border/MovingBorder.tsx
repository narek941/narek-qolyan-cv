"use client";

import { useCallback, useLayoutEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import { cn } from "@/shared/lib/cn";

interface MovingBorderProps {
  children: ReactNode;
  className?: string;
  /** One full lap duration, ms. */
  duration?: number;
  /** Beam color or any CSS gradient string. */
  color?: string;
  /** Corner radius matching the wrapped card. */
  borderRadius?: string;
  beamWidth?: string;
  beamHeight?: string;
}

/**
 * Glowing beam that travels the perimeter of its container.
 * Ported from ScrollX UI's border-glide MovingBorder (carousel parts
 * dropped — we only need the orbiting light).
 */
export const MovingBorder = ({
  children,
  className,
  duration = 4000,
  color = "radial-gradient(#a78bfa 40%, transparent 60%)",
  borderRadius = "2rem",
  beamWidth = "8rem",
  beamHeight = "8rem",
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const time = useSpring(0, { stiffness: 100, damping: 20, mass: 0.5 });

  const animate = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    time.set(elapsed * (1000 / duration));
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [time, duration]);

  useLayoutEffect(() => {
    startTimeRef.current = Date.now();
    animate();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate]);

  const progress = useTransform(time, (value) => {
    if (!pathRef.current) return 0;
    return value % pathRef.current.getTotalLength();
  });
  const beamX = useTransform(progress, (value) =>
    pathRef.current ? pathRef.current.getPointAtLength(value).x : 0
  );
  const beamY = useTransform(progress, (value) =>
    pathRef.current ? pathRef.current.getPointAtLength(value).y : 0
  );
  const beamTransform = useMotionTemplate`translateX(${beamX}px) translateY(${beamY}px) translateX(-50%) translateY(-50%)`;

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ borderRadius }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full pointer-events-none"
      >
        <rect
          ref={pathRef}
          fill="none"
          width="100%"
          height="100%"
          rx={borderRadius}
          ry={borderRadius}
        />
      </svg>
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        style={{ transform: beamTransform, willChange: "transform" }}
      >
        <div
          className="rounded-full"
          style={{
            width: beamWidth,
            height: beamHeight,
            opacity: 0.8,
            background: color,
            filter: "blur(8px)",
          }}
        />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
