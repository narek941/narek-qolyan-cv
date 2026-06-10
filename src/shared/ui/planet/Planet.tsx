"use client";

import { useId } from "react";
import type { PlanetVariant } from "./types";
import { PLANET_IMAGE_SOURCES } from "./planet-images.const";
import { PhotoPlanet } from "./PhotoPlanet";
import { GasIndigo } from "./variants/GasIndigo";
import { RingedMagenta } from "./variants/RingedMagenta";
import { IceCyan } from "./variants/IceCyan";
import { MarsOrange } from "./variants/MarsOrange";
import { ForestGreen } from "./variants/ForestGreen";

interface PlanetProps {
  variant: PlanetVariant;
  className?: string;
}

const sanitizeReactId = (rawReactId: string): string => rawReactId.replace(/:/g, "");

/**
 * Thin dispatcher — renders a registered photographic texture when one
 * exists for the variant, otherwise the procedural SVG.
 */
export const Planet = ({ variant, className }: PlanetProps) => {
  const rawReactId = useId();
  const idNamespace = sanitizeReactId(rawReactId);
  const namespaceId = (suffix: string): string => `${idNamespace}-${suffix}`;

  const photoSource = PLANET_IMAGE_SOURCES[variant];
  if (photoSource) {
    return <PhotoPlanet src={photoSource} className={className} />;
  }

  switch (variant) {
    case "gas-indigo":
      return <GasIndigo namespaceId={namespaceId} className={className} />;
    case "ringed-magenta":
      return <RingedMagenta namespaceId={namespaceId} className={className} />;
    case "ice-cyan":
      return <IceCyan namespaceId={namespaceId} className={className} />;
    case "mars-orange":
      return <MarsOrange namespaceId={namespaceId} className={className} />;
    case "forest-green":
      return <ForestGreen namespaceId={namespaceId} className={className} />;
  }
};

export type { PlanetVariant } from "./types";
