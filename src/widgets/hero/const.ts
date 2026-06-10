/**
 * Hero is one viewport taller than a normal chapter scene so the
 * intro can reveal multiple stacked elements (chip, title, subtitle,
 * badges, CTA) in sequence before fading out.
 */
export const HERO_SCENE_HEIGHT_VH = 115;

export const HERO_TIMELINE = {
  EMERGE_END: 0.18,
  HOLD_END: 0.42,
  FADE_END: 0.85,
} as const;

