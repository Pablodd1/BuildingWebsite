'use client';
import { Download, BookOpen } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';

export default function CatalogFloatingBtn() {
    const { language } = useLanguage();
    const isSpanish = language === 'es';

    const labels = {
        download: isSpanish ? 'Descargar' : 'Download',
        catalog: isSpanish ? 'Catálogo' : 'Catalog',
    };

    return (
        <div className="flex flex-col items-start gap-4 z-50">
            <a
                href="/catalogs/USA_Catalog.pdf"
                download
                className="group flex items-center gap-2 px-4 py-2.5 rounded-r-full shadow-lg transition-all duration-300 bg-primary text-black hover:bg-black hover:text-white hover:pr-6"
            >
                <div className="p-1.5 rounded-full bg-black/10 group-hover:bg-white/20 transition-colors">
                    <Download size={16} />
                </div>
                <div className="flex flex-col items-start text-left">
                    <span className="font-bold uppercase tracking-widest text-[9px] leading-tight opacity-80">{labels.download}</span>
                    <span className="font-bold text-xs leading-tight">{labels.catalog}</span>
                </div>
            </a>
        </div>
    );
}