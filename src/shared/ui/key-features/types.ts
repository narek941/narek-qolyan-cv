import type { KeyFeaturesListVariant } from "./const";

export interface KeyFeatureListProps {
  featureLabels: string[];
  variant?: KeyFeaturesListVariant;
  className?: string;
}

export interface KeyFeaturesHeadingProps {
  headingLabel: string;
  className?: string;
}

export interface KeyFeaturesToggleButtonProps {
  isOpen: boolean;
  showFeaturesLabel: string;
  hideFeaturesLabel: string;
  onToggle: () => void;
  className?: string;
}

export interface KeyFeaturesPanelProps {
  headingLabel: string;
  featureLabels: string[];
  showHeading?: boolean;
  className?: string;
}

export interface KeyFeaturesCollapsibleProps {
  isOpen: boolean;
  showFeaturesLabel: string;
  hideFeaturesLabel: string;
  featureLabels: string[];
  onToggle: () => void;
  className?: string;
}
