"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "@/features/language-switcher/LanguageSwitcher";
import { useLanguage } from "@/features/language-switcher/LanguageContext";
import { BrandLogo } from "@/shared/ui/brand-logo";
import type { NavigationProps } from "@/shared/types/components.types";

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const { locale, setLocale, t } = useLanguage();

  const navItems = [
    { id: "home", label: t("chapters.liftoff.label") },
    { id: "cv", label: t("chapters.origin.label") },
    { id: "skills", label: t("chapters.craft.label") },
    { id: "projects", label: t("chapters.worlds.label") },
    { id: "game", label: t("chapters.play.label") },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

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
      className={`fixed left-1/2 top-2 z-[55] w-[min(94%,720px)] -translate-x-1/2 rounded-full liquid-glass transition-all duration-500 sm:top-3 ${
        scrolled ? "py-1.5" : "py-2"
      }`}
    >
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              aria-label="Go to top"
              className="flex items-center text-white hover:text-white/80 transition-colors"
            >
              <BrandLogo className="h-9 w-auto" />
            </button>
          </div>
          {/* Flow-highlight pill glides between hovered items (NavbarFlow pattern) */}
          <div
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
            onMouseLeave={() => setHoveredItemId(null)}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors duration-300 uppercase tracking-widest ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {(hoveredItemId === item.id ||
                  (hoveredItemId === null && activeSection === item.id)) && (
                  <motion.span
                    layoutId="nav-flow-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white/10"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
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
