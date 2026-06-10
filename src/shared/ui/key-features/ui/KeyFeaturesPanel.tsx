import { KEY_FEATURES_LIST_VARIANT } from "../const";
import type { KeyFeaturesPanelProps } from "../types";
import { KeyFeatureList } from "./KeyFeatureList";
import { KeyFeaturesHeading } from "./KeyFeaturesHeading";

export const KeyFeaturesPanel = ({
  headingLabel,
  featureLabels,
  showHeading = true,
  className,
}: KeyFeaturesPanelProps) => (
  <div className={className}>
    {showHeading ? <KeyFeaturesHeading headingLabel={headingLabel} /> : null}
    <KeyFeatureList
      featureLabels={featureLabels}
      variant={KEY_FEATURES_LIST_VARIANT.default}
    />
  </div>
);
