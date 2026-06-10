import { cn } from "@/shared/lib/cn";

import { KEY_FEATURES_LIST_VARIANT } from "../const";
import type { KeyFeaturesCollapsibleProps } from "../types";
import { KeyFeatureList } from "./KeyFeatureList";
import { KeyFeaturesToggleButton } from "./KeyFeaturesToggleButton";

export const KeyFeaturesCollapsible = ({
  isOpen,
  showFeaturesLabel,
  hideFeaturesLabel,
  featureLabels,
  onToggle,
  className,
}: KeyFeaturesCollapsibleProps) => (
  <div className={cn(className)}>
    <KeyFeaturesToggleButton
      isOpen={isOpen}
      showFeaturesLabel={showFeaturesLabel}
      hideFeaturesLabel={hideFeaturesLabel}
      onToggle={onToggle}
    />
    {isOpen ? (
      <KeyFeatureList
        featureLabels={featureLabels}
        variant={KEY_FEATURES_LIST_VARIANT.compact}
      />
    ) : null}
  </div>
);
