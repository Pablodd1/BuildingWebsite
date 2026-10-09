"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import Logo from 'My_UI/logo';
import { useLanguage } from 'lib/LanguageContext';
import { useBrand } from 'lib/BrandContext';
import teamData from 'static_data/team.json';
import { useState } from 'react';

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.37 5.378.003 12.003.003c3.21.001 6.228 1.248 8.497 3.52 2.27 2.272 3.515 5.29 3.515 8.501 0 6.628-5.37 11.999-12.003 11.999-2.006-.002-3.98-.502-5.742-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.793 1.453 5.428 0 9.841-4.393 9.843-9.789.002-2.614-1.012-5.074-2.861-6.924C16.518 1.944 14.07 .93 11.558.93 6.13.93 1.72 5.32 1.718 10.716c0 1.69.447 3.34 1.298 4.793L1.926 21.94l6.721-1.786z"/>
        <path d="M16.947 13.912c-.27-.134-1.597-.788-1.845-.878-.248-.09-.429-.134-.61.134-.181.27-.698.878-.857 1.058-.159.18-.318.2-.588.066-.27-.134-1.14-.42-2.17-1.34-.8-.713-1.34-1.593-1.498-1.863-.158-.27-.017-.417.118-.55.121-.12.27-.315.405-.47.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.61-1.467-.836-2.007-.22-.528-.48-.456-.66-.464-.17-.008-.364-.01-.557-.01-.194 0-.51.072-.776.368-.266.296-1.016.992-1.016 2.42 0 1.428 1.039 2.808 1.183 3.002.145.194 2.045 3.123 4.954 4.382.692.3 1.233.479 1.654.613.695.221 1.328.19 1.828.115.557-.083 1.597-.653 1.822-1.284.225-.63.225-1.17.158-1.284-.068-.113-.248-.18-.518-.315z"/>
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const socials = [
    { Icon: WhatsAppIcon, label: "WhatsApp", key: "whatsapp" },
    { Icon: Instagram, label: "Instagram", key: "instagram" },
    { Icon: Linkedin, label: "LinkedIn", key: "linkedin" },
    { Icon: Youtube, label: "YouTube", key: "youtube" },
    { Icon: TikTokIcon, label: "TikTok", key: "tiktok" },
];

const Footer = () => {
    const { t, getCompanyText, language: lang } = useLanguage();
    const { activeBrand, brand } = useBrand();
    const isSpanish = lang === 'es';

    const brandData = teamData[activeBrand] || teamData.binw;
    const contact = brandData.contact || {};
    const social = teamData.social || {};

    const navData = {
        logo: {
            text: brand.name
        },
        contact: {
            phone: contact.phone,
            phone2: contact.phone2 || null,
            email: contact.email,
            address: activeBrand === 'unitec'
                ? [contact.address, contact.city, contact.country]
                : [contact.address, contact.country].filter(Boolean)
        },
        information: [
            { title: t("footer.information.links.productList"), link: "/colecciones" },
            { title: t("footer.information.links.exteriors"), link: "/colecciones/exterior" },
            { title: t("footer.information.links.interiors"), link: "/colecciones/interior" },
            { title: t("footer.information.links.sales"), link: "/colecciones/sales" }
        ],
        helpfulLinks: [
            { title: t("footer.helpful.links.search"), link: "/colecciones/search" },
            { title: t("footer.helpful.links.about"), link: "/nosotros" },
            { title: t("footer.helpful.links.portfolio"), link: "/colecciones" },
            { title: t("footer.helpful.links.privacy"), link: "/politicas" },
            { title: t("footer.helpful.links.faqs"), link: "/preguntas-frecuentes" }
        ]
    };



    return (
        <footer
            className="relative text-gray-300 pt-16 overflow-hidden border-t border-slate-800 bg-[#132c3f]"
        >
            <div className="container mx-auto px-6 relative z-10">
                <section className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-y-2' >
                    <article className='lg:w-2/3 sm:col-span-2 md:col-span-3 lg:col-span-1' >
                        {/* Logo Section */}
                        <div className="text-center mb-0 w-fit mx-auto ">
                            <Logo size={150} className="mx-auto bg-white p-3 mb-4 rounded-xl shadow-xl border border-slate-200 object-contain hover:scale-105 transition-transform duration-300" />
                        </div>

                        {/* Contact Section */}
                        <div className="text-center mb-8 flex flex-col gap-1">
                            <p className="text-lg text-slate-100 uppercase tracking-widest font-semibold">{t("footer.contact.title")}</p>
                            
                            {activeBrand === 'unitec' && (
                                <p className="text-sm font-bold text-gray-300 mt-2">{t("footer.contact.moreInfo")}</p>
                            )}
                            <p className="text-sm font-medium">{navData.contact.phone} {navData.contact.phone2 ? `/ ${navData.contact.phone2}` : ""}</p>
                            
                            {activeBrand === 'unitec' && (
                                <p className="text-sm font-bold text-gray-300 mt-2">{t("footer.contact.visitShowroom")}</p>
                            )}
                            {navData.contact.address.map((line, i) => (
                                <p key={i} className="text-sm font-medium">{line}</p>
                            ))}
                        </div>

                    </article>

                    {/* Information Section */}
                    <div className="mb-8">
                        <h3 className="text-xl mb-4 text-slate-100 ">{t("footer.information.title")}</h3>
                        <ul className="space-y-2 px-2" >
                            {navData.information.map((item, index) => (
                                <li key={index}>
                                    <a href={item.link} className="uppercase tracking-widest font-semibold text-sm text-slate-300 hover:text-[#9EBECB] transition-colors">{item.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Helpful Links Section */}
                    <div className="mb-8 ">
                        <h3 className="text-xl mb-4 text-slate-100">{t("footer.helpful.title")}</h3>
                        <ul className="space-y-2 px-2">
                            {navData.helpfulLinks.map((item, index) => (
                                <li key={index}>
                                    <a href={item.link} className="uppercase tracking-widest font-semibold text-sm text-slate-300 hover:text-[#9EBECB] transition-colors">{item.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Brand Presence Section */}
                    <div className="text-center md:text-left mb-8 flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-bold text-slate-100 mb-4 uppercase tracking-widest">
                            {isSpanish ? "Sede Miami" : "Miami Headquarters"}
                        </h3>
                        <div 
                            className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                            <div className="flex gap-2">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
                                    <img src="/unitec-logo.png" alt="Unitec USA Design Logo" className="object-contain" />
                                </div>
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
                                    <img src="/logo.png" alt="Building Innovation Logo" className="object-contain" />
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-white transition-colors">UNITEC USA Design</p>
                                <p className="text-[10px] text-gray-300 uppercase tracking-tighter leading-tight">
                                    {isSpanish 
                                        ? "Doral, Miami, FL 33166" 
                                        : "Doral, Miami, FL 33166"}
                                </p>
                            </div>
                        </div>
                    </div>



                </section>

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative flex justify-center space-x-4 border-t border-slate-800 py-5"
                >
                    {socials.map(({ Icon, key }, index) => {
                        // Fallback for custom link or teamData socials
                        const link = key === "whatsapp" ? "https://wa.me/13054233147" : (social[key] || "#");
                        if (!link) return null;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href={link} aria-label={`Go To ${key}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-slate-900 hover:bg-[#9EBECB] transition-all duration-300 cursor-pointer">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            </motion.div>
                        );
                    })}
                    {/* Bottom Copyright */}
                    <div className="text-center font-serif text-sm absolute right-0">
                        <p>{t('footer.rights')} &copy; - 2026 UNITEC USA Design.</p>
                    </div>
                </motion.div>


            </div>
        </footer>
    );
};

export default Footer;




