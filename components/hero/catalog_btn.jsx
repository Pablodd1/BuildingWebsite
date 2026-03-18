'use client';
import { useState } from 'react';
import { Download, BookOpen, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from 'lib/LanguageContext';

export default function CatalogFloatingBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const { language } = useLanguage();
    const isSpanish = language === 'es';

    const labels = {
        selectCatalog: isSpanish ? 'Seleccionar Catálogo' : 'Select Catalog',
        download: isSpanish ? 'Descargar' : 'Download',
        catalogs: isSpanish ? 'Catálogos' : 'Catalogs',
        usaTitle: isSpanish ? 'Catálogo USA' : 'USA Catalog',
        latamTitle: isSpanish ? 'Catálogo LATAM' : 'LATAM Catalog',
    };

    return (
        <div className="flex flex-col items-start gap-4 z-50">
            {/* Modal / Options */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 w-56 mb-2 ml-4 relative origin-bottom-left"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={14} />
                        </button>

                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                            <BookOpen size={14} className="text-primary" />
                            {labels.selectCatalog}
                        </h3>

                        <div className="space-y-2">
                            <a
                                href="/catalogs/USA_Catalog.pdf"
                                download
                                className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-black hover:text-white transition-all group"
                            >
                                <div className="bg-white text-black p-1.5 rounded-md shadow-sm group-hover:bg-gray-800 group-hover:text-white">
                                    <FileText size={14} />
                                </div>
                                <div>
                                    <span className="block font-bold text-xs">{labels.usaTitle}</span>
                                    <span className="text-[10px] text-gray-500 group-hover:text-gray-400">English (Imperial)</span>
                                </div>
                                <Download size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <a
                                href="/catalogs/LATAM_Catalog.pdf"
                                download
                                className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-black hover:text-white transition-all group"
                            >
                                <div className="bg-white text-black p-1.5 rounded-md shadow-sm group-hover:bg-gray-800 group-hover:text-white">
                                    <FileText size={14} />
                                </div>
                                <div>
                                    <span className="block font-bold text-xs">{labels.latamTitle}</span>
                                    <span className="text-[10px] text-gray-500 group-hover:text-gray-400">Español (Metric)</span>
                                </div>
                                <Download size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    group flex items-center gap-2 px-4 py-2.5 rounded-r-full shadow-lg transition-all duration-300
                    ${isOpen ? 'bg-black text-white pr-6' : 'bg-primary text-black hover:bg-black hover:text-white hover:pr-6'}
                `}
            >
                <div className={`p-1.5 rounded-full ${isOpen ? 'bg-white/20' : 'bg-black/10'} group-hover:bg-white/20 transition-colors`}>
                    {isOpen ? <X size={16} /> : <BookOpen size={16} />}
                </div>
                <div className="flex flex-col items-start text-left">
                    <span className="font-bold uppercase tracking-widest text-[9px] leading-tight opacity-80">{labels.download}</span>
                    <span className="font-bold text-xs leading-tight">{labels.catalogs}</span>
                </div>
            </button>
        </div>
    );
}
