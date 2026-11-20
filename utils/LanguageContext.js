"use client";

import { createContext, useContext, useState, useEffect } from "react";
import translations from "./translations";
import { getBiDictionary } from "./i18n/biDictionary";

const LanguageContext = createContext();

export function LanguageProvider({ children, initialLang = "es" }) {
  const [language, setLanguage] = useState(initialLang === "en" ? "en" : "es");

  useEffect(() => {
    const savedLang = localStorage.getItem("app-language");
    if (savedLang && (savedLang === "en" || savedLang === "es")) {
      setLanguage(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  const switchLanguage = (lang) => {
    if (lang === "en" || lang === "es") {
      setLanguage(lang);
      localStorage.setItem("app-language", lang);
      document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = lang;
    }
  };

  const t = (key, company = null) => {
    const keys = key.split(".");
    let value = translations[language];

    if (company && keys[0] !== "company") {
      const companyKey = `company.${company}.${keys.join(".")}`;
      const companyValue = t(companyKey);
      if (companyValue !== companyKey) {
        return companyValue;
      }
    }

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const getCompanyText = (company, key) => {
    const companyKey = `company.${company}.${key}`;
    return t(companyKey);
  };

  const bi = getBiDictionary(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        isEs: language === "es",
        switchLanguage,
        t,
        getCompanyText,
        bi,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
