"use client";

import React from 'react';
import { ShieldCheck, Eye, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';

export default function QualityPage() {
    const { t, getCompanyText } = useLanguage();
    const { activeBrand } = useBrand();
    
    const companyKey = activeBrand === 'unitec' ? 'unitec' : 'binw';
    const qualityTitle = getCompanyText(companyKey, 'quality.title');
    const qualityQuote = getCompanyText(companyKey, 'quality.quote');
    const qualityIntro = getCompanyText(companyKey, 'quality.intro');
    const qualityClosing = getCompanyText(companyKey, 'quality.closing');
    
    return (
        <main className="w-full">
            {/* Hero Section */}
            <section 
                className="bg-cover bg-center bg-no-repeat relative py-24 text-white"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/raster/containers.webp)' }}
            >
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider">
                        {qualityTitle}
                    </h1>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20 max-w-4xl">

            <div className="max-w-3xl mx-auto mb-16 text-center">
                <p className="text-2xl font-medium text-gray-800 italic mb-8">
                    {qualityQuote}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                    {qualityIntro}
                </p>
            </div>

            <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 border-b border-gray-200 pb-4 w-fit mx-auto">
                {t('quality.commitment')}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <ShieldCheck className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t('quality.pillars.audits.title')}</h3>
                    <p className="text-gray-600">{t('quality.pillars.audits.desc')}</p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <Eye className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t('quality.pillars.supervision.title')}</h3>
                    <p className="text-gray-600">{t('quality.pillars.supervision.desc')}</p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <Award className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t('quality.pillars.partnerships.title')}</h3>
                    <p className="text-gray-600">{t('quality.pillars.partnerships.desc')}</p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <TrendingUp className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t('quality.pillars.innovation.title')}</h3>
                    <p className="text-gray-600">{t('quality.pillars.innovation.desc')}</p>
                </div>
            </div>

            <div className="bg-black text-white p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold tracking-widest uppercase">
                    {qualityClosing}
                </h3>
            </div>
            </div>
        </main>
    );
}
