"use client";

import React from 'react';
import { Ship, Package, DollarSign, Handshake } from 'lucide-react';
import { useLanguage } from 'lib/LanguageContext';

export default function NegotiationPage() {
    const { t } = useLanguage();
    
    return (
        <main className="w-full">
            {/* Hero Section */}
            <section 
                className="bg-cover bg-center bg-no-repeat relative py-24 text-white"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/raster/containers.webp)' }}
            >
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 uppercase tracking-wider">{t('negotiation.title')}</h1>
                    <p className="text-center text-gray-300 max-w-2xl mx-auto">
                        {t('negotiation.intro')}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20 max-w-4xl">

            <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* FOB */}
                <div className="flex flex-col gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <Ship className="w-7 h-7 text-black" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">FOB</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {t('businessModels.tradeTerms.fob.desc')}
                        </p>
                    </div>
                </div>

                {/* CIF */}
                <div className="flex flex-col gap-4 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center">
                        <Package className="w-7 h-7 text-black" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">CIF</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {t('businessModels.tradeTerms.cif.desc')}
                        </p>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 border-b border-gray-200 pb-4 w-fit mx-auto">
                {t('negotiation.options.title')}
            </h2>

            <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <DollarSign className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold mb-1">{t('negotiation.options.items.flexibility.title')}</h3>
                        <p className="text-gray-600">{t('negotiation.options.items.flexibility.desc')}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <Handshake className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold mb-1">{t('negotiation.options.items.transparency.title')}</h3>
                        <p className="text-gray-600">{t('negotiation.options.items.transparency.desc')}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <Package className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold mb-1">{t('negotiation.options.items.solutions.title')}</h3>
                        <p className="text-gray-600">{t('negotiation.options.items.solutions.desc')}</p>
                    </div>
                </div>
            </div>
            </div>
        </main>
    );
}
