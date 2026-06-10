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

/** Frozen world — polar caps, ice cracks, frost speckle. */
export const IceCyan = ({ namespaceId, className }: PlanetSvgProps) => {
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
          <stop offset="0%" stopColor="#f0fdfa" />
          <stop offset="22%" stopColor="#a5f3fc" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="82%" stopColor="#155e75" />
          <stop offset="100%" stopColor="#06283a" />
        </radialGradient>
      </defs>
      <Atmosphere id={atmos} color="#22d3ee" />
      <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R} fill={`url(#${body})`} />
      <PlanetClip id={clip} />
      <SwirlFilter id={swirl} seed={5} baseFrequency="0.022" scale={10} />
      <g clipPath={`url(#${clip})`}>
      <g filter={`url(#${swirl})`}>
        {/* North polar cap with subtle blend */}
        <ellipse cx={PLANET_CX} cy={PLANET_CY - PLANET_R + 22} rx={PLANET_R * 0.78} ry="26" fill="white" opacity="0.7" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY - PLANET_R + 30} rx={PLANET_R * 0.5} ry="14" fill="white" opacity="0.85" />
        {/* South polar cap */}
        <ellipse cx={PLANET_CX} cy={PLANET_CY + PLANET_R - 18} rx={PLANET_R * 0.6} ry="22" fill="white" opacity="0.55" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY + PLANET_R - 22} rx={PLANET_R * 0.38} ry="11" fill="white" opacity="0.75" />
        {/* Ice cracks */}
        <path
          d={`M ${PLANET_CX - PLANET_R * 0.75} ${PLANET_CY - 30} Q ${PLANET_CX - 20} ${PLANET_CY - 60} ${PLANET_CX + 60} ${PLANET_CY - 10} T ${PLANET_CX + PLANET_R * 0.7} ${PLANET_CY + 40}`}
          fill="none"
          stroke="#bae6fd"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          d={`M ${PLANET_CX - PLANET_R * 0.55} ${PLANET_CY + 55} Q ${PLANET_CX + 5} ${PLANET_CY + 25} ${PLANET_CX + PLANET_R * 0.6} ${PLANET_CY + 70}`}
          fill="none"
          stroke="#e0f2fe"
          strokeWidth="1.5"
          opacity="0.65"
        />
        <path
          d={`M ${PLANET_CX - 25} ${PLANET_CY - PLANET_R * 0.35} Q ${PLANET_CX + 35} ${PLANET_CY + 5} ${PLANET_CX} ${PLANET_CY + PLANET_R * 0.5}`}
          fill="none"
          stroke="#bae6fd"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <path
          d={`M ${PLANET_CX + 40} ${PLANET_CY - 70} Q ${PLANET_CX + 90} ${PLANET_CY - 30} ${PLANET_CX + 110} ${PLANET_CY + 15}`}
          fill="none"
          stroke="#bae6fd"
          strokeWidth="1.2"
          opacity="0.5"
        />
        {/* Frost speckle */}
        <circle cx={PLANET_CX - 80} cy={PLANET_CY + 35} r="3" fill="white" opacity="0.75" />
        <circle cx={PLANET_CX + 55} cy={PLANET_CY - 50} r="2" fill="white" opacity="0.6" />
        <circle cx={PLANET_CX + 90} cy={PLANET_CY + 75} r="2.5" fill="white" opacity="0.7" />
        <circle cx={PLANET_CX - 35} cy={PLANET_CY + 100} r="2" fill="white" opacity="0.55" />
        <circle cx={PLANET_CX + 20} cy={PLANET_CY + 30} r="1.5" fill="white" opacity="0.5" />
      </g>
      </g>
      <SurfaceTexture id={terrainNoise} seed={5} baseFrequency="0.02" opacity={0.45} />
      <LimbDarken id={limb} color="rgba(6,40,58,0.85)" />
      <ShadowSphere id={shadow} />
      <Specular />
    </svg>
  );
};
