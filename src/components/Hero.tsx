"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code, Smartphone, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { HeroProps } from "@/types/components.types";

export const Hero = ({ onGetStarted }: HeroProps) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Expo-style vibrant radial gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-white/80 mb-8 shadow-2xl"
          >
            <div className="flex -space-x-2 mr-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center border-2 border-black">
                <Code className="w-3 h-3 text-white" />
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center border-2 border-black">
                <Smartphone className="w-3 h-3 text-white" />
              </div>
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center border-2 border-black">
                <Zap className="w-3 h-3 text-white" />
              </div>
            </div>
            <span>{t("hero.badge.react")}</span>
            <span className="text-white/20">•</span>
            <span>{t("hero.badge.reactNative")}</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[1.1] tracking-tight">
            <span className="block text-white">
              {t("hero.title")}
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent italic">
              Narek Kolyan
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl text-white/60 mb-10 font-light tracking-wide max-w-4xl mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg shadow-2xl hover:shadow-white/10 transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
              {t("hero.viewCv")}
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const element = document.getElementById("projects");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300"
            >
              {t("hero.seeProjects")}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </div>
  );
};
