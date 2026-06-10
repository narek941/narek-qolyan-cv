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

/** Jupiter-like gas giant — banded clouds + Great Red Spot. */
export const GasIndigo = ({ namespaceId, className }: PlanetSvgProps) => {
  const body = namespaceId("body");
  const atmos = namespaceId("atmos");
  const shadow = namespaceId("shadow");
  const limb = namespaceId("limb");
  const clip = namespaceId("clip");
  const bandNoise = namespaceId("band-noise");
  const grainNoise = namespaceId("grain-noise");
  const swirl = namespaceId("swirl");

  return (
    <svg {...PLANET_SVG_BASE} className={className}>
      <defs>
        <radialGradient id={body} cx="35%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="22%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="80%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#0d0a3d" />
        </radialGradient>
      </defs>
      <Atmosphere id={atmos} color="#a78bfa" />
      <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R} fill={`url(#${body})`} />
      <PlanetClip id={clip} />
      <SwirlFilter id={swirl} seed={11} baseFrequency="0.012 0.035" scale={18} />
      <g clipPath={`url(#${clip})`}>
      <g filter={`url(#${swirl})`}>
        {/* Bands — alternating darker/lighter */}
        <ellipse cx={PLANET_CX} cy={PLANET_CY - 100} rx={PLANET_R} ry="9" fill="#4338ca" opacity="0.42" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY - 75} rx={PLANET_R} ry="6" fill="#7c3aed" opacity="0.28" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY - 55} rx={PLANET_R} ry="11" fill="#3730a3" opacity="0.55" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY - 30} rx={PLANET_R} ry="8" fill="#7c3aed" opacity="0.25" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY - 10} rx={PLANET_R} ry="14" fill="#312e81" opacity="0.5" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY + 18} rx={PLANET_R} ry="13" fill="#4338ca" opacity="0.5" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY + 48} rx={PLANET_R} ry="9" fill="#312e81" opacity="0.6" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY + 75} rx={PLANET_R} ry="11" fill="#3730a3" opacity="0.42" />
        <ellipse cx={PLANET_CX} cy={PLANET_CY + 105} rx={PLANET_R} ry="8" fill="#312e81" opacity="0.5" />
        {/* Cloud swirls (white wisps) */}
        <ellipse cx={PLANET_CX - 40} cy={PLANET_CY - 75} rx="60" ry="4" fill="#e0e7ff" opacity="0.35" />
        <ellipse cx={PLANET_CX + 50} cy={PLANET_CY + 45} rx="55" ry="3" fill="#c7d2fe" opacity="0.3" />
        <ellipse cx={PLANET_CX + 10} cy={PLANET_CY + 95} rx="70" ry="3" fill="#e0e7ff" opacity="0.28" />
        {/* Great spot */}
        <ellipse cx={PLANET_CX - 55} cy={PLANET_CY + 22} rx="36" ry="20" fill="#fbbf24" opacity="0.45" />
        <ellipse cx={PLANET_CX - 55} cy={PLANET_CY + 22} rx="24" ry="13" fill="#f97316" opacity="0.6" />
        <ellipse cx={PLANET_CX - 55} cy={PLANET_CY + 22} rx="12" ry="6" fill="#fef3c7" opacity="0.65" />
      </g>
      {/* Banded turbulence (stretched horizontally) + fine cloud grain */}
      </g>
      <SurfaceTexture id={bandNoise} seed={11} baseFrequency="0.004 0.045" opacity={0.65} />
      <SurfaceTexture id={grainNoise} seed={29} baseFrequency="0.05" octaves={3} opacity={0.3} />
      <LimbDarken id={limb} color="rgba(13,10,61,0.85)" />
      <ShadowSphere id={shadow} />
      <Specular />
    </svg>
  );
};
