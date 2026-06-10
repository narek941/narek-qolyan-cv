/** Root namespace for project copy in locale files. */
export const PROJECT_I18N_NAMESPACE = "projects" as const;

export const PROJECT_I18N_KEYS = {
  features: "projects.features",
  hideFeatures: "projects.hideFeatures",
  liveDemo: "projects.liveDemo",
  viewGithub: "projects.viewGithub",
  viewNpm: "projects.viewNpm",
  teamProject: "projects.teamProject",
  personalProject: "projects.personalProject",
} as const;

export type ProjectTranslationKey =
  (typeof PROJECT_I18N_KEYS)[keyof typeof PROJECT_I18N_KEYS];

export const getProjectDescriptionTranslationKey = (projectId: string): string =>
  `${PROJECT_I18N_NAMESPACE}.${projectId}.description`;

export const getProjectFeatureTranslationKey = (
  projectId: string,
  featureIndex: number
): string =>
  `${PROJECT_I18N_NAMESPACE}.${projectId}.feature${featureIndex + 1}`;
