"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { siteSettings } from "./siteSettings";

const BrandContext = createContext();

export const BRAND_CONFIG = {
  binw: {
    id: "binw",
    name: siteSettings.brand_name,
    logoText: "BI",
    logoImage: "/logo.png",
    favicon: "/favicons/favicon-32x32.png",
    colors: {
      primary: "#142d3d",
      secondary: "#245b77",
      accent: "#d68a50",
    },
    email: siteSettings.public_email,
    heroTagline: siteSettings.tagline,
    heroTagline_es: siteSettings.tagline,
  },
};

export function BrandProvider({ children }) {
  const [activeBrand] = useState("binw");
  const brand = BRAND_CONFIG[activeBrand];

  useEffect(() => {
    if (brand?.colors) {
      document.documentElement.style.setProperty("--color-primary", brand.colors.primary);
      document.documentElement.style.setProperty("--color-secondary", brand.colors.secondary);
      document.documentElement.style.setProperty("--color-accent1", brand.colors.secondary);
      document.documentElement.style.setProperty("--color-accent2", brand.colors.accent);
    }
  }, [brand]);

  const toggleBrand = () => {};

  return (
    <BrandContext.Provider value={{ activeBrand, toggleBrand, brand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  return useContext(BrandContext);
}
