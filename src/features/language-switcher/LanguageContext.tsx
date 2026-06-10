"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Locale } from "@/shared/i18n-messages/config";
import { defaultLocale } from "@/shared/i18n-messages/config";
import enMessages from "@/shared/i18n-messages/en.json";
import type { Messages, TranslationKey } from "@/shared/i18n-messages/types";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (translationKey: TranslationKey | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dynamicLoaders: Record<Exclude<Locale, "en">, () => Promise<{ default: Messages }>> = {
  ru: () => import("@/shared/i18n-messages/ru.json"),
  hy: () => import("@/shared/i18n-messages/hy.json"),
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // English is statically imported so SSR + first paint already have content.
  // No more "chapters.liftoff.label" flashing on screen.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Messages>(enMessages);

  useEffect(() => {
    if (locale === "en") {
      setMessages(enMessages);
      return;
    }
    let cancelled = false;
    dynamicLoaders[locale]()
      .then((mod) => {
        if (!cancelled) setMessages(mod.default);
      })
      .catch((err) => {
        console.error(`Failed to load messages for locale: ${locale}`, err);
        if (!cancelled) setMessages(enMessages);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Restore persisted locale once on client.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("locale") as Locale | null;
    if (saved && (["en", "ru", "hy"] as Locale[]).includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", next);
    }
  };

  const t = (translationKey: TranslationKey | string): string => {
    const segments = translationKey.split(".");
    let cursor: unknown = messages;

    for (const segment of segments) {
      if (
        typeof cursor !== "object" ||
        cursor === null ||
        !Object.prototype.hasOwnProperty.call(cursor, segment)
      ) {
        return translationKey;
      }
      cursor = (cursor as Record<string, unknown>)[segment];
    }

    return typeof cursor === "string" ? cursor : translationKey;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
