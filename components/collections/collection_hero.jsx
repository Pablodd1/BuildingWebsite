"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CAROUSEL_IMAGES = [
    "/raster/interior.webp",
    "/raster/exterior.webp",
    "/raster/top.jpg",
    "/raster/modern_hero_bg.png"
];

export default function CollectionHero({ h1, description }) {
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
        }, 5000); // Transitions every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <figure className="relative aspect-square md:aspect-[2.8/1] mb-16 shadow-md shadow-gray-400 overflow-hidden bg-slate-950">
            {/* Dark Overlay Gradient */}
            <div className="absolute bottom-0 h-full bg-gradient-to-t from-black/85 via-black/40 to-transparent min-w-full z-10" />
            
            {/* Auto-looping Image Slideshow */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        fill
                        alt={`Collection slideshow image ${currentIdx + 1}`}
                        src={CAROUSEL_IMAGES[currentIdx]}
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </AnimatePresence>
            
            {/* Floating Banner Caption */}
            <figcaption className="z-20 bottom-8 absolute left-6 right-6 md:left-10" >
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-wider uppercase text-white drop-shadow-md max-w-4xl leading-tight" >
                    {h1}
                </h1>
                <p className="text-xs md:text-sm max-w-2xl text-gray-200 border-l-4 border-[#F37B24] pl-4 my-4 leading-relaxed drop-shadow-md" >
                    {description}
                </p>
            </figcaption>
        </figure>
    );
}