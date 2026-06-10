/**
 * Scene wrapper height in viewport units. Pin scroll length =
 * SCENE_HEIGHT_VH - 100vh (the sticky inner is one viewport tall).
 *
 * Keep this small so the planet does not "park" on screen — by the time
 * progress = 1, the planet has finished flying past and the sticky is
 * about to detach. The slide-up that follows shows only deep space.
 */
export const CHAPTER_SCENE_HEIGHT_VH = 118;

/**
 * Keyframes for the scene timeline, expressed as scroll progress in [0, 1].
 * EMERGE → HOLD → FADE. All animation lives in [0, FADE_END]; beyond that
 * the planet is invisible and the sticky releases.
 */
export const CHAPTER_TIMELINE = {
  EMERGE_END: 0.18,
  HOLD_END: 0.45,
  FADE_END: 0.85,
} as const;

