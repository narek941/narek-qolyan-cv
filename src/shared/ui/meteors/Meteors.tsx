"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Diagonal meteor streaks, regenerating in waves.
 * Adapted from ScrollX UI's BackgroundMeteors (MIT) — restyled from
 * vertical grid beams to diagonal space meteors with glowing heads.
 *
 * Meteors are generated client-side only (state starts empty), so SSR
 * markup and first client render agree — no hydration mismatch.
 */
interface Meteor {
  id: number;
  /** Horizontal start position, vw. */
  startXvw: number;
  /** Vertical start position, vh. */
  startYvh: number;
  durationSeconds: number;
  delaySeconds: number;
  lengthPx: number;
}

interface MeteorsProps {
  /** Meteors per wave. */
  count?: number;
  className?: string;
}

const METEOR_ANGLE_DEGREES = 215;
const WAVE_INTERVAL_MS = 9000;

const generateWave = (count: number): Meteor[] =>
  Array.from({ length: count }, (_, index) => ({
    id: Date.now() + index,
    startXvw: 25 + Math.random() * 75,
    startYvh: Math.random() * 40,
    durationSeconds: 2.2 + Math.random() * 2.4,
    delaySeconds: Math.random() * 6,
    lengthPx: 70 + Math.random() * 90,
  }));

export const Meteors = ({ count = 5, className = "" }: MeteorsProps) => {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    setMeteors(generateWave(count));
    const interval = setInterval(
      () => setMeteors(generateWave(count)),
      WAVE_INTERVAL_MS
    );
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          style={{
            left: `${meteor.startXvw}vw`,
            top: `${meteor.startYvh}vh`,
            rotate: `${METEOR_ANGLE_DEGREES}deg`,
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, -110 * 8],
            y: [0, 110 * 5],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: meteor.durationSeconds,
            delay: meteor.delaySeconds,
            ease: "linear",
          }}
        >
          {/* Glowing head */}
          <div className="absolute -left-0.5 -top-0.5 h-1 w-1 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7),0_0_20px_6px_rgba(99,102,241,0.4)]" />
          {/* Tail */}
          <div
            className="h-px bg-gradient-to-r from-white via-indigo-300/60 to-transparent"
            style={{ width: meteor.lengthPx }}
          />
        </motion.div>
      ))}
    </div>
  );
};
