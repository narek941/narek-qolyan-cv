"use client";

import { motion, type MotionValue } from "framer-motion";

interface SceneBackgroundProps {
  opacity: MotionValue<number>;
  hue: string;
}

/** Atmospheric backlight tinted by the chapter's planet hue. */
export const SceneBackground = ({ opacity, hue }: SceneBackgroundProps) => (
  <motion.div
    aria-hidden
    style={{ opacity }}
    className="absolute inset-0 pointer-events-none"
  >
    <div
      className="absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
      style={{ background: hue }}
    />
  </motion.div>
);
