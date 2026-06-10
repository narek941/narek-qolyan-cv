"use client";

import dynamic from "next/dynamic";
import { Github, Linkedin, Mail } from "lucide-react";

import { cvData } from "@/entities/cv/cv.const";
import { useLanguage } from "@/features/language-switcher/LanguageContext";
import { BrandLogo } from "@/shared/ui/brand-logo";
import { RadialSocials } from "@/shared/ui/radial-socials";

/** d3 + topojson load lazily, only when the footer scrolls into view. */
const GlobeWireframe = dynamic(
  () => import("@/shared/ui/globe-wireframe/GlobeWireframe"),
  { ssr: false }
);

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer
      className="relative overflow-hidden border-t border-white/5 bg-black px-4 py-12 text-white sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10 grid gap-8 md:grid-cols-4 md:gap-10">
          <div className="md:col-span-2">
            <BrandLogo className="h-16 w-auto mb-6" />
            <p className="text-white/40 text-lg leading-relaxed max-w-sm mb-8">{t("footer.description")}</p>
            {/* Wireframe Earth — remote from anywhere (ScrollX UI globe) */}
            <div className="max-w-[220px] text-indigo-300/70">
              <GlobeWireframe
                className="aspect-square w-full"
                autoRotate
                autoRotateSpeed={0.4}
                strokeColor="currentColor"
                graticuleOpacity={0.15}
                enableInteraction
              />
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/20 mb-8">{t("footer.quickLinks")}</h4>
            <ul className="space-y-4">
              {["home", "cv", "skills", "projects", "game"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {t(`nav.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/20 mb-4">{t("footer.connect")}</h4>
            {/* Social satellites in orbit (ScrollX UI radial-socials) */}
            <RadialSocials
              className="mx-auto"
              orbits={[
                {
                  radiusPx: 64,
                  durationSeconds: 28,
                  items: [
                    {
                      icon: <Github className="h-4 w-4" />,
                      href: cvData.personalInfo.github,
                      label: "GitHub",
                    },
                    {
                      icon: <Linkedin className="h-4 w-4" />,
                      href: cvData.personalInfo.linkedin,
                      label: "LinkedIn",
                    },
                    {
                      icon: <Mail className="h-4 w-4" />,
                      href: `mailto:${cvData.personalInfo.email}`,
                      label: "Email",
                    },
                  ],
                },
              ]}
            >
              <BrandLogo className="h-6 w-auto opacity-80" />
            </RadialSocials>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-medium tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Narek Kolyan. {t("footer.rights")}.
          </p>
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 transition-all">
              <BrandLogo className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
