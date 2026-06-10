"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { AsteroidRock } from "./AsteroidRock";
import { ASTEROID_BELT, type AsteroidConfig } from "./const";

/**
 * Slow-drifting asteroid field. Each rock self-drifts on an infinite
 * loop, spins, and parallax-shifts with page scroll so nearer rocks
 * move faster — selling the depth of the cockpit view.
 *
 * Layout comes from a deterministic const (no Math.random in render),
 * so SSR and client markup match.
 */
export const AsteroidBelt = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
  >
    {ASTEROID_BELT.map((asteroid) => (
      <DriftingAsteroid key={asteroid.id} asteroid={asteroid} />
    ))}
  </div>
);

const DriftingAsteroid = ({ asteroid }: { asteroid: AsteroidConfig }) => {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vh", `${-100 * asteroid.parallaxStrength}vh`]
  );

  return (
    <motion.div
      style={{
        top: `${asteroid.topPercent}%`,
        left: `${asteroid.leftPercent}%`,
        width: asteroid.sizePx,
        height: asteroid.sizePx,
        opacity: asteroid.opacity,
        y: parallaxY,
      }}
      className="absolute"
    >
      {/* Local drift loop */}
      <motion.div
        animate={{
          x: [0, asteroid.driftXPx, 0],
          y: [0, asteroid.driftYPx, 0],
        }}
        transition={{
          duration: asteroid.driftDurationSeconds,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full"
      >
        {/* Spin */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: asteroid.spinDurationSeconds,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-full h-full"
        >
          <AsteroidRock shapeIndex={asteroid.shapeIndex} className="w-full h-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
