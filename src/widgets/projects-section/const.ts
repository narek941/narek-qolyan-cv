/** Max technology badges shown on project cards before a "+N" overflow pill. */
export const PROJECT_CARD_MAX_VISIBLE_TECHNOLOGIES = 4;

export const PROJECT_DEVICE_CARD_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
} as const;

export const PROJECT_FLIP_CARD_MIN_HEIGHT_CLASS_NAME = "min-h-[360px]";
