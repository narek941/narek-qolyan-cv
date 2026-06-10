"use client";

import { motion, type MotionValue } from "framer-motion";
import { Planet, type PlanetVariant } from "@/shared/ui/planet";

interface PlanetLayerProps {
  variant: PlanetVariant;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  driftX: MotionValue<string>;
  driftY: MotionValue<string>;
  spin: MotionValue<number>;
}

export const PlanetLayer = ({
  variant,
  scale,
  opacity,
  driftX,
  driftY,
  spin,
}: PlanetLayerProps) => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50 md:justify-end md:pr-[5%] md:opacity-100"
  >
    <motion.div style={{ scale, opacity, x: driftX, y: driftY, rotate: spin }}>
      <div className="h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] md:h-[360px] md:w-[360px] lg:h-[400px] lg:w-[400px]">
        <Planet variant={variant} className="h-full w-full" />
      </div>
    </motion.div>
  </div>
);
