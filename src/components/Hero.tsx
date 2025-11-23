"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code, Smartphone, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { HeroProps } from "@/types/components.types";

export const Hero = ({ onGetStarted }: HeroProps) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 text-center relative z-10 pt-20 sm:pt-0 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 shadow-lg flex-wrap justify-center"
          >
            <Code className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" />
            <span className="whitespace-nowrap">{t("hero.badge.react")}</span>
            <span className="text-gray-400">•</span>
            <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" />
            <span className="whitespace-nowrap">
              {t("hero.badge.reactNative")}
            </span>
            <span className="text-gray-400">•</span>
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" />
            <span className="whitespace-nowrap">
              {t("hero.badge.fullStack")}
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 break-words px-2">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              {t("hero.title")}{" "}
            </span>
            <span className="bg-gradient-to-r from-primary-600 via-blue-600 to-primary-600 dark:from-primary-400 dark:via-blue-400 dark:to-primary-400 bg-clip-text text-transparent">
              Narek Kolyan
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 font-medium"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed ${
              t("cv.bio").length < 200 ? "text-lg" : "text-base"
            }`}
          >
            {t("cv.bio")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t("hero.viewCv")}
              <ArrowDown className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("projects");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t("hero.seeProjects")}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-6 h-6 text-gray-400 animate-bounce" />
      </motion.div>
    </div>
  );
};
