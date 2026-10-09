"use client";

import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { getGroupedTechnicalSheets, getCatalogsByLanguage } from 'utils/catalogsData';
import { useLanguage } from 'lib/LanguageContext';

const CatalogDropdown = () => {
    const { language } = useLanguage();
    const isSpanish = language === 'es';
    const groupedSheets = getGroupedTechnicalSheets();
    const activeCatalogs = getCatalogsByLanguage(isSpanish ? 'Español' : 'English');

    return (
            <div className="absolute left-0 top-full pt-2 w-[850px] max-w-[calc(100vw-2rem)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
            <div className="bg-white/98 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl border border-gray-100 overflow-hidden">
                
                {/* Header */}
                <div className="bg-gray-50/80 px-6 py-3 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span className="text-gray-900 font-black text-[10px] uppercase tracking-[0.2em]">
                            {isSpanish ? 'Catálogos y Fichas Técnicas' : 'Catalogs & Technical Sheets'}
                        </span>
                    </div>
                </div>

                <div className="flex divide-x divide-gray-100 max-h-[500px] overflow-y-auto">
                 {/* Catalogs Section */}
                 <div className="w-[250px] shrink-0 p-5 bg-gray-50/50">
                     <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">
                         {isSpanish ? 'Catálogos' : 'Catalogs'}
                     </h4>
                     <div className="flex flex-col gap-3">
                         {activeCatalogs.map(catalog => (
                             <a
                                 key={catalog.id}
                                 href={catalog.url}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5 transition-all group/catalog"
                             >
                                 <FileText className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0 group-hover/catalog:scale-110 transition-transform" />
                                 <div className="flex flex-col">
                                     <span className="text-[10px] font-bold text-gray-900 leading-snug group-hover/catalog:text-emerald-700 transition-colors">
                                         {catalog.name}
                                     </span>
                                     <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase tracking-wider">
                                         {catalog.company}
                                     </span>
                                 </div>
                             </a>
                         ))}
                         </div>
                     </div>

                 {/* Technical Sheets Section */}
                 <div className="flex-1 p-5 bg-white">
                         <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                             {Object.entries(groupedSheets).map(([category, sheets]) => (
                                 <div key={category} className="group/item">
                                     <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1.5 border-b border-gray-100 pb-1">
                                         {category}
                                     </h4>
                                     <div className="flex flex-col gap-1 mt-2">
                                         {sheets.map(sheet => (
                                             <a
                                                 key={sheet.id}
                                                 href={sheet.url}
                                                 target="_blank"
                                                 rel="noopener noreferrer"
                                                 className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-50 transition-colors group/sheet"
                                             >
                                                 <ChevronRight className="w-3 h-3 text-gray-600 group-hover/sheet:text-emerald-600 flex-shrink-0" />
                                                 <span className="text-[9px] font-bold text-gray-600 group-hover/sheet:text-gray-900 truncate uppercase transition-all">
                                                     {sheet.name.replace(/^[\d\.]+_FT_/, '').replace(/_/g, ' ')}
                                                 </span>
                                             </a>
                                         ))}
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-950 py-2 px-6 flex justify-between items-center">
                    <span className="text-white/40 text-[8px] font-black uppercase tracking-widest">
                        UNITEC USA Design © 2026
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CatalogDropdown;
