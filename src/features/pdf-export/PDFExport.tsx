"use client";

import { useLanguage } from "@/features/language-switcher/LanguageContext";
import { Download } from "lucide-react";

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
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" as const },
      pagebreak: { mode: "avoid-all" as const },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <button
      onClick={handleExportPDF}
      className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-black text-sm tracking-tighter shadow-2xl hover:bg-blue-400 transition-all hover:scale-105"
    >
      <Download className="w-4 h-4" />
      {t("cv.exportPdf")}
    </button>
  );
};
