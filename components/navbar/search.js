"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";

export default function SearchFrom({ full = false, query: initialQuery }) {
    const { t } = useLanguage();
    const [query, setQuery] = useState(initialQuery || "");
    const router = useRouter();
    const inputRef = useRef(null);

    const handleSearch = () => {
        const q = query.trim();
        if (q) {
            router.push(`/collections/search?q=${encodeURIComponent(q)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    const clearSearch = () => {
        setQuery("");
        inputRef.current?.focus();
    };

    if (full) {
        return (
            <div className="relative w-full max-w-2xl mx-auto my-10 px-4">
                <div className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border-2 border-white/30 bg-white/95 backdrop-blur-sm transition-all focus-within:border-blue-400 focus-within:shadow-blue-200">
                    <Search className="absolute left-4 w-5 h-5 text-gray-600 pointer-events-none" />
                    <input
                        ref={inputRef}
                        type="search"
                        inputMode="search"
                        enterKeyHint="search"
                        autoComplete="off"
                        autoFocus={full}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t("search.placeholder")}
                        className="w-full bg-transparent py-4 pl-12 pr-28 text-base text-gray-800 placeholder:text-gray-600 focus:outline-none"
                    />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-24 p-1 text-gray-600 hover:text-gray-600 transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={handleSearch}
                        className="absolute right-0 h-full px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold uppercase tracking-widest transition-colors"
                    >
                        {t("search.searchBtn")}
                    </button>
                </div>
                <p className="text-center text-white/70 text-xs mt-2">
                    {t("search.trySearching")}: PVC, WPC, Pisos SPC, Paredes, Cubiertas…
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
            <input
                ref={inputRef}
                type="search"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("search.placeholder")}
                className="w-full bg-slate-800/80 border border-slate-700 focus:border-white rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder:text-white focus:outline-none transition-all"
            />
        </div>
    );
}
