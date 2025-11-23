import type { ReactNode } from "react";
import type { Project } from "./projects.types";
import type { Locale } from "@/i18n/config";

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
  icon: ReactNode;
  flipped: boolean;
  matched: boolean;
}

