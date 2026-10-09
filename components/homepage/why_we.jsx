"use client";

import { motion } from "framer-motion";
import { useLanguage } from "lib/LanguageContext";
import { useBrand } from "lib/BrandContext";
import { Lightbulb, BadgeCheck, Recycle } from "lucide-react";

export default function WhyWeSection() {
    const { t, getCompanyText } = useLanguage();
    const { activeBrand } = useBrand();

    const companyKey = activeBrand === 'unitec' ? 'unitec' : 'binw';
    const whyTitle = getCompanyText(companyKey, 'whyTitle');
    const whyDescription = getCompanyText(companyKey, 'whyDescription');

    const features = [
        {
            id: "01",
            Icon: Lightbulb,
            title: t("why.features.innovation.title"),
            text: t("why.features.innovation.text"),
        },
        {
            id: "02",
            Icon: BadgeCheck,
            title: t("why.features.quality.title"),
            text: t("why.features.quality.text"),
        },
        {
            id: "03",
            Icon: Recycle,
            title: t("why.features.sustainability.title"),
            text: t("why.features.sustainability.text"),
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // Helper to parse markdown bold (**) and newlines (\n) to render HTML beautifully
    const renderFormattedText = (text) => {
        if (!text) return "";
        
        const paragraphs = text.split('\n\n');
        
        return paragraphs.map((paragraph, pIdx) => {
            const parts = [];
            const regex = /\*\*(.*?)\*\*/g;
            let lastIndex = 0;
            let match;
            
            while ((match = regex.exec(paragraph)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(paragraph.substring(lastIndex, match.index));
                }
                parts.push(
                    <strong key={match.index} className="font-extrabold text-gray-900">
                        {match[1]}
                    </strong>
                );
                lastIndex = regex.lastIndex;
            }
            
            if (lastIndex < paragraph.length) {
                parts.push(paragraph.substring(lastIndex));
            }
            
            return (
                <p key={pIdx} className={pIdx > 0 ? "mt-4 text-gray-600 text-sm leading-relaxed" : "text-gray-600 text-sm leading-relaxed"}>
                    {parts}
                </p>
            );
        });
    };

    return (
        <section className="w-full bg-white px-6 md:px-16 lg:px-24 py-16 my-10 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center gap-6 mb-8 w-full"
                >
                    <div className="h-px bg-gray-300 flex-grow max-w-[200px] hidden sm:block"></div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-widest uppercase text-gray-900 text-center">
                        {whyTitle}
                    </h2>
                    <div className="h-px bg-gray-300 flex-grow max-w-[200px] hidden sm:block"></div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl text-base text-gray-700 mx-auto text-center mb-16 leading-relaxed"
                >
                    {whyDescription}
                </motion.p>

                {/* Features */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 relative"
                >
                    {features.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, y: -2 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center py-6 px-6 md:px-8 border-b md:border-r border-gray-200 last:border-b-0 md:last:border-r-0 hover:bg-slate-50/50 transition-all duration-300 cursor-default"
                        >
                            <div className="flex items-center gap-3 mb-6 justify-center w-full">
                                <item.Icon className="w-7 h-7 text-[#F37B24] flex-shrink-0" />
                                <h3 className="text-md font-bold tracking-widest uppercase text-gray-900 hover:text-primary transition-colors duration-300">
                                    {item.title}
                                </h3>
                            </div>

                            <div className="text-center w-full text-gray-600">
                                {renderFormattedText(item.text)}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                {/* Bottom horizontal line to complete section boundary */}
                <div className="w-full h-px bg-gray-200 mt-14"></div>
            </div>
        </section>
    );
}
