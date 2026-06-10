import type { TranslationKey } from "@/shared/i18n-messages/types";

import {
  getProjectDescriptionTranslationKey,
  getProjectFeatureTranslationKey,
} from "./project-i18n.const";

/** Accepts static locale keys and runtime-built project keys. */
export type TranslateFunction = (translationKey: TranslationKey | string) => string;

export const translateWithFallback = (
  translate: TranslateFunction,
  translationKey: TranslationKey | string,
  fallback: string
): string => {
  const translated = translate(translationKey);
  return translated === translationKey ? fallback : translated;
};

export const translateProjectDescription = (
  translate: TranslateFunction,
  projectId: string,
  fallbackDescription: string
): string =>
  translateWithFallback(
    translate,
    getProjectDescriptionTranslationKey(projectId),
    fallbackDescription
  );

export const translateProjectFeatures = (
  translate: TranslateFunction,
  projectId: string,
  features: string[]
): string[] =>
  features.map((feature, featureIndex) =>
    translateWithFallback(
      translate,
      getProjectFeatureTranslationKey(projectId, featureIndex),
      feature
    )
  );
