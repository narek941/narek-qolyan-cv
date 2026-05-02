"use client";

import { projects } from "@/constants/projects.const";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProjectCardProps } from "@/types/components.types";
import { motion } from "framer-motion";
import { ExternalLink, Github, Package } from "lucide-react";

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  const getStatusBadge = () => {
    const statusConfig = {
      production:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      development:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      published:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    };
    return statusConfig[project.status];
  };

  const getTypeIcon = () => {
    const icons = {
      web: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A9 9 0 0112 21m-7.843-13.418A9 9 0 0112 3m7.843 13.418A9 9 0 0012 21"
          />
        </svg>
      ),
      mobile: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      ),
      cli: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
      library: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      ),
    };
    return icons[project.type];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-zinc-900/50 backdrop-blur-sm rounded-[2.5rem] p-8 hover:bg-zinc-900/80 transition-all duration-500 border border-white/5 hover:border-white/20 shadow-2xl group flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
          {getTypeIcon()}
        </div>
        {project.teamProject !== undefined && (
          <span className="px-3 py-1 bg-white/5 text-white/40 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/5">
            {project.teamProject
              ? t("projects.teamProject")
              : t("projects.personalProject")}
          </span>
        )}
      </div>

      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
        {project.name}
      </h3>

      <p className="text-white/50 mb-8 font-light leading-relaxed flex-grow">
        {t(`projects.${project.id}.description`)}
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/5 text-white/60 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
               <span className="px-3 py-1 bg-white/5 text-white/30 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/5">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/5">
          {project.github && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/5"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          )}
          {project.link && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm font-black tracking-tighter hover:bg-blue-400 transition-all"
            >
              {t("projects.liveDemo")}
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsShowcase = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-32 py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-x-hidden relative">
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-6xl font-black mb-6 text-white tracking-tight">
            {t("projects.title")}
          </h2>
          <p className="text-lg sm:text-2xl text-white/40 max-w-2xl mx-auto font-light">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
