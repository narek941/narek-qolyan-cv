export interface AsteroidConfig {
  id: string;
  /** Resting position, percent of viewport. */
  topPercent: number;
  leftPercent: number;
  /** Rendered size, px. */
  sizePx: number;
  /** Full drift-loop duration, seconds. Slower = farther away. */
  driftDurationSeconds: number;
  /** Full rotation duration, seconds. */
  spinDurationSeconds: number;
  /** Horizontal drift amplitude, px. */
  driftXPx: number;
  /** Vertical drift amplitude, px. */
  driftYPx: number;
  /** Scroll-parallax depth: how far (vh fraction) it shifts over the page. */
  parallaxStrength: number;
  opacity: number;
  /** Which of the rock silhouettes to use. */
  shapeIndex: 0 | 1 | 2;
}

/**
 * Deterministic belt layout — defined as data, not Math.random, so the
 * server and client render the same markup (no hydration mismatch).
 */
export const ASTEROID_BELT: readonly AsteroidConfig[] = [
  {
    id: "rock-a",
    topPercent: 16,
    leftPercent: 8,
    sizePx: 42,
    driftDurationSeconds: 26,
    spinDurationSeconds: 38,
    driftXPx: 30,
    driftYPx: 18,
    parallaxStrength: 0.5,
    opacity: 0.55,
    shapeIndex: 0,
  },
  {
    id: "rock-b",
    topPercent: 64,
    leftPercent: 84,
    sizePx: 64,
    driftDurationSeconds: 34,
    spinDurationSeconds: 52,
    driftXPx: -42,
    driftYPx: 26,
    parallaxStrength: 0.8,
    opacity: 0.7,
    shapeIndex: 1,
  },
  {
    id: "rock-c",
    topPercent: 38,
    leftPercent: 92,
    sizePx: 26,
    driftDurationSeconds: 20,
    spinDurationSeconds: 24,
    driftXPx: -22,
    driftYPx: -14,
    parallaxStrength: 0.3,
    opacity: 0.4,
    shapeIndex: 2,
  },
  {
    id: "rock-d",
    topPercent: 82,
    leftPercent: 14,
    sizePx: 34,
    driftDurationSeconds: 30,
    spinDurationSeconds: 44,
    driftXPx: 26,
    driftYPx: -20,
    parallaxStrength: 0.65,
    opacity: 0.5,
    shapeIndex: 1,
  },
  {
    id: "rock-e",
    topPercent: 8,
    leftPercent: 72,
    sizePx: 20,
    driftDurationSeconds: 18,
    spinDurationSeconds: 20,
    driftXPx: 16,
    driftYPx: 12,
    parallaxStrength: 0.25,
    opacity: 0.35,
    shapeIndex: 2,
  },
  {
    id: "rock-f",
    topPercent: 50,
    leftPercent: 4,
    sizePx: 52,
    driftDurationSeconds: 40,
    spinDurationSeconds: 60,
    driftXPx: 36,
    driftYPx: 24,
    parallaxStrength: 0.9,
    opacity: 0.6,
    shapeIndex: 0,
  },
];
