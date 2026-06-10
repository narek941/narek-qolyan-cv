"use client";

import { CornerReticles } from "./ui/CornerReticles";
import { PortholeVignette } from "./ui/PortholeVignette";

/** Subtle viewport framing — no scroll HUD overlays. */
export const Cockpit = () => (
  <>
    <PortholeVignette />
    <CornerReticles />
  </>
);
