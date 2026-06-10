"use client";

import { PLANET_CX, PLANET_CY, PLANET_R } from "./types";

/** Atmospheric halo extending past the body. */
export const Atmosphere = ({ id, color }: { id: string; color: string }) => (
  <>
    <defs>
      <radialGradient id={id} cx="50%" cy="50%" r="50%">
        <stop offset="62%" stopColor={color} stopOpacity="0" />
        <stop offset="82%" stopColor={color} stopOpacity="0.65" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R + 90} fill={`url(#${id})`} />
  </>
);

/** Spherical day/night shadow + limb darkening. */
export const ShadowSphere = ({ id }: { id: string }) => (
  <>
    <defs>
      <radialGradient id={id} cx="35%" cy="30%" r="95%">
        <stop offset="0%" stopColor="black" stopOpacity="0" />
        <stop offset="55%" stopColor="black" stopOpacity="0" />
        <stop offset="100%" stopColor="black" stopOpacity="0.78" />
      </radialGradient>
    </defs>
    <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R} fill={`url(#${id})`} />
  </>
);

/** Subtle limb darkening — adds atmospheric edge to give a 3D feel. */
export const LimbDarken = ({ id, color = "rgba(0,0,0,0.4)" }: { id: string; color?: string }) => (
  <>
    <defs>
      <radialGradient id={id} cx="50%" cy="50%" r="50%">
        <stop offset="78%" stopColor="black" stopOpacity="0" />
        <stop offset="100%" stopColor={color} stopOpacity="1" />
      </radialGradient>
    </defs>
    <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R} fill={`url(#${id})`} />
  </>
);

/** Specular highlight — the sun glint on the body. */
export const Specular = () => (
  <ellipse
    cx={PLANET_CX - PLANET_R * 0.4}
    cy={PLANET_CY - PLANET_R * 0.45}
    rx={PLANET_R * 0.22}
    ry={PLANET_R * 0.11}
    fill="white"
    opacity="0.32"
  />
);

/** Reusable circular clip path. */
export const PlanetClip = ({ id }: { id: string }) => (
  <defs>
    <clipPath id={id}>
      <circle cx={PLANET_CX} cy={PLANET_CY} r={PLANET_R} />
    </clipPath>
  </defs>
);

interface SwirlFilterProps {
  id: string;
  seed?: number;
  /** Noise frequency driving the distortion field. */
  baseFrequency?: string;
  /** Displacement strength, px. Higher = wilder swirls. */
  scale?: number;
}

/**
 * Turbulence-driven displacement filter. Wrap a group of flat band
 * ellipses or continent paths with `filter={url(#id)}` and their edges
 * warp into organic swirls — the difference between cartoon stripes and
 * a Jupiter-like atmosphere.
 */
export const SwirlFilter = ({
  id,
  seed = 3,
  baseFrequency = "0.012 0.03",
  scale = 16,
}: SwirlFilterProps) => (
  <defs>
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency={baseFrequency}
        numOctaves={3}
        seed={seed}
        result="swirl"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="swirl"
        scale={scale}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>
);

interface SurfaceTextureProps {
  id: string;
  /** feTurbulence seed — vary per planet so surfaces differ. */
  seed: number;
  /**
   * Noise frequency. A single number gives isotropic granulation
   * (rocky worlds); "xFreq yFreq" with x ≪ y gives horizontally
   * stretched streaks (gas-giant banding).
   */
  baseFrequency: string;
  octaves?: number;
  opacity?: number;
}

/**
 * Fractal-noise surface texture clipped to the planet disc.
 * Blended soft-light over the body gradient, it reads as terrain
 * mottling / cloud granulation instead of a flat cartoon fill.
 */
export const SurfaceTexture = ({
  id,
  seed,
  baseFrequency,
  octaves = 4,
  opacity = 0.55,
}: SurfaceTextureProps) => (
  <>
    <defs>
      <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves={octaves}
          seed={seed}
          stitchTiles="stitch"
        />
        {/* Map noise luminance to alpha on a black fill = dark mottling */}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.9 0.9 0.9 0 0"
        />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </defs>
    <circle
      cx={PLANET_CX}
      cy={PLANET_CY}
      r={PLANET_R}
      fill="black"
      filter={`url(#${id})`}
      opacity={opacity}
      style={{ mixBlendMode: "soft-light" }}
    />
  </>
);
