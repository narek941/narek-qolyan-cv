"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        let module;
        if (locale === "en") {
          module = await import("@/i18n/messages/en.json");
        } else if (locale === "ru") {
          module = await import("@/i18n/messages/ru.json");
        } else if (locale === "hy") {
          module = await import("@/i18n/messages/hy.json");
        }
        if (module) {
          const messagesData = module.default || module;
          setMessages(messagesData);
        }
      } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        try {
          const fallback = await import("@/i18n/messages/en.json");
          setMessages(fallback.default || fallback);
        } catch (fallbackError) {
          console.error("Failed to load fallback messages", fallbackError);
          setMessages({});
        }
      }
    };
    loadMessages();
  }, [locale]);

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && ["en", "ru", "hy"].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    return typeof value === "string" ? value : key;
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

