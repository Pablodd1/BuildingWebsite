'use client';
import Stylish_H2 from 'My_UI/stylish_h2';
import { Download, Eye, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from 'lib/LanguageContext';
import translations from 'lib/translations';

const CatalogCard = ({ title, description, image, fileUrl, showBadge, tag, t }) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300">
            {/* Cover Image Placeholder */}
            <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                {image ? (
                    <Image src={image} alt={title} fill className="object-cover" />
                ) : (
                    <div className="text-gray-300 flex flex-col items-center gap-2">
                        <BookOpen size={48} />
                        <span className="text-xs uppercase tracking-widest font-bold">Catalog Preview</span>
                    </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-primary transition-colors">
                        <Eye size={18} /> {t.view || 'View'}
                    </a>
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary opacity-60">
                        {tag || t.catalogTag}
                    </span>
                    {showBadge && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full border border-yellow-200">
                            2024
                        </span>
                    )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-1">
                    {description}
                </p>

                <a
                    href={fileUrl}
                    download
                    className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-medium hover:bg-secondary transition-colors text-sm"
                >
                    <Download size={18} /> {t.download || 'Download PDF'}
                </a>
            </div>
        </div>
    );
};

export default function Catalogs_UI() {
    const { language } = useLanguage();
    const t = translations[language]?.catalogs || translations.en.catalogs;

    return (
        <div className="max-w-7xl mx-auto px-6 py-20 min-h-[60vh]">
            <Stylish_H2 h2={t.title} />
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-sm">
                {t.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <CatalogCard
                    title={t.usaTitle}
                    description={t.usaDesc}
                    fileUrl="/catalogs/USA_Catalog.pdf"
                    showBadge={true}
                    t={t}
                />

                <CatalogCard
                    title={t.latamTitle}
                    description={t.latamDesc}
                    fileUrl="/catalogs/LATAM_Catalog.pdf"
                    showBadge={true}
                    t={t}
                />
            </div>
        </div>
    );
}
