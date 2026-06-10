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

/** Saturn-like ringed world — magenta gas giant. */
export const RingedMagenta = ({ namespaceId, className }: PlanetSvgProps) => {
  const body = namespaceId("body");
  const atmos = namespaceId("atmos");
  const shadow = namespaceId("shadow");
  const limb = namespaceId("limb");
  const clip = namespaceId("clip");
  const ringG = namespaceId("ringG");
  const ringShadow = namespaceId("ringShadow");
  const bandNoise = namespaceId("band-noise");
  const swirl = namespaceId("swirl");

  return (
    <svg {...PLANET_SVG_BASE} className={className}>
      <defs>
        <radialGradient id={body} cx="35%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="22%" stopColor="#f0abfc" />
          <stop offset="50%" stopColor="#c026d3" />
          <stop offset="82%" stopColor="#4a044e" />
          <stop offset="100%" stopColor="#180420" />
        </radialGradient>
        <linearGradient id={ringG} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#f0abfc" stopOpacity="0" />
          <stop offset="18%" stopColor="#f0abfc" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#fdf4ff" stopOpacity="0.9" />
          <stop offset="48%" stopColor="#e9d5ff" stopOpacity="0.7" />
          <stop offset="52%" stopColor="#fdf4ff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#e9d5ff" stopOpacity="0.7" />
          <stop offset="82%" stopColor="#f0abfc" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f0abfc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Atmosphere id={atmos} color="#e879f9" />

      {/* Back ring (behind planet) */}
      <g transform={`rotate(-22 ${PLANET_CX} ${PLANET_CY})`}>
        <ellipse
          cx={PLANET_CX}
          cy={PLANET_CY}
          rx={PLANET_R * 1.7}
          ry={PLANET_R * 0.25}
          fill="none"
          stroke={`url(#${ringG})`}
          strokeWidth="14"
          opacity="0.85"
        />
        <ellipse
          cx={PLANET_CX}
          cy={PLANET_CY}
          rx={PLANET_R * 1.98}
          ry={PLANET_R * 0.33}
          fill="none"
          stroke={`url(#${ringG})`}
          strokeWidth="6"
          opacity="0.45"
        />
      </g>

      {/* Planet body */}
      <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R} fill={`url(#${body})`} />
      <PlanetClip id={clip} />
      <SwirlFilter id={swirl} seed={17} baseFrequency="0.014 0.03" scale={14} />
      <g clipPath={`url(#${clip})`}>
      <g filter={`url(#${swirl})`}>
        <ellipse cx={PLANET_CX - 10} cy={PLANET_CY - 65} rx={PLANET_R - 25} ry="11" fill="#fbcfe8" opacity="0.3" />
        <ellipse cx={PLANET_CX - 20} cy={PLANET_CY - 15} rx={PLANET_R - 30} ry="18" fill="#f0abfc" opacity="0.32" />
        <ellipse cx={PLANET_CX + 30} cy={PLANET_CY + 50} rx={PLANET_R - 30} ry="14" fill="#e879f9" opacity="0.38" />
        <ellipse cx={PLANET_CX + 10} cy={PLANET_CY + 95} rx={PLANET_R - 40} ry="8" fill="#a21caf" opacity="0.45" />
        {/* Cloud highlight */}
        <ellipse cx={PLANET_CX - 70} cy={PLANET_CY - 55} rx="30" ry="10" fill="white" opacity="0.28" />
      </g>
      </g>
      <SurfaceTexture id={bandNoise} seed={17} baseFrequency="0.005 0.04" opacity={0.55} />
      <LimbDarken id={limb} color="rgba(24,4,32,0.85)" />
      <ShadowSphere id={shadow} />

      {/* Ring shadow cast on the planet */}
      <defs>
        <linearGradient id={ringShadow} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop offset="50%" stopColor="black" stopOpacity="0.35" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={`rotate(-22 ${PLANET_CX} ${PLANET_CY})`} clipPath={`url(#${clip})`}>
        <rect
          x={PLANET_CX - PLANET_R * 1.7}
          y={PLANET_CY - 3}
          width={PLANET_R * 3.4}
          height="6"
          fill={`url(#${ringShadow})`}
        />
      </g>

      {/* Front half of ring — over the planet */}
      <g transform={`rotate(-22 ${PLANET_CX} ${PLANET_CY})`}>
        <path
          d={`M ${PLANET_CX - PLANET_R * 1.7} ${PLANET_CY} A ${PLANET_R * 1.7} ${PLANET_R * 0.25} 0 0 1 ${PLANET_CX + PLANET_R * 1.7} ${PLANET_CY}`}
          fill="none"
          stroke={`url(#${ringG})`}
          strokeWidth="14"
          opacity="0.95"
        />
      </g>
      <Specular />
    </svg>
  );
};
