"use client";

import Image from "next/image";
import styles from "./herosection.module.css";
import MyButton from "My_UI/btn/main";
import CatalogFloatingBtn from "My_UI/hero/catalog_btn";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useLanguage } from "lib/LanguageContext";

const socials = [
    { Icon: Facebook, label: "Facebook" },
    { Icon: Instagram, label: "Instagram" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Youtube, label: "YouTube" },
];

export default function HeroSec() {
    const { t } = useLanguage();

    return (
        <main className="overflow-hidden min-h-screen relative">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/raster/containes.avif"
                    className="w-full h-full object-cover"
                >
                    <source src="https://herovideo.my.canva.site/_assets/video/4398a9aa13476ae9ff803cf0f486a13f.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                    <Image
                        src="/raster/containes.avif"
                        alt="Hero background"
                        fill
                        priority
                        className="object-cover"
                    />
                </video>
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/30 z-10"></div>
            </div>

            <section className="relative z-20 pt-16 md:pt-24 pb-12 md:pb-12">
                <div className="relative mx-auto max-w-300 px-4 md:px-6
                        grid gap-y-8 md:gap-y-12 gap-x-8
                        grid-cols-1
                        md:grid-cols-[auto_auto] md:mt-16
                        lg:grid-cols-[1fr_0.75fr] lg:gap-x-2">

                    <figure className="order-2 md:order-1 relative max-h-full flex items-center justify-center overflow-visible hidden md:flex">
                    </figure>
                    
                    <div className="flex flex-col justify-center gap-4 md:gap-6 text-white">
                        <h1 className="text-2xl sm:text-3xl md:text-6xl md:leading-18 tracking-wide font-semibold w-full md:w-11/12 drop-shadow-lg">
                            {t('hero.title_start')} <strong className="bg-primary/90 rounded-2xl px-2 text-orange-800">{t('hero.title_highlight')}</strong> {t('hero.title_end')}
                        </h1>

                        <p className="text-sm sm:text-base font-normal text-white/90 w-full md:w-8/12 drop-shadow-md">
                            {t('hero.subtitle')}
                        </p>
                        <div className="mt-2 md:mt-0">
                            <MyButton
                                label={t('hero.btn')}
                                href="/collections"
                                className={{
                                    btn: "bg-primary px-4 md:px-5 py-2 h-10 hover:bg-white transition-colors text-sm md:text-base",
                                    label: ""
                                }}
                            />
                        </div>
                    </div>
                </div>
                
                <div className={`hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 flex-col items-center justify-evenly gap-2 ${styles.bannerLink} z-30`}>
                    {socials.map(({ Icon, label }) => (
                        <a key={label} href="#" aria-label={label}>
                            <Icon strokeWidth={1} className="fill-white/80 text-white w-full min-h-fit h-auto max-w-12 hover:fill-primary hover:text-primary transition-colors" />
                        </a>
                    ))}
                </div>

                {/* Floating Catalog Button */}
                <div className="absolute left-0 bottom-8 z-40 hidden lg:block">
                    <CatalogFloatingBtn />
                </div>
            </section>
        </main>
    );
}
