export type PlanetVariant =
  | "gas-indigo"
  | "ringed-magenta"
  | "ice-cyan"
  | "mars-orange"
  | "forest-green";

export interface PlanetSvgProps {
  /** Produces a collision-free SVG id by namespacing the given suffix. */
  namespaceId: (suffix: string) => string;
  className?: string;
}

export const PLANET_VB = 600;
export const PLANET_CX = 300;
export const PLANET_CY = 300;
export const PLANET_R = 180;

export const PLANET_SVG_BASE = {
  viewBox: `0 0 ${PLANET_VB} ${PLANET_VB}`,
  xmlns: "http://www.w3.org/2000/svg" as const,
  style: { overflow: "visible" as const },
};
