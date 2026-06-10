"use client";

import { motion, type MotionValue } from "framer-motion";

interface SceneTextStackProps {
  chapterLabel: string;
  indexLabel: string;
  title: string;
  subtitle?: string;
  labelOpacity: MotionValue<number>;
  labelY: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  titleScale: MotionValue<number>;
  titleY: MotionValue<number>;
  subOpacity: MotionValue<number>;
  subY: MotionValue<number>;
}

export const SceneTextStack = ({
  chapterLabel,
  indexLabel,
  title,
  subtitle,
  labelOpacity,
  labelY,
  titleOpacity,
  titleScale,
  titleY,
  subOpacity,
  subY,
}: SceneTextStackProps) => (
  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 text-center sm:px-8 md:max-w-[62%] md:items-start md:pl-12 md:text-left lg:pl-16">
    <motion.div
      style={{ opacity: labelOpacity, y: labelY }}
      className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1"
    >
      <span className="font-mono text-[10px] tracking-[0.25em] text-white/65">
        {indexLabel}
      </span>
      <div className="h-px w-6 bg-white/25" />
      <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/90">
        {chapterLabel}
      </span>
    </motion.div>

    <motion.h2
      style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
      className="font-display max-w-4xl text-balance text-3xl font-semibold leading-[1] tracking-tight text-indigo-100 sm:text-5xl md:text-6xl lg:text-7xl"
    >
      {title}
    </motion.h2>

    {subtitle && (
      <motion.p
        style={{ opacity: subOpacity, y: subY }}
        className="mt-4 max-w-xl text-sm font-normal text-white/70 sm:mt-5 sm:text-base"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);
