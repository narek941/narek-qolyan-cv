import type { PlanetVariant } from "./types";

/**
 * Optional photographic planet textures.
 *
 * To swap a procedural SVG planet for a real image:
 *   1. Drop a square PNG/WebP with transparent corners (the planet disc
 *      filling the frame) into `public/planets/`, e.g. `public/planets/mars.png`.
 *   2. Register it here: `"mars-orange": "/planets/mars.png"`.
 *
 * Registered variants render the image with the same shading overlays
 * (terminator shadow + specular) so they sit in the scene consistently.
 * Unregistered variants keep the procedural SVG.
 */
export const PLANET_IMAGE_SOURCES: Partial<Record<PlanetVariant, string>> = {};
