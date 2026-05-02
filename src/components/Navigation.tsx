"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import type { NavigationProps } from "@/types/components.types";

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const { locale, setLocale, t } = useLanguage();

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "cv", label: t("nav.cv") },
    { id: "skills", label: t("nav.skills") },
    { id: "projects", label: t("nav.projects") },
    { id: "game", label: t("nav.game") },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-4xl rounded-full border border-white/10 ${
        scrolled
          ? "bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="px-6">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick("home")}
              className="text-xl font-black text-white tracking-tighter"
            >
              NK<span className="text-blue-500">.</span>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-widest ${
                  activeSection === item.id
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2" />
            <LanguageSwitcher
              currentLocale={locale}
              onLanguageChange={setLocale}
            />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher
              currentLocale={locale}
              onLanguageChange={setLocale}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-50 md:hidden overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-6 py-4 rounded-2xl text-left font-bold tracking-widest uppercase text-xs transition-all ${
                      activeSection === item.id
                        ? "text-white bg-white/10"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
