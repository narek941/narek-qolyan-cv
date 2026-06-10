import { cn } from "@/shared/lib/cn";

import {
  KEY_FEATURES_BULLET_CLASS_NAME,
  KEY_FEATURES_ITEM_CLASS_NAMES,
  KEY_FEATURES_LIST_CLASS_NAMES,
  KEY_FEATURES_LIST_VARIANT,
} from "../const";
import type { KeyFeatureListProps } from "../types";

export const KeyFeatureList = ({
  featureLabels,
  variant = KEY_FEATURES_LIST_VARIANT.default,
  className,
}: KeyFeatureListProps) => (
  <ul
    data-lenis-prevent={variant === KEY_FEATURES_LIST_VARIANT.compact || undefined}
    className={cn(KEY_FEATURES_LIST_CLASS_NAMES[variant], className)}
  >
    {featureLabels.map((featureLabel, featureIndex) => (
      <li
        key={`${featureLabel}-${featureIndex}`}
        className={KEY_FEATURES_ITEM_CLASS_NAMES[variant]}
      >
        <span className={KEY_FEATURES_BULLET_CLASS_NAME} />
        {featureLabel}
      </li>
    ))}
  </ul>
);
