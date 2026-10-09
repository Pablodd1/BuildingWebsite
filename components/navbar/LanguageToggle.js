"use client";

import { useLanguage } from "lib/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
    const { language, switchLanguage } = useLanguage();

    const handleLanguageSwitch = () => {
        const newLang = language === "en" ? "es" : "en";
        switchLanguage(newLang);
    };

    return (
        <button
            onClick={handleLanguageSwitch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors ml-4 text-sm font-medium text-white"
            aria-label="Toggle Language"
        >
            <Globe size={16} />
            <span>{language === "en" ? "A" : "文"}</span>
            <span className="uppercase">{language}</span>
        </button>
    );
}
