"use client";

import { motion, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

import type { PlanetVariant } from "@/shared/ui/planet";
import { useScrollScene } from "@/shared/lib/hooks";
import { formatChapterIndex } from "@/shared/lib/format";

import { SceneBackground } from "./ui/SceneBackground";
import { PlanetLayer } from "./ui/PlanetLayer";
import { SceneTextStack } from "./ui/SceneTextStack";
import { CHAPTER_SCENE_HEIGHT_VH } from "./const";

interface ChapterSceneProps {
  id: string;
  index: number;
  total: number;
  chapterLabel: string;
  title: string;
  subtitle?: string;
  planet: { variant: PlanetVariant; hue: string };
  children: ReactNode;
}

export const ChapterScene = ({
  id,
  index,
  total,
  chapterLabel,
  title,
  subtitle,
  planet,
  children,
}: ChapterSceneProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { progress: sceneProgress } = useScrollScene(sceneRef);

  const planetScale = useTransform(sceneProgress, [0, 0.2, 0.5, 0.92], [0.65, 1, 1.04, 1.45]);
  const planetOpacity = useTransform(sceneProgress, [0, 0.14, 0.5, 0.92], [0.5, 1, 1, 0]);
  const planetDriftX = useTransform(sceneProgress, [0, 0.5, 1], ["12%", "0%", "-32%"]);
  const planetDriftY = useTransform(sceneProgress, [0, 0.5, 1], ["10%", "0%", "-20%"]);
  const planetSpin = useTransform(sceneProgress, [0, 1], [-6, 28]);

  const labelOpacity = useTransform(sceneProgress, [0, 0.1, 0.5, 0.62], [0.55, 1, 1, 0]);
  const labelY = useTransform(sceneProgress, [0, 0.1, 0.5, 0.62], [12, 0, 0, -16]);

  const titleOpacity = useTransform(sceneProgress, [0, 0.16, 0.5, 0.68], [0.3, 1, 1, 0]);
  const titleScale = useTransform(sceneProgress, [0, 0.16, 0.5, 0.92], [0.9, 1, 1, 1.1]);
  const titleY = useTransform(sceneProgress, [0, 0.16, 0.5, 0.68], [28, 0, 0, -24]);

  const subtitleOpacity = useTransform(sceneProgress, [0.1, 0.24, 0.5, 0.6], [0, 1, 1, 0]);
  const subtitleY = useTransform(sceneProgress, [0.1, 0.24], [16, 0]);

  const backgroundGlowOpacity = useTransform(sceneProgress, [0, 0.25, 0.5, 0.92], [0.12, 0.45, 0.35, 0]);

  return (
    <section id={id} className="relative">
      <div
        ref={sceneRef}
        className="relative"
        style={{ height: `${CHAPTER_SCENE_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <SceneBackground opacity={backgroundGlowOpacity} hue={planet.hue} />
          <PlanetLayer
            variant={planet.variant}
            scale={planetScale}
            opacity={planetOpacity}
            driftX={planetDriftX}
            driftY={planetDriftY}
            spin={planetSpin}
          />
          <SceneTextStack
            chapterLabel={chapterLabel}
            indexLabel={formatChapterIndex(index, total)}
            title={title}
            subtitle={subtitle}
            labelOpacity={labelOpacity}
            labelY={labelY}
            titleOpacity={titleOpacity}
            titleScale={titleScale}
            titleY={titleY}
            subOpacity={subtitleOpacity}
            subY={subtitleY}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 mx-auto w-full max-w-7xl -mt-[24vh] px-4 pb-10 sm:-mt-[32vh] sm:px-6 sm:pb-12 md:-mt-[36vh] lg:-mt-[40vh] lg:px-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

export type { ChapterSceneProps };
