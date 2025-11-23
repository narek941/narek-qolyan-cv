"use client";

import { Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const PDFExport = () => {
  const { t } = useLanguage();

  const handleExportPDF = async () => {
    const element = document.querySelector(
      ".pdf-export-content"
    ) as HTMLElement;
    if (!element) return;

    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: 0,
      filename: "Narek_Kolyan_CV.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        removeContainer: true,
        letterRendering: true,
        fontFamily: "Arial, sans-serif",
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" as const },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button
      onClick={handleExportPDF}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <Download className="w-5 h-5" />
      {t("cv.exportPdf")}
    </button>
  );
};
