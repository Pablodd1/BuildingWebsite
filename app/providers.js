"use client";

import { LanguageProvider } from "lib/LanguageContext";
import { BrandProvider } from "lib/BrandContext";

export default function Providers({ children, lang = "es" }) {
    return (
        <BrandProvider>
            <LanguageProvider initialLang={lang}>
                {children}
            </LanguageProvider>
        </BrandProvider>
    );
}
