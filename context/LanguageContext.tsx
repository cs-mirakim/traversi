"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import bmLocale from "@/locales/bm.json";
import enLocale from "@/locales/en.json";

type LocaleType = "bm" | "en";

interface LanguageContextType {
  locale: LocaleType;
  setLocale: (lang: LocaleType) => void;
  toggleLocale: () => void;
  t: (keyPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleType>("en");

  useEffect(() => {
    const saved = localStorage.getItem("traversi_locale") as LocaleType;
    if (saved === "bm" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (lang: LocaleType) => {
    setLocaleState(lang);
    localStorage.setItem("traversi_locale", lang);
  };

  const toggleLocale = () => {
    const next = locale === "bm" ? "en" : "bm";
    setLocale(next);
  };

  const currentDict = locale === "bm" ? bmLocale : enLocale;

  const t = (keyPath: string): string => {
    const keys = keyPath.split(".");
    let current: any = currentDict;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return keyPath;
      }
    }
    return typeof current === "string" ? current : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
