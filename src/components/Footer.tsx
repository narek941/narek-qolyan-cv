"use client";

import { cvData } from "@/constants/cv.const";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black mb-6 tracking-tighter">NK<span className="text-blue-500">.</span></h3>
            <p className="text-white/40 text-lg leading-relaxed max-w-sm">{t("footer.description")}</p>
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
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/20 mb-8">{t("footer.connect")}</h4>
            <ul className="space-y-4">
              <li>
                <a href={cvData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                  Github
                </a>
              </li>
              <li>
                <a href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${cvData.personalInfo.email}`} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                  {cvData.personalInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-medium tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Narek Kolyan. {t("footer.rights")}.
          </p>
          <div className="flex gap-6">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white/60 transition-all cursor-pointer">
              <span className="text-[10px] font-bold">NK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
