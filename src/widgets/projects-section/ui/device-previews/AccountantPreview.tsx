"use client";

import { useState } from "react";
import {
  Building2,
  Calculator,
  FileSpreadsheet,
  Globe,
  Landmark,
  Users,
} from "lucide-react";

type Lang = "en" | "ru" | "hy";

const LANG_LABELS: Record<Lang, string> = { en: "EN", ru: "RU", hy: "HY" };

const HERO_COPY: Record<Lang, string> = {
  en: "Your reliable partner in tax and business — quality accounting services since 2019.",
  ru: "Надёжный партнёр в налоговой сфере и бизнесе — бухгалтерские услуги с 2019 года.",
  hy: "Հուսալի գործընկեր հարկային և բիզնես դաշտում — հաշվապահական ծառայություններ 2019-ից։",
};

const SERVICES = [
  {
    id: "accounting",
    icon: Calculator,
    title: "Accounting services",
    detail: "Tax & financial reporting, IFRS-aligned bookkeeping, automation with accounting software.",
  },
  {
    id: "reporting",
    icon: FileSpreadsheet,
    title: "Reporting",
    detail: "Preparation of documents for business negotiations per Armenian legislation.",
  },
  {
    id: "tax",
    icon: Landmark,
    title: "Tax planning",
    detail: "Organization activity analysis, tax regime selection, compliance advisory.",
  },
  {
    id: "hr",
    icon: Users,
    title: "Human resources",
    detail: "Payroll, HR documentation, and workforce compliance support.",
  },
  {
    id: "advice",
    icon: Building2,
    title: "Business advice",
    detail: "Consulting on company registration, restructuring, and growth strategy.",
  },
];

const BRAND_BLUE = "#243b98";

/**
 * ACC Accountant marketing site — from github.com/narek941/accountant.
 * Light particle backdrop, glass hero card, services grid, canvas-style inquiry form.
 */
export const AccountantPreview = () => {
  const [lang, setLang] = useState<Lang>("en");
  const [activeService, setActiveService] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const cycleLang = () =>
    setLang((current) =>
      current === "en" ? "ru" : current === "ru" ? "hy" : "en"
    );

  const handleFormSubmit = () => {
    setFormSent(true);
    window.setTimeout(() => {
      setFormSent(false);
      setFormOpen(false);
    }, 1400);
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#fbfafa] text-[#000]">
      {/* Particle mesh — static CSS stand-in for tsparticles */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${BRAND_BLUE}22 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, ${BRAND_BLUE}18 0%, transparent 40%),
            linear-gradient(${BRAND_BLUE}15 1px, transparent 1px),
            linear-gradient(90deg, ${BRAND_BLUE}15 1px, transparent 1px)
          `,
          backgroundSize: "auto, auto, 28px 28px, 28px 28px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-black/5 bg-white px-3 py-1.5 shadow-sm">
        <div className="flex items-center gap-1">
          <span
            className="font-display text-[8px] font-black tracking-tight"
            style={{ color: BRAND_BLUE }}
          >
            Fin
          </span>
          <span className="text-[7px] font-semibold text-black/70">Partners</span>
        </div>
        <nav className="hidden items-center gap-0.5 sm:flex">
          {["Partner", "Careers", "About"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFormOpen(true)}
              className="px-1.5 py-0.5 text-[6.5px] font-medium transition-colors hover:text-black"
              style={{ color: BRAND_BLUE }}
            >
              {item}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={cycleLang}
          className="flex items-center gap-0.5 rounded border border-black/10 bg-white px-1.5 py-0.5 text-[6px] font-bold"
          style={{ color: BRAND_BLUE }}
        >
          <Globe className="h-2 w-2" />
          {LANG_LABELS[lang]}
        </button>
      </header>

      <div
        data-lenis-prevent
        className="relative z-10 flex flex-1 flex-col gap-2 overflow-y-auto p-2"
      >
        {/* Hero glass card */}
        <div className="rounded-lg border border-white/80 bg-white/70 px-3 py-2.5 shadow-[0_4px_24px_rgba(36,59,152,0.12)] backdrop-blur-sm">
          <p className="text-center text-[7px] leading-relaxed text-black/80">
            {HERO_COPY[lang]}
          </p>
          <div className="mt-2 flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="text-[7px] font-semibold underline-offset-2 hover:underline"
              style={{ color: BRAND_BLUE }}
            >
              Become a partner
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="text-[7px] font-semibold underline-offset-2 hover:underline"
              style={{ color: BRAND_BLUE }}
            >
              Become an accountant
            </button>
          </div>
        </div>

        {/* Services */}
        <div>
          <h2
            className="mb-1.5 text-center text-[9px] font-bold"
            style={{ color: BRAND_BLUE }}
          >
            Services
          </h2>
          <div className="grid grid-cols-3 gap-1 sm:grid-cols-5">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() =>
                    setActiveService(isActive ? null : service.id)
                  }
                  className={`relative flex min-h-[52px] flex-col items-center justify-center rounded-md border bg-white/80 p-1.5 shadow-sm transition-all ${
                    isActive
                      ? "border-[#243b98]/40 ring-1 ring-[#243b98]/25"
                      : "border-black/5 hover:border-[#243b98]/25"
                  }`}
                >
                  <Icon
                    className="mb-0.5 h-3 w-3"
                    style={{ color: BRAND_BLUE }}
                  />
                  <span className="text-center text-[5.5px] font-medium leading-tight text-black/75">
                    {service.title}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-full z-20 mb-0.5 rounded border border-black/8 bg-white p-1 text-[5px] leading-snug text-black/70 shadow-md">
                      {service.detail}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Canvas-style inquiry overlay */}
      {formOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/25 p-3 backdrop-blur-[2px]">
          <div className="w-full max-w-[200px] rounded-lg border border-white/60 bg-white/95 p-2.5 shadow-xl">
            <p className="text-[8px] font-bold" style={{ color: BRAND_BLUE }}>
              Request a consultation
            </p>
            <p className="mt-0.5 text-[6px] text-black/50">
              Form-to-email · canvas overlay
            </p>
            <input
              readOnly
              value="company@example.am"
              className="mt-2 w-full rounded border border-black/10 px-1.5 py-1 text-[6px] text-black/70"
            />
            <textarea
              readOnly
              value="Interested in accounting services…"
              rows={2}
              className="mt-1 w-full resize-none rounded border border-black/10 px-1.5 py-1 text-[6px] text-black/70"
            />
            <div className="mt-2 flex gap-1">
              <button
                type="button"
                onClick={handleFormSubmit}
                className="flex-1 rounded px-2 py-1 text-[6px] font-bold text-white"
                style={{ background: BRAND_BLUE }}
              >
                {formSent ? "✓ Sent" : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded border border-black/10 px-2 py-1 text-[6px] text-black/55"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
