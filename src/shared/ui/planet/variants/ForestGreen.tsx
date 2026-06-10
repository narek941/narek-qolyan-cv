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

/** Habitable green world — continents, swirly clouds, blue lakes. */
export const ForestGreen = ({ namespaceId, className }: PlanetSvgProps) => {
  const body = namespaceId("body");
  const atmos = namespaceId("atmos");
  const shadow = namespaceId("shadow");
  const limb = namespaceId("limb");
  const clip = namespaceId("clip");
  const terrainNoise = namespaceId("terrain-noise");
  const swirl = namespaceId("swirl");

  return (
    <svg {...PLANET_SVG_BASE} className={className}>
      <defs>
        <radialGradient id={body} cx="35%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#d1fae5" />
          <stop offset="22%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="82%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#031108" />
        </radialGradient>
      </defs>
      <Atmosphere id={atmos} color="#34d399" />
      <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R} fill={`url(#${body})`} />
      <PlanetClip id={clip} />
      <SwirlFilter id={swirl} seed={13} baseFrequency="0.02" scale={22} />
      <g clipPath={`url(#${clip})`}>
      <g filter={`url(#${swirl})`}>
        {/* Ocean (slightly bluer band) */}
        <ellipse cx={PLANET_CX} cy={PLANET_CY} rx={PLANET_R} ry={PLANET_R} fill="#0e7490" opacity="0.18" />
        {/* Continents — irregular blobs */}
        <path
          d={`M ${PLANET_CX - PLANET_R * 0.7} ${PLANET_CY - 25} q 28 -38 70 -16 q 32 18 8 50 q -38 32 -86 0 q -25 -16 8 -34 z`}
          fill="#14532d"
          opacity="0.78"
        />
        <path
          d={`M ${PLANET_CX + 38} ${PLANET_CY + 22} q 40 -28 80 6 q 16 36 -24 56 q -50 22 -66 -26 q -10 -25 10 -36 z`}
          fill="#14532d"
          opacity="0.72"
        />
        <path
          d={`M ${PLANET_CX - 50} ${PLANET_CY + 80} q 30 -14 56 12 q -5 30 -46 26 q -16 -16 -10 -38 z`}
          fill="#166534"
          opacity="0.7"
        />
        <path
          d={`M ${PLANET_CX + 75} ${PLANET_CY - 70} q 22 -10 36 8 q -4 24 -34 22 q -12 -10 -2 -30 z`}
          fill="#14532d"
          opacity="0.65"
        />
        {/* Cloud swirls */}
        <ellipse cx={PLANET_CX - 70} cy={PLANET_CY - 80} rx="65" ry="9" fill="white" opacity="0.4" />
        <ellipse cx={PLANET_CX + 50} cy={PLANET_CY - 30} rx="42" ry="6" fill="white" opacity="0.3" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY + 105} rx="62" ry="8" fill="white" opacity="0.32" />
        <ellipse cx={PLANET_CX - 35} cy={PLANET_CY + 55} rx="48" ry="5" fill="white" opacity="0.25" />
        {/* Lakes */}
        <circle cx={PLANET_CX + 20} cy={PLANET_CY - 30} r="7" fill="#0ea5e9" opacity="0.7" />
        <circle cx={PLANET_CX - 42} cy={PLANET_CY + 48} r="6" fill="#0ea5e9" opacity="0.65" />
        <circle cx={PLANET_CX + 80} cy={PLANET_CY + 40} r="4" fill="#0ea5e9" opacity="0.6" />
      </g>
      </g>
      <SurfaceTexture id={terrainNoise} seed={13} baseFrequency="0.014" opacity={0.5} />
      <LimbDarken id={limb} color="rgba(3,17,8,0.85)" />
      <ShadowSphere id={shadow} />
      <Specular />
    </svg>
  );
};
