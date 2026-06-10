import type { Project } from "@/entities/project/projects.types";

import type { ShowcaseEntry } from "./showcase.const";

export type ProjectKeyFeaturesVariant = "collapsible" | "panel";

export interface ProjectKeyFeaturesProps {
  project: Project;
  variant: ProjectKeyFeaturesVariant;
  className?: string;
}

export interface ProjectFlipCardProps {
  project: Project;
}

export interface ProjectDeviceCardProps {
  entry: ShowcaseEntry;
}
