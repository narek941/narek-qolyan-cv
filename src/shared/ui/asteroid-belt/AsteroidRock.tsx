"use client";

import { useId } from "react";

interface AsteroidRockProps {
  shapeIndex: 0 | 1 | 2;
  className?: string;
}

/** Irregular rock silhouettes — lumpy polygons, lit top-left. */
const ROCK_PATHS = [
  "M 22 4 L 38 8 L 46 22 L 42 38 L 28 46 L 12 42 L 4 28 L 8 12 Z",
  "M 18 6 L 34 4 L 45 14 L 46 30 L 36 44 L 20 46 L 6 36 L 4 18 Z",
  "M 25 3 L 40 10 L 47 25 L 39 41 L 23 47 L 9 39 L 3 23 L 11 9 Z",
] as const;

/** Crater spots per shape: [cx, cy, r] triplets. */
const ROCK_CRATERS: readonly (readonly [number, number, number][])[] = [
  [
    [18, 18, 4],
    [32, 30, 5],
    [24, 38, 3],
  ],
  [
    [28, 16, 5],
    [16, 32, 4],
    [36, 36, 3],
  ],
  [
    [20, 24, 5],
    [34, 18, 3],
    [28, 38, 4],
  ],
];

export const AsteroidRock = ({ shapeIndex, className }: AsteroidRockProps) => {
  const rawReactId = useId().replace(/:/g, "");
  const bodyGradientId = `${rawReactId}-rock-body`;

  return (
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id={bodyGradientId} cx="32%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="45%" stopColor="#6b7280" />
          <stop offset="80%" stopColor="#374151" />
          <stop offset="100%" stopColor="#111827" />
        </radialGradient>
      </defs>
      <path d={ROCK_PATHS[shapeIndex]} fill={`url(#${bodyGradientId})`} />
      {ROCK_CRATERS[shapeIndex].map(([craterX, craterY, craterRadius], craterIndex) => (
        <g key={craterIndex}>
          <circle cx={craterX} cy={craterY} r={craterRadius} fill="#1f2937" opacity="0.7" />
          <circle
            cx={craterX - craterRadius * 0.25}
            cy={craterY - craterRadius * 0.25}
            r={craterRadius * 0.55}
            fill="#4b5563"
            opacity="0.5"
          />
        </g>
      ))}
    </svg>
  );
};
