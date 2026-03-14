"use client";

import React from 'react';
import { FileText, Download, ChevronRight } from 'lucide-react';
import { catalogs, getGroupedTechnicalSheets } from 'utils/catalogsData';
import { useLanguage } from 'lib/LanguageContext';

const CatalogDropdown = () => {
    const { language } = useLanguage();
    const isSpanish = language === 'es';
    const groupedSheets = getGroupedTechnicalSheets();

    const englishCatalogs = catalogs.filter(c => c.language === 'English');
    const spanishCatalogs = catalogs.filter(c => c.language === 'Español');

    return (
        <div className="absolute left-0 top-full pt-2 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
            <div className="bg-white/98 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl border border-gray-100 overflow-hidden">
                
                {/* Header */}
                <div className="bg-gray-50/80 px-6 py-3 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900 font-black text-[10px] uppercase tracking-[0.2em]">
                            {isSpanish ? 'Catálogos y Fichas Técnicas' : 'Catalogs & Technical Sheets'}
                        </span>
                    </div>
                </div>

                <div className="flex divide-x divide-gray-100 max-h-[500px] overflow-y-auto">
                    {/* Catalogs Section */}
                    <div className="flex-1 p-5 bg-white">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
                                {isSpanish ? 'CATÁLOGOS' : 'CATALOGS'}
                            </h3>
                        </div>

                        {/* Spanish Catalogs */}
                        <div className="mb-4">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                Español
                            </h4>
                            <div className="space-y-1">
                                {spanishCatalogs.map(cat => (
                                    <a
                                        key={cat.id}
                                        href={cat.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group/cat"
                                    >
                                        <span className="text-xs font-medium text-gray-700 group-hover/cat:text-blue-600 truncate">
                                            {cat.name}
                                        </span>
                                        <Download className="w-3 h-3 text-gray-400 group-hover/cat:text-blue-600 flex-shrink-0" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* English Catalogs */}
                        <div>
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                                English
                            </h4>
                            <div className="space-y-1">
                                {englishCatalogs.map(cat => (
                                    <a
                                        key={cat.id}
                                        href={cat.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group/cat"
                                    >
                                        <span className="text-xs font-medium text-gray-700 group-hover/cat:text-blue-600 truncate">
                                            {cat.name}
                                        </span>
                                        <Download className="w-3 h-3 text-gray-400 group-hover/cat:text-blue-600 flex-shrink-0" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Technical Sheets Section */}
                    <div className="flex-1 p-5 bg-gray-50/30">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-4 h-4 text-emerald-600" />
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
                                {isSpanish ? 'FICHAS TÉCNICAS' : 'TECHNICAL SHEETS'}
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {Object.entries(groupedSheets).map(([category, sheets]) => (
                                <div key={category}>
                                    <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                                        {category}
                                    </h4>
                                    <div className="space-y-0.5">
                                        {sheets.slice(0, 4).map(sheet => (
                                            <a
                                                key={sheet.id}
                                                href={sheet.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-white transition-colors group/sheet"
                                            >
                                                <ChevronRight className="w-3 h-3 text-gray-400 group-hover/sheet:text-emerald-600 flex-shrink-0" />
                                                <span className="text-[9px] font-medium text-gray-600 group-hover/sheet:text-gray-900 truncate">
                                                    {sheet.subcategory}
                                                </span>
                                            </a>
                                        ))}
                                        {sheets.length > 4 && (
                                            <span className="text-[8px] text-gray-400 pl-5">
                                                +{sheets.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-950 py-2 px-6 flex justify-between items-center">
                    <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">
                        Building Innovation © 2026
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CatalogDropdown;
