"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { cn } from "@/shared/lib/cn";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  scale?: number;
}

interface TiltContextValue {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
}

const CardTiltContext = createContext<TiltContextValue | null>(null);

/** Hover-tracked 3D tilt container (ScrollX UI card-tilt port). */
export const CardTilt = forwardRef<HTMLDivElement, CardTiltProps>(
  ({ children, className, tiltMaxAngle = 10, scale = 1.02 }, forwardedRef) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);

    const springX = useSpring(pointerX, { stiffness: 300, damping: 30 });
    const springY = useSpring(pointerY, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(springY, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]);
    const scaleValue = useSpring(1, { stiffness: 300, damping: 30 });

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      scaleValue.set(scale);
    };

    const handleMouseLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
      scaleValue.set(1);
    };

    useImperativeHandle(forwardedRef, () => containerRef.current!);

    return (
      <CardTiltContext.Provider value={{ rotateX, rotateY, scale: scaleValue }}>
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("relative", className)}
          style={{ perspective: "1000px" }}
        >
          {children}
        </div>
      </CardTiltContext.Provider>
    );
  }
);
CardTilt.displayName = "CardTilt";

export const CardTiltContent = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string }
>(({ children, className }, ref) => {
  const context = useContext(CardTiltContext);
  if (!context) throw new Error("CardTiltContent must be used within CardTilt");

  const { rotateX, rotateY, scale } = context;
  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
});
CardTiltContent.displayName = "CardTiltContent";
