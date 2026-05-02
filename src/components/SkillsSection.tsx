"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cvData } from "@/constants/cv.const";
import { useLanguage } from "@/contexts/LanguageContext";

const getSkillCategories = (t: (key: string) => string) => [
  {
    title: t("skills.frontend"),
    skills: cvData.skills.frontend,
    icon: (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: t("skills.mobile"),
    skills: cvData.skills.mobile,
    icon: (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
        />
      </svg>
    ),
    color: "from-purple-500 to-pink-500",
  },
  {
    title: t("skills.backend"),
    skills: cvData.skills.backend,
    icon: (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V6m3 3a3 3 0 003-3M18.75 9.75a3 3 0 003 3m-3-3a3 3 0 00-3 3m3-3h.008M8.25 9.75h.008M12 12.75h.008M15.75 9.75h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "from-green-500 to-emerald-500",
  },
  {
    title: t("skills.ecommerce"),
    skills: cvData.skills.ecommerce,
    icon: (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218m1.5-13.5H21.75a2.25 2.25 0 012.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 18.75V5.25A2.25 2.25 0 012.25 3z"
        />
      </svg>
    ),
    color: "from-orange-500 to-red-500",
  },
  {
    title: t("skills.tools"),
    skills: cvData.skills.tools,
    icon: (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 010-3.586L11.42 2.83a2.548 2.548 0 013.586 0l4.655 5.653a2.548 2.548 0 010 3.586l-5.877 5.877"
        />
      </svg>
    ),
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: t("skills.other"),
    skills: cvData.skills.other,
    icon: (
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
    color: "from-pink-500 to-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const SkillsSection = () => {
  const { t, locale } = useLanguage();
  const skillCategories = useMemo(() => getSkillCategories(t), [t]);

  return (
    <div className="min-h-screen pt-32 py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-x-hidden relative">
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          key={`${locale}-title`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-6xl font-black mb-6 text-white tracking-tight">
            {t("skills.title")}
          </h2>
          <p className="text-lg sm:text-2xl text-white/40 max-w-2xl mx-auto font-light">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <motion.div
          key={locale}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={`${locale}-${category.title}-${index}`}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-8 h-full transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/80 shadow-2xl">
                <div className="flex items-center gap-5 mb-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500`}
                  >
                    <div className="w-7 h-7">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white/5 text-white/70 rounded-full text-xs font-bold tracking-widest uppercase border border-white/5 transition-all hover:bg-white/10 hover:text-white cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
