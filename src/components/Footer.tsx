"use client";

import { cvData } from "@/constants/cv.const";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Narek Kolyan</h3>
            <p className="text-gray-400">{t("footer.description")}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="#cv" className="hover:text-white transition-colors">
                  {t("nav.cv")}
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-white transition-colors"
                >
                  {t("nav.skills")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-white transition-colors"
                >
                  {t("nav.projects")}
                </a>
              </li>
              <li>
                <a href="#game" className="hover:text-white transition-colors">
                  {t("nav.game")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.connect")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href={cvData.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t("cv.github")}
                </a>
              </li>
              <li>
                <a
                  href={cvData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t("cv.linkedin")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${cvData.personalInfo.email}`}
                  className="hover:text-white transition-colors"
                >
                  {cvData.personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${cvData.personalInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {cvData.personalInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Narek Kolyan. {t("footer.rights")}
            .
          </p>
        </div>
      </div>
    </footer>
  );
};
