"use client";

import type { ReactNode } from "react";

import { Navigation } from "@/widgets/navigation";
import { Hero } from "@/widgets/hero";
import { CVSection } from "@/widgets/cv-section";
import { ProjectsShowcase } from "@/widgets/projects-section";
import { SkillsSection } from "@/widgets/skills-section";
import { GameSection } from "@/widgets/game-section";
import { Footer } from "@/widgets/footer";
import { CosmicBackground } from "@/widgets/cosmic-background";
import { ChapterScene } from "@/widgets/chapter-scene";
import { Cockpit } from "@/widgets/cockpit";

import { useLanguage } from "@/features/language-switcher/LanguageContext";
import { useActiveSection } from "@/shared/lib/hooks";
import { CHAPTERS, CHAPTER_IDS } from "@/shared/constants/chapters.const";
import type { Locale } from "@/shared/i18n-messages/config";
import type { ChapterDef, ChapterSectionId } from "@/shared/types/chapter.types";
import { BootLoader } from "@/shared/ui/boot-loader";

type SectionRenderer = (locale: Locale) => ReactNode;

const sectionRenderers: Record<ChapterSectionId, SectionRenderer> = {
  cv: () => <CVSection />,
  skills: (locale) => <SkillsSection key={locale} />,
  projects: () => <ProjectsShowcase />,
  game: () => <GameSection />,
};

export default function Home() {
  const { locale, t } = useLanguage();
  const { activeSection, scrollToSection } = useActiveSection(CHAPTER_IDS);

  const journeyChapters = CHAPTERS.filter(
    (chapter): chapter is ChapterDef & { id: ChapterSectionId } =>
      chapter.id !== "home"
  );

  return (
    <>
      <BootLoader />
      <CosmicBackground />
      <Cockpit />
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="relative min-h-screen overflow-x-hidden">
        <Hero onGetStarted={() => scrollToSection("cv")} />

        {journeyChapters.map((chapter, chapterIndex) => {
          const renderSection = sectionRenderers[chapter.id];

          return (
            <ChapterScene
              key={chapter.id}
              id={chapter.id}
              index={chapterIndex + 1}
              total={CHAPTERS.length - 1}
              chapterLabel={t(`${chapter.i18nKey}.label`)}
              title={t(`${chapter.i18nKey}.title`)}
              subtitle={t(`${chapter.i18nKey}.subtitle`)}
              planet={{ variant: chapter.planetVariant, hue: chapter.hue }}
            >
              {renderSection(locale)}
            </ChapterScene>
          );
        })}

        <Footer />
      </main>
    </>
  );
}
