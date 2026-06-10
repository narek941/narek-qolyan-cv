"use client";

import { motion } from "framer-motion";

import { projects } from "@/entities/project/projects.const";

import { showcasedProjectIds, SHOWCASE_ENTRIES } from "./showcase.const";
import { ProjectDeviceCard } from "./ui/ProjectDeviceCard";
import { ProjectFlipCard } from "./ui/ProjectFlipCard";

export const ProjectsShowcase = () => {
  const remainingProjects = projects.filter(
    (project) => !showcasedProjectIds.has(project.id)
  );

  return (
    <div className="relative overflow-x-hidden">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-0 sm:px-2">
        <div className="grid grid-cols-1 items-end gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-y-12">
          {SHOWCASE_ENTRIES.map((showcaseEntry) => (
            <ProjectDeviceCard key={showcaseEntry.id} entry={showcaseEntry} />
          ))}
        </div>

        {remainingProjects.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {remainingProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    },
                  },
                }}
              >
                <ProjectFlipCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};
