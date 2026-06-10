import type { ComponentType } from "react";
import type { Project } from "@/entities/project/projects.types";
import type { Locale } from "@/shared/i18n-messages/config";

export interface HeroProps {
  onGetStarted: () => void;
}

export interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLanguageChange: (lang: Locale) => void;
}

export interface ProjectCardProps {
  project: Project;
}

export interface Card {
  id: number;
  value: string;
  Icon: ComponentType<{ className?: string }>;
  flipped: boolean;
  matched: boolean;
}

