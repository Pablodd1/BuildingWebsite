"use client"

import { motion } from "framer-motion"
import MyButton from "My_UI/btn/main"
import { useLanguage } from "lib/LanguageContext"
import { useBrand } from "lib/BrandContext"

export default function HomeCTA() {
    const { t } = useLanguage();
    const { activeBrand } = useBrand();

    // Determine target WhatsApp link based on the active brand configuration
    const whatsappLink = activeBrand?.whatsapp || "https://wa.me/13054233147";

    return (
        <section className="bg-[#132c3f] text-white py-16 px-6 border-t border-gray-800">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                
                {/* Header Row: House Outline Icon + Slanted Title */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-row items-center gap-6 justify-center flex-wrap md:flex-nowrap"
                >
                    {/* Outline House & Hammer Icon */}
                    <svg 
                        className="w-20 h-20 md:w-24 md:h-24 text-white flex-shrink-0 stroke-[2] select-none" 
                        viewBox="0 0 100 100" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        {/* House frame */}
                        <path d="M12 50 L50 15 L88 50" />
                        <path d="M22 50 L22 82 L78 82 L78 50" />
                        
                        {/* Hammer outline diagonal inside */}
                        {/* Handle */}
                        <path d="M35 70 L58 47" />
                        {/* Handle grips */}
                        <path d="M38 73 L42 69" strokeWidth="1.5" />
                        <path d="M41 76 L45 72" strokeWidth="1.5" />
                        <path d="M44 79 L48 75" strokeWidth="1.5" />
                        {/* Head body */}
                        <path d="M57 48 L65 40 L70 45 L62 53 Z" />
                        {/* Claw curve */}
                        <path d="M56 47 C 52 45, 48 48, 47 52" />
                        {/* Head face */}
                        <path d="M66 39 L71 34 L76 39 L71 44 Z" />
                    </svg>

                    {/* Title */}
                    <div className="text-left font-black tracking-wider leading-none flex flex-col justify-center">
                        <span className="block text-2xl md:text-3xl lg:text-4xl uppercase italic">SU PROYECTO</span>
                        <span className="block text-2xl md:text-3xl lg:text-4xl uppercase italic mt-1.5 text-white/95">EMPIEZA AQUÍ</span>
                    </div>
                </motion.div>

                {/* Subtitle Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 text-sm md:text-base text-white/90 leading-relaxed max-w-3xl mx-auto text-center font-normal"
                >
                    {t("cta.text", activeBrand)}
                </motion.p>

                {/* CTA Buttons Row */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row gap-5 justify-center items-center w-full"
                >
                    <MyButton
                        label={t("cta.btn", activeBrand)}
                        href="/colecciones"
                        className={{
                            btn: "bg-white hover:bg-gray-100 px-8 py-2.5 h-12 rounded-full text-slate-900 border-none transition-all duration-300 hover:scale-105 shadow-lg",
                            label: "font-black text-slate-900 uppercase text-[12px] tracking-widest"
                        }}
                    />

                    <MyButton
                        label={t("cta.btnSecondary", activeBrand)}
                        href={whatsappLink}
                        className={{
                            btn: "bg-white hover:bg-gray-100 px-8 py-2.5 h-12 rounded-full text-slate-900 border-none transition-all duration-300 hover:scale-105 shadow-lg",
                            label: "font-black text-slate-900 uppercase text-[12px] tracking-widest"
                        }}
                    />
                </motion.div>

            </div>
        </section>
    )
}
