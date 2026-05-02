"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { locales, localeNames } from "@/i18n/config";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LanguageSwitcherProps } from "@/types/components.types";
import type { Locale } from "@/i18n/config";

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  ru: "🇷🇺",
  hy: "🇦🇲",
};

export const LanguageSwitcher = ({
  currentLocale,
  onLanguageChange,
}: LanguageSwitcherProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Locale) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  const currentLanguage = localeNames[currentLocale];
  const currentFlag = localeFlags[currentLocale];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all backdrop-blur-md"
        aria-label={t("nav.changeLanguage")}
      >
        <span className="text-base">{currentFlag}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/70 hidden sm:inline">
          {currentLocale}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full mt-4 right-0 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 min-w-[140px] overflow-hidden"
            >
              {locales.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-all ${
                    currentLocale === lang
                      ? "bg-white/10 text-white"
                      : "text-white/50"
                  }`}
                >
                  <span className="text-lg">{localeFlags[lang]}</span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {localeNames[lang]}
                  </span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
