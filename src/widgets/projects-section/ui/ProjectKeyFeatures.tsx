"use client";

import { useMemo, useState } from "react";

import {
  PROJECT_I18N_KEYS,
  translateProjectFeatures,
} from "@/entities/project/lib";
import { useLanguage } from "@/features/language-switcher/LanguageContext";
import {
  KeyFeaturesCollapsible,
  KeyFeaturesPanel,
} from "@/shared/ui/key-features";

import type { ProjectKeyFeaturesProps } from "../types";

export const ProjectKeyFeatures = ({
  project,
  variant,
  className,
}: ProjectKeyFeaturesProps) => {
  const { t } = useLanguage();
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const translatedFeatureLabels = useMemo(
    () => translateProjectFeatures(t, project.id, project.features),
    [t, project.id, project.features]
  );

  if (variant === "collapsible") {
    return (
      <KeyFeaturesCollapsible
        className={className}
        isOpen={isFeaturesOpen}
        showFeaturesLabel={t(PROJECT_I18N_KEYS.features)}
        hideFeaturesLabel={t(PROJECT_I18N_KEYS.hideFeatures)}
        featureLabels={translatedFeatureLabels}
        onToggle={() => setIsFeaturesOpen((previousOpen) => !previousOpen)}
      />
    );
  }

  return (
    <KeyFeaturesPanel
      className={className}
      headingLabel={t(PROJECT_I18N_KEYS.features)}
      featureLabels={translatedFeatureLabels}
    />
  );
};
