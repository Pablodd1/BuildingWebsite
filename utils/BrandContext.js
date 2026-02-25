"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BrandContext = createContext();

export const BRAND_CONFIG = {
    binw: {
        id: 'binw',
        name: "Building Innovation",
        logoText: "BINW",
        logoImage: "/logo.png",
        metaTitle: "Building Innovation | Premium PVC & WPC Building Materials",
        colors: {
            primary: '#9EBECB',
            secondary: '#7296A4',
            accent: '#5A7A85',
        },
        heroTagline: "Fill Your Container. Ship Your Way.",
        heroTagline_es: "Llena Tu Contenedor. Envía a Tu Manera.",
    },
    unitec: {
        id: 'unitec',
        name: "UNITEC USA Design",
        logoText: "UNITEC",
        logoImage: "/unitec-logo.png",
        metaTitle: "UNITEC USA Design | Premium Building Solutions",
        colors: {
            primary: '#1B3A4B',
            secondary: '#3D6B7E',
            accent: '#144552',
        },
        heroTagline: "Premium Surfaces. Designed to Impress.",
        heroTagline_es: "Superficies Premium. Diseñadas Para Impresionar.",
    }
};

export function BrandProvider({ children }) {
    const [activeBrand, setActiveBrand] = useState("binw");

    // Persist brand choice
    useEffect(() => {
        const saved = localStorage.getItem('activeBrand');
        if (saved && BRAND_CONFIG[saved]) {
            setActiveBrand(saved);
        }
    }, []);

    const toggleBrand = () => {
        setActiveBrand(prev => {
            const next = prev === 'binw' ? 'unitec' : 'binw';
            localStorage.setItem('activeBrand', next);
            return next;
        });
    };

    const brand = BRAND_CONFIG[activeBrand];

    // Apply CSS variables when brand changes
    useEffect(() => {
        if (brand?.colors) {
            document.documentElement.style.setProperty('--color-primary', brand.colors.primary);
            document.documentElement.style.setProperty('--color-secondary', brand.colors.secondary);
            document.documentElement.style.setProperty('--color-accent1', brand.colors.secondary);
            document.documentElement.style.setProperty('--color-accent2', brand.colors.accent);
        }
    }, [brand]);

    return (
        <BrandContext.Provider value={{ activeBrand, toggleBrand, brand }}>
            {children}
        </BrandContext.Provider>
    );
}

export function useBrand() {
    return useContext(BrandContext);
}
