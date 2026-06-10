"use client";

import { useMemo } from "react";
import { cvData } from "@/entities/cv/cv.const";
import { useLanguage } from "@/features/language-switcher/LanguageContext";
import { BentoGrid, BentoGridItem } from "@/shared/ui/bento-grid";
import { Marquee } from "@/shared/ui/marquee";

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

/** Bento spans — first two categories get the wide cells. */
const BENTO_SPANS = [
  "md:col-span-2",
  "",
  "",
  "",
  "",
  "md:col-span-2",
];

export const SkillsSection = () => {
  const { t, locale } = useLanguage();
  const skillCategories = useMemo(() => getSkillCategories(t), [t]);

  const allSkills = useMemo(() => {
    const flat = skillCategories.flatMap((category) => category.skills);
    return [...new Set(flat)];
  }, [skillCategories]);

  return (
    <div className="relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Full tech-stack marquee (ScrollX UI flowing-logos pattern) */}
        <div className="mb-10 h-14">
          <Marquee duration="40s" key={`marquee-${locale}`}>
            {allSkills.map((skill, skillIndex) => (
              <span
                key={`${skill}-${skillIndex}`}
                className="liquid-glass flex items-center shrink-0 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors"
              >
                {skill}
              </span>
            ))}
          </Marquee>
        </div>

        <BentoGrid key={locale} className="md:auto-rows-auto">
          {skillCategories.map((category, categoryIndex) => (
            <BentoGridItem
              key={`${locale}-${category.title}`}
              containerClassName={BENTO_SPANS[categoryIndex]}
              icon={
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-2xl`}
                >
                  <div className="w-6 h-6">{category.icon}</div>
                </div>
              }
              title={category.title}
              description={
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={`${skill}-${skillIndex}`}
                      className="px-3 py-1.5 bg-white/5 text-white/70 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/5 transition-all hover:bg-white/10 hover:text-white cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              }
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};
