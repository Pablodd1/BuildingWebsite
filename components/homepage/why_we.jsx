"use client";

import { motion } from "framer-motion";
import Stylish_H2 from "My_UI/stylish_h2";
import { useLanguage } from "lib/LanguageContext";

export default function WhyWeSection() {
    const { t } = useLanguage();

    const features = [
        {
            id: "01",
            title: t("why.features.innovation.title"),
            text: t("why.features.innovation.text"),
        },
        {
            id: "02",
            title: t("why.features.quality.title"),
            text: t("why.features.quality.text"),
        },
        {
            id: "03",
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

    return (
        <section className="w-full bg-white px-6 md:px-16 lg:px-24 py-16 my-20 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Stylish_H2 h2={t("why.title")} />
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-3xl text-md text-accent2 mx-auto text-center mb-14"
                >
                    {t("why.description")}
                </motion.p>

                {/* Features */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center relative"
                >
                    {features.map((item, index) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col border-b-2 md:border-r-2 border-accent2/75 py-5 last-of-type:border-0 md:border-b-0 hover:border-primary transition-colors duration-300 cursor-default"
                        >
                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                className="text-sm tracking-widest text-secondary font-extrabold mb-2"
                            >
                                {item.id}
                            </motion.span>

                            <h3 className="text-md tracking-widest uppercase text-gray-900 mb-4 hover:text-primary transition-colors duration-300">
                                {item.title}
                            </h3>

                            <p className="text-sm max-w-xs mx-auto text-accent2">
                                {item.text}
                            </p>

                            {/* Divider (desktop only, not after last item) */}
                            {index < features.length - 1 && (
                                <div
                                    className={`hidden md:block absolute top-[60%] h-28 w-px bg-gray-200
                                    ${index === 0 ? "left-1/3" : "left-2/3"}`}
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
