"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import { PROJECT_I18N_KEYS, translateProjectDescription } from "@/entities/project/lib";
import { useLanguage } from "@/features/language-switcher/LanguageContext";
import { CardFlip } from "@/shared/ui/card-flip";

import {
  PROJECT_CARD_MAX_VISIBLE_TECHNOLOGIES,
  PROJECT_FLIP_CARD_MIN_HEIGHT_CLASS_NAME,
} from "../const";
import type { ProjectFlipCardProps } from "../types";
import { ProjectKeyFeatures } from "./ProjectKeyFeatures";
import { ProjectTypeIcon } from "./ProjectTypeIcon";

export const ProjectFlipCard = ({ project }: ProjectFlipCardProps) => {
  const { t } = useLanguage();

  const translatedDescription = translateProjectDescription(
    t,
    project.id,
    project.description
  );

  const visibleTechnologies = project.technologies.slice(
    0,
    PROJECT_CARD_MAX_VISIBLE_TECHNOLOGIES
  );
  const overflowTechnologyCount =
    project.technologies.length - PROJECT_CARD_MAX_VISIBLE_TECHNOLOGIES;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <CardFlip className={`h-full ${PROJECT_FLIP_CARD_MIN_HEIGHT_CLASS_NAME}`}>
        <div className="liquid-glass group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8">
          <div className="absolute inset-0 bg-dots opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]" />
          <div className="relative z-10 mb-6 flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-2xl transition-transform duration-500 group-hover:scale-110">
              <ProjectTypeIcon projectType={project.type} />
            </div>
            {project.teamProject !== undefined ? (
              <span className="mr-10 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                {project.teamProject
                  ? t(PROJECT_I18N_KEYS.teamProject)
                  : t(PROJECT_I18N_KEYS.personalProject)}
              </span>
            ) : null}
          </div>

          <h3 className="mb-4 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
            {project.name}
          </h3>

          <p className="mb-6 flex-grow font-light leading-relaxed text-white/50">
            {translatedDescription}
          </p>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {visibleTechnologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60"
                >
                  {technology}
                </span>
              ))}
              {overflowTechnologyCount > 0 ? (
                <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  +{overflowTechnologyCount}
                </span>
              ) : null}
            </div>

            <div className="relative z-10 flex gap-3 border-t border-white/5 pt-4">
              {project.github ? (
                <motion.a
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/60 transition-all hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              ) : null}
              {project.link ? (
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: "#60a5fa" }}
                  whileTap={{ scale: 0.95 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black tracking-tighter text-black transition-all"
                >
                  {t(PROJECT_I18N_KEYS.liveDemo)}
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="liquid-glass-strong relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8">
          <ProjectKeyFeatures project={project} variant="panel" />
        </div>
      </CardFlip>
    </motion.div>
  );
};
