import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Language, siteCopy } from "@/lib/siteCopy";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: (typeof siteCopy)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "rosa-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es" || stored === "de") {
    return stored;
  }

  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith("es")) {
    return "es";
  }
  if (browserLanguage.startsWith("de")) {
    return "de";
  }

  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      copy: siteCopy[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

