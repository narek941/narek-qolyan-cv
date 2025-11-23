"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cvData } from "@/constants/cv.const";
import { PDFExport } from "./PDFExport";
import { PDFExportContent } from "./PDFExportContent";
import { useLanguage } from "@/contexts/LanguageContext";

export const CVSection = () => {
  const cvRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 sm:pt-20 py-12 sm:py-20 px-3 sm:px-4 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8 sm:mb-12 flex-col sm:flex-row gap-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400 bg-clip-text text-transparent break-words">
            {t("cv.title")}
          </h2>
          <PDFExport />
        </motion.div>

        <div className="hidden">
          <PDFExportContent />
        </div>

        <motion.div
          ref={cvRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-slate-700"
        >
          <div className="text-center mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {cvData.personalInfo.name}
            </h1>
            <p className="text-xl text-primary-600 dark:text-primary-400 mb-4">
              {cvData.personalInfo.title}
            </p>
            <p
              className={`text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto ${
                t("cv.bio").length < 100 ? "text-base" : "text-sm"
              }`}
            >
              {t("cv.bio")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{cvData.personalInfo.location}</span>
              <span>•</span>
              <a
                href={`mailto:${cvData.personalInfo.email}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {cvData.personalInfo.email}
              </a>
              <span>•</span>
              <a
                href={`tel:${cvData.personalInfo.phone.replace(/\s/g, "")}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {cvData.personalInfo.phone}
              </a>
              <span>•</span>
              <a
                href={cvData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t("cv.linkedin")}
              </a>
              <span>•</span>
              <a
                href={cvData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {t("cv.github")}
              </a>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("cv.professionalSummary")}
            </h3>
            <p
              className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
                t("cv.professionalSummaryText").length < 200
                  ? "text-base"
                  : "text-sm"
              }`}
            >
              {t("cv.professionalSummaryText")}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("cv.skills")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-2 text-primary-600 dark:text-primary-400">
                  {t("cv.frontend")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.frontend.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-primary-600 dark:text-primary-400">
                  {t("cv.backend")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.backend.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("cv.experience")}
            </h3>
            {cvData.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.position}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-primary-600 dark:text-primary-400">
                        {exp.company}
                      </p>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={t("cv.visitWebsite").replace(
                            "{company}",
                            exp.company
                          )}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                    {exp.company === "ShellLogix" && (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic mt-1">
                        {t("cv.shelllogix.description")}
                      </p>
                    )}
                    {exp.company === "Opta Sports (by Stats Perform)" && (
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic mt-1">
                        {t("cv.opta.description")}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.location}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  {exp.company === "ShellLogix" && (
                    <>
                      <li>{t("cv.shelllogix.work1")}</li>
                      <li>{t("cv.shelllogix.work2")}</li>
                      <li>{t("cv.shelllogix.work3")}</li>
                      <li>{t("cv.shelllogix.work4")}</li>
                    </>
                  )}
                  {exp.company === "Opta Sports (by Stats Perform)" && (
                    <>
                      <li>{t("cv.opta.work1")}</li>
                      <li>{t("cv.opta.work2")}</li>
                      <li>{t("cv.opta.work3")}</li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t("cv.education")}
            </h3>
            {cvData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t("cv.education.degree")}
                </h4>
                <p className="text-primary-600 dark:text-primary-400">
                  {t("cv.education.institution")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.period}, {edu.location}
                </p>
                {edu.note && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-1">
                    {t("cv.education.coursework")}
                  </p>
                )}
              </div>
            ))}
          </div>

          {cvData.languages && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t("cv.languages")}
              </h3>
              <div className="space-y-3">
                {cvData.languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {lang.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t(`cv.languages.${lang.name.toLowerCase()}`)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cvData.additionalInfo && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {t("cv.additionalInfo")}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>{t("cv.additionalInfo1")}</li>
                <li>{t("cv.additionalInfo2")}</li>
                <li>{t("cv.additionalInfo3")}</li>
                <li>{t("cv.additionalInfo4")}</li>
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
