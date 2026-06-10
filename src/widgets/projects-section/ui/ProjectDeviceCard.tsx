"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Package } from "lucide-react";

import { projects } from "@/entities/project/projects.const";
import {
  PROJECT_I18N_KEYS,
  translateProjectDescription,
} from "@/entities/project/lib";
import { useLanguage } from "@/features/language-switcher/LanguageContext";
import { Iphone } from "@/shared/ui/iphone-frame";
import { MacbookFrame } from "@/shared/ui/macbook-frame";

import {
  PROJECT_CARD_MAX_VISIBLE_TECHNOLOGIES,
  PROJECT_DEVICE_CARD_ANIMATION,
} from "../const";
import { renderDevicePreview } from "../renderDevicePreview";
import type { ProjectDeviceCardProps } from "../types";
import { ProjectKeyFeatures } from "./ProjectKeyFeatures";

export const ProjectDeviceCard = ({ entry }: ProjectDeviceCardProps) => {
  const { t } = useLanguage();
  const project = projects.find((projectItem) => projectItem.id === entry.projectId);

  if (!project) return null;

  const devicePreview = renderDevicePreview(entry.previewId);
  const translatedDescription = translateProjectDescription(
    t,
    project.id,
    project.description
  );

  const visibleTechnologies = project.technologies.slice(
    0,
    PROJECT_CARD_MAX_VISIBLE_TECHNOLOGIES
  );

  const gridColumnClassName =
    entry.device === "macbook" ? "sm:col-span-2" : "sm:col-span-1";

  return (
    <motion.div
      initial={PROJECT_DEVICE_CARD_ANIMATION.initial}
      whileInView={PROJECT_DEVICE_CARD_ANIMATION.whileInView}
      viewport={PROJECT_DEVICE_CARD_ANIMATION.viewport}
      transition={PROJECT_DEVICE_CARD_ANIMATION.transition}
      className={`flex w-full flex-col items-center gap-4 sm:gap-5 ${gridColumnClassName}`}
    >
      {entry.device === "macbook" ? (
        <MacbookFrame
          addressBarText={entry.addressBarText}
          showBrowserChrome={entry.showBrowserChrome ?? true}
          className="w-full max-w-[min(100%,560px)]"
        >
          {devicePreview}
        </MacbookFrame>
      ) : (
        <Iphone
          showHeader
          className="w-full max-w-[min(100%,220px)] drop-shadow-[0_0_40px_rgba(99,102,241,0.25)] sm:max-w-[240px]"
        >
          {devicePreview}
        </Iphone>
      )}

      <div className="w-full max-w-md px-2 text-center sm:px-0">
        <h3 className="font-display text-sm font-bold text-white">{project.name}</h3>
        <p className="mt-1 text-xs font-light text-white/50">{translatedDescription}</p>

        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {visibleTechnologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/55"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-white/60 transition-colors hover:text-white"
            >
              <Github className="h-3 w-3" />
              {t(PROJECT_I18N_KEYS.viewGithub)}
            </a>
          ) : null}
          {project.npm ? (
            <a
              href={project.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-white/60 transition-colors hover:text-white"
            >
              <Package className="h-3 w-3" />
              {t(PROJECT_I18N_KEYS.viewNpm)}
            </a>
          ) : null}
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-black text-black"
            >
              {t(PROJECT_I18N_KEYS.liveDemo)}
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
          <ProjectKeyFeatures project={project} variant="collapsible" />
        </div>
      </div>
    </motion.div>
  );
};
