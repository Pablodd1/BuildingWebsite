import { Montserrat } from 'next/font/google'
import Link from 'next/link'
import "./globals.css";
import { getDictionary } from "lib/i18n/getDictionary";
import RootLayoutClient from "./layout-client";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export async function generateMetadata() {
  const lang = 'es';
  const dict = getDictionary(lang);

  const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "";
  const resolveBaseUrl = (value) => {
    if (!value) return "http://localhost:3000";
    const trimmed = value.trim();
    if (!trimmed) return "http://localhost:3000";
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      return new URL(withProtocol).toString();
    } catch {
      return "http://localhost:3000";
    }
  };

  const BASE_URL = resolveBaseUrl(rawBaseUrl);
  const canonicalUrl = `${BASE_URL}/${lang}`;

  const defaults = {
    title: dict.meta.siteName + " | " + (lang === 'es' ? "Diseñamos el Futuro" : "We Design the Future"),
    description: dict.meta.siteDescription,
    keywords: dict.meta.keywords,
    image: `${BASE_URL}/og-image.jpg`,
    siteName: dict.meta.siteName,
    canonical: canonicalUrl,
  };

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: defaults.title,
      template: `%s | ${dict.meta.siteName}`
    },
    description: defaults.description,
    keywords: defaults.keywords,
    authors: [{ name: "Building Innovation Team" }],
    creator: "Building Innovation",
    publisher: "Building Innovation",
    applicationName: dict.meta.siteName,
    generator: "Next.js",
    manifest: "/favicons/manifest.json",

    alternates: {
      canonical: defaults.canonical,
      languages: {
        'en': `${BASE_URL}`,
        'es': `${BASE_URL}/es`,
        'x-default': `${BASE_URL}`
      }
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },

    icons: {
      icon: [
        { url: "/unitec-logo.png" }
      ],
      apple: [
        { url: "/unitec-logo.png" }
      ],
    },

    openGraph: {
      type: "website",
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      url: defaults.canonical,
      siteName: defaults.siteName,
      title: defaults.title,
      description: defaults.description,
images: [
        {
          url: defaults.image = "/unitec-logo.png",
          width: 1200,
          height: 630,
          alt: lang === 'es' ? "UNITEC USA - Materiales de Construcción" : "UNITEC USA - Building Materials"
        }
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@unitecusadesign",
      creator: "@unitecusadesign",
      title: defaults.title,
      description: defaults.description,
      images: [defaults.image],
    },

    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: dict.meta.siteName,
    },

    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },
  };
}

export default async function RootLayout({ children }) {
  const lang = 'es';
  const dict = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Structured Data / JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#organization`,
                  "name": "Building Innovation",
                  "url": process.env.NEXT_PUBLIC_BASE_URL,
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`
                  },
                  "description": dict.meta.siteDescription,
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": lang === 'es' ? "Ventas" : "Sales",
                    "availableLanguage": ["English", "Spanish"]
                  },
                  "sameAs": [
                    "https://instagram.com/building.innovation",
                    "https://facebook.com/buildinginnovation"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#website`,
                  "url": process.env.NEXT_PUBLIC_BASE_URL,
                  "name": "Building Innovation",
                  "publisher": {
                    "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#organization`
                  },
                  "inLanguage": ["en", "es"]
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${montserrat.className} font-medium`}>
        <RootLayoutClient lang={lang} dict={dict}>
          {children}
        </RootLayoutClient>
        <div className="fixed bottom-4 right-4 z-40">
          <Link 
            href="/contact" 
            onClick={() => {
              if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                  event: 'cta_contact_click',
                  language: lang,
                  location: 'layout',
                  timestamp: new Date().toISOString()
                })
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            {lang === 'es' ? 'Contáctanos' : 'Contact Us'}
          </Link>
        </div>
      </body>
    </html>
  );
}
