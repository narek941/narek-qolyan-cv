"use client";

import { motion, useTransform } from "framer-motion";
import { ArrowDown, Code, Smartphone } from "lucide-react";
import { useRef } from "react";

import { useLanguage } from "@/features/language-switcher/LanguageContext";
import { useScrollScene } from "@/shared/lib/hooks";
import type { HeroProps } from "@/shared/types/components.types";

import { HERO_SCENE_HEIGHT_VH } from "./const";

export const Hero = ({ onGetStarted }: HeroProps) => {
  const { t } = useLanguage();
  const sceneRef = useRef<HTMLDivElement>(null);
  const { progress: sceneProgress } = useScrollScene(sceneRef);

  // Single opacity + translate group — no scroll-driven blur (GPU-heavy).
  const contentOpacity = useTransform(sceneProgress, [0, 0.32, 0.52], [1, 1, 0]);
  const contentY = useTransform(sceneProgress, [0.32, 0.52], [0, -28]);
  const scrollCueOpacity = useTransform(sceneProgress, [0, 0.14], [1, 0]);

  const handleSeeProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sceneRef}
      className="relative"
      style={{ height: `${HERO_SCENE_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative z-20 flex h-full w-full items-center justify-center px-4 pt-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: contentOpacity, y: contentY }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-indigo-300/90">
              Senior Frontend Engineer
            </p>

            <h1 className="font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              <span className="block">{t("hero.title")}</span>
              <span className="mt-1 block text-indigo-200">Narek Kolyan</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base font-normal leading-relaxed text-white/72 sm:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {[
                { icon: Code, label: t("hero.badge.react") },
                { icon: Smartphone, label: t("hero.badge.reactNative") },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75"
                >
                  <Icon className="h-3.5 w-3.5 text-indigo-300/90" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0a0a12] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("hero.viewCv")}
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleSeeProjects}
                className="inline-flex items-center rounded-full border border-white/18 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:bg-white/[0.08]"
              >
                {t("hero.seeProjects")}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:bottom-14"
          aria-hidden
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em]">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
