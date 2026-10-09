"use client"

import { motion } from "framer-motion"
import { Boxes, Ruler, Layers3, ShieldCheck } from "lucide-react"
import { useLanguage } from "lib/LanguageContext"
import { useBrand } from "lib/BrandContext"

export default function BuiltForBulk() {
    const { t } = useLanguage();
    const { activeBrand } = useBrand();

    const FEATURES = [
        {
            icon: Boxes,
            title: t("bulk.features.container.title", activeBrand),
            desc: t("bulk.features.container.desc", activeBrand),
        },
        {
            icon: Ruler,
            title: t("bulk.features.volume.title", activeBrand),
            desc: t("bulk.features.volume.desc", activeBrand),
        },
        {
            icon: Layers3,
            title: t("bulk.features.multi.title", activeBrand),
            desc: t("bulk.features.multi.desc", activeBrand),
        },
        {
            icon: ShieldCheck,
            title: t("bulk.features.logistics.title", activeBrand),
            desc: t("bulk.features.logistics.desc", activeBrand),
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    }

    return (
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Side Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 flex flex-col gap-6"
                    >
                        <h2 className="text-3xl lg:text-4xl font-extrabold uppercase text-slate-900 leading-tight">
                            {t("bulk.title", activeBrand)}
                        </h2>
                        
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                            {t("bulk.subtitle", activeBrand)}
                        </p>
                    </motion.div>

                    {/* Right Side (2x2 Cards Grid) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >
                        {FEATURES.map((f, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: 1.01, 
                                    y: -4,
                                    borderColor: "#132c3f"
                                }}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
                            >
                                <div className="flex items-center gap-3.5 mb-4">
                                    <div className="text-slate-900 bg-slate-100 p-2 rounded-lg group-hover:bg-[#132c3f] group-hover:text-white transition-all duration-300">
                                        <f.icon size={22} />
                                    </div>
                                    <h3 className="font-extrabold text-[15px] text-slate-900 leading-snug group-hover:text-[#132c3f] transition-colors duration-300">
                                        {f.title}
                                    </h3>
                                </div>
                                
                                <p className="text-[13px] text-gray-600 leading-relaxed font-normal">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
