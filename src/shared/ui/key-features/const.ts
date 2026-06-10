export const KEY_FEATURES_LIST_VARIANT = {
  compact: "compact",
  default: "default",
} as const;

export type KeyFeaturesListVariant =
  (typeof KEY_FEATURES_LIST_VARIANT)[keyof typeof KEY_FEATURES_LIST_VARIANT];

export const KEY_FEATURES_LIST_CLASS_NAMES: Record<KeyFeaturesListVariant, string> = {
  [KEY_FEATURES_LIST_VARIANT.compact]:
    "mt-3 max-h-36 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left",
  [KEY_FEATURES_LIST_VARIANT.default]: "space-y-3 overflow-y-auto pr-2",
};

export const KEY_FEATURES_ITEM_CLASS_NAMES: Record<KeyFeaturesListVariant, string> = {
  [KEY_FEATURES_LIST_VARIANT.compact]:
    "flex items-start gap-2 text-xs font-light text-white/65",
  [KEY_FEATURES_LIST_VARIANT.default]:
    "flex items-start gap-3 text-sm font-light text-white/70",
};

export const KEY_FEATURES_BULLET_CLASS_NAME =
  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400";

export const KEY_FEATURES_TOGGLE_BUTTON_CLASS_NAME =
  "inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold text-indigo-300/90 transition-colors hover:border-indigo-400/30";
