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
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        aria-label={t("nav.changeLanguage")}
      >
        <Languages className="w-4 h-4" />
        <span className="text-lg">{currentFlag}</span>
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage}
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 min-w-[150px]"
            >
              {locales.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    currentLocale === lang
                      ? "bg-primary-50 dark:bg-primary-900/20"
                      : ""
                  }`}
                >
                  <span className="text-lg">{localeFlags[lang]}</span>
                  <span className="text-sm font-medium">
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
