"use client"

import { motion } from "framer-motion"
import {
    FileText,
    Shield,
    AlertTriangle,
    Lock,
    Truck,
    Scale,
    RefreshCcw,
    Mail,
} from "lucide-react"
import { useLanguage } from "lib/LanguageContext";

export default function PoliciesPage() {
    const { t } = useLanguage();
    
    return (
        <main className="w-full">
            {/* ================= HERO ================= */}
            <section className="bg-gray-100 py-20">
                <div className="mx-auto max-w-5xl px-4">
                    <motion.h1 className="text-3xl font-bold">
                        {t('terms.title')}
                    </motion.h1>

                    <p className="mt-4 max-w-3xl text-sm text-gray-600">
                        {t('terms.description')}
                    </p>
                </div>
            </section>

            {/* ================= CONTENT ================= */}
            <section className="py-20">
                <div className="mx-auto max-w-5xl px-4 space-y-14">
                    <Policy icon={FileText} title={t('terms.sections.acceptance.title')}>
                        <p>
                            {t('terms.sections.acceptance.text')}
                        </p>
                    </Policy>

                    <Policy icon={Shield} title={t('terms.sections.use.title')}>
                        <p>
                            {t('terms.sections.use.text')}
                        </p>
                    </Policy>

                    <Policy icon={AlertTriangle} title={t('terms.sections.product.title')}>
                        <p>
                            {t('terms.sections.product.text')}
                        </p>
                    </Policy>

                    <Policy icon={Scale} title={t('terms.sections.pricing.title')}>
                        <p>
                            {t('terms.sections.pricing.text')}
                        </p>
                    </Policy>

                    <Policy icon={Truck} title={t('terms.sections.orders.title')}>
                        <p>
                            {t('terms.sections.orders.text')}
                        </p>
                    </Policy>

                    <Policy icon={RefreshCcw} title={t('terms.sections.returns.title')}>
                        <p>
                            {t('terms.sections.returns.text')}
                        </p>
                    </Policy>

                    <Policy icon={Lock} title={t('terms.sections.liability.title')}>
                        <p>
                            {t('terms.sections.liability.text')}
                        </p>
                    </Policy>

                    <Policy icon={Scale} title={t('terms.sections.intellectual.title')}>
                        <p>
                            {t('terms.sections.intellectual.text')}
                        </p>
                    </Policy>

                    <Policy icon={RefreshCcw} title={t('terms.sections.changes.title')}>
                        <p>
                            {t('terms.sections.changes.text')}
                        </p>
                    </Policy>

                    <Policy icon={Mail} title={t('terms.sections.contact.title')}>
                        <p>
                            {t('terms.sections.contact.text')}
                        </p>
                        <p className="font-medium">
                            📧 {t('terms.email')}
                        </p>
                    </Policy>


                </div>
            </section>
        </main>
    )
}

/* ================= COMPONENT ================= */

function Policy({ icon: Icon, title, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border bg-white p-6 shadow-sm"
        >
            <div className="mb-4 flex items-center gap-3">
                <Icon size={20} />
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                {children}
            </div>
        </motion.div>
    )
}
