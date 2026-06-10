"use client";

import { PLANET_CX, PLANET_CY, PLANET_R, PLANET_SVG_BASE, type PlanetSvgProps } from "../types";
import {
  Atmosphere,
  ShadowSphere,
  Specular,
  LimbDarken,
  PlanetClip,
  SurfaceTexture,
  SwirlFilter,
} from "../primitives";

/** Mars-like world — dust ring, craters, continent stains, polar cap. */
export const MarsOrange = ({ namespaceId, className }: PlanetSvgProps) => {
  const body = namespaceId("body");
  const atmos = namespaceId("atmos");
  const shadow = namespaceId("shadow");
  const limb = namespaceId("limb");
  const clip = namespaceId("clip");
  const ringG = namespaceId("ringG");
  const terrainNoise = namespaceId("terrain-noise");
  const grainNoise = namespaceId("grain-noise");
  const swirl = namespaceId("swirl");

  const craters: [number, number, number][] = [
    [PLANET_CX + 60, PLANET_CY - 80, 11],
    [PLANET_CX - 30, PLANET_CY + 90, 8],
    [PLANET_CX + 90, PLANET_CY + 10, 7],
    [PLANET_CX - 100, PLANET_CY - 20, 6],
    [PLANET_CX + 10, PLANET_CY - 50, 5],
    [PLANET_CX - 60, PLANET_CY + 30, 5],
    [PLANET_CX + 40, PLANET_CY + 60, 4],
  ];

  return (
    <svg {...PLANET_SVG_BASE} className={className}>
      <defs>
        <radialGradient id={body} cx="35%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="22%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="82%" stopColor="#7c2d12" />
          <stop offset="100%" stopColor="#1b0a04" />
        </radialGradient>
        <linearGradient id={ringG} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0" />
          <stop offset="30%" stopColor="#fdba74" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#fed7aa" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#fdba74" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Atmosphere id={atmos} color="#fb923c" />
      {/* Back of dust ring */}
      <g transform={`rotate(18 ${PLANET_CX} ${PLANET_CY})`}>
        <ellipse
          cx={PLANET_CX}
          cy={PLANET_CY}
          rx={PLANET_R * 1.88}
          ry={PLANET_R * 0.3}
          fill="none"
          stroke={`url(#${ringG})`}
          strokeWidth="11"
          opacity="0.8"
        />
      </g>
      <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R} fill={`url(#${body})`} />
      <PlanetClip id={clip} />
      <SwirlFilter id={swirl} seed={23} baseFrequency="0.018" scale={12} />
      <g clipPath={`url(#${clip})`}>
      <g filter={`url(#${swirl})`}>
        {/* Dark continents (basalt plains) */}
        <path
          d={`M ${PLANET_CX - PLANET_R * 0.6} ${PLANET_CY - 30} q 30 -25 70 -10 q 22 22 -8 50 q -40 26 -78 -3 z`}
          fill="#7c2d12"
          opacity="0.55"
        />
        <path
          d={`M ${PLANET_CX + 22} ${PLANET_CY + 32} q 42 -16 65 12 q 6 36 -42 34 q -30 -6 -23 -46 z`}
          fill="#7c2d12"
          opacity="0.5"
        />
        <path
          d={`M ${PLANET_CX - 80} ${PLANET_CY + 70} q 26 -10 52 6 q -5 32 -47 25 q -20 -10 -5 -31 z`}
          fill="#7c2d12"
          opacity="0.55"
        />
        <path
          d={`M ${PLANET_CX - 110} ${PLANET_CY - 50} q 18 -6 32 8 q -2 22 -28 18 q -10 -10 -4 -26 z`}
          fill="#7c2d12"
          opacity="0.4"
        />
        {/* Craters with sunlit rims */}
        {craters.map(([cx, cy, r], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#1b0a04" opacity="0.5" />
            <circle cx={cx - 1.2} cy={cy - 1.2} r={r * 0.62} fill="#fed7aa" opacity="0.3" />
          </g>
        ))}
        {/* North polar ice */}
        <ellipse cx={PLANET_CX} cy={PLANET_CY - PLANET_R + 18} rx={PLANET_R * 0.6} ry="14" fill="#fed7aa" opacity="0.55" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY - PLANET_R + 22} rx={PLANET_R * 0.35} ry="8" fill="white" opacity="0.4" />
        {/* Atmosphere wisps */}
        <ellipse cx={PLANET_CX + 5} cy={PLANET_CY - 95} rx="50" ry="2.5" fill="#fed7aa" opacity="0.3" />
      </g>
      </g>
      <SurfaceTexture id={terrainNoise} seed={23} baseFrequency="0.016" opacity={0.6} />
      <SurfaceTexture id={grainNoise} seed={41} baseFrequency="0.07" octaves={3} opacity={0.3} />
      <LimbDarken id={limb} color="rgba(27,10,4,0.85)" />
      <ShadowSphere id={shadow} />
      {/* Front of dust ring */}
      <g transform={`rotate(18 ${PLANET_CX} ${PLANET_CY})`}>
        <path
          d={`M ${PLANET_CX - PLANET_R * 1.88} ${PLANET_CY} A ${PLANET_R * 1.88} ${PLANET_R * 0.3} 0 0 1 ${PLANET_CX + PLANET_R * 1.88} ${PLANET_CY}`}
          fill="none"
          stroke={`url(#${ringG})`}
          strokeWidth="11"
          opacity="0.95"
        />
      </g>
      <Specular />
    </svg>
  );
};
