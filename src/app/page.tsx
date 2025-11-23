"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CVSection } from "@/components/CVSection";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { SkillsSection } from "@/components/SkillsSection";
import { GameSection } from "@/components/GameSection";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const { locale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "cv", "skills", "projects", "game"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      <section id="home">
        <Hero onGetStarted={() => scrollToSection("cv")} />
      </section>
      <section id="cv">
        <CVSection />
      </section>
      <section id="skills">
        <SkillsSection key={locale} />
      </section>
      <section id="projects">
        <ProjectsShowcase />
      </section>
      <section id="game">
        <GameSection />
      </section>
      <Footer />
    </main>
  );
}
