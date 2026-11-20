import { Manrope, DM_Sans } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { cookies } from 'next/headers';
import RootLayoutClient from './layout-client';
import { siteSettings } from '../utils/siteSettings';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value === 'en' ? 'en' : 'es';
  const baseUrl = siteSettings.domain;

  const titleDefault =
    lang === 'es'
      ? 'Building Innovation | Materiales de Construcción y Tecnología IA'
      : 'Building Innovation | Architectural Materials & AI Technology';

  const description =
    lang === 'es'
      ? 'Compañía americana en Doral, Miami, pionera en materiales constructivos de alta calidad (PVC, WPC, SPC) y soluciones con IA para el sector retail y mayorista en 10 países.'
      : 'American company headquartered in Doral, Miami, pioneering high-quality architectural building materials (PVC, WPC, SPC) and AI solutions across 10 countries in the Americas.';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: titleDefault,
      template: '%s | Building Innovation',
    },
    description,
    alternates: {
      canonical: '/',
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
        { url: '/favicons/favicon.ico' },
        { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/favicons/apple-icon.png' },
        { url: '/favicons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      type: 'website',
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      url: baseUrl,
      siteName: siteSettings.brand_name,
      title: titleDefault,
      description,
      images: [
        {
          url: `${baseUrl}/raster/interior.webp`,
          width: 1200,
          height: 630,
          alt: 'Building Innovation — Architectural Materials & Building Tech',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleDefault,
      description,
      images: [`${baseUrl}/raster/interior.webp`],
    },
  };
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value === 'en' ? 'en' : 'es';
  const baseUrl = siteSettings.domain;

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: siteSettings.brand_name,
        slogan: siteSettings.tagline,
        url: baseUrl,
        email: siteSettings.public_email,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteSettings.doral_address_street,
          addressLocality: siteSettings.doral_address_city,
          addressRegion: siteSettings.doral_address_state,
          postalCode: siteSettings.doral_address_zip,
          addressCountry: 'US',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteSettings.primary_phone,
          email: siteSettings.public_email,
          contactType: 'sales',
          areaServed: ['US', 'MX', 'GT', 'SV', 'HN', 'DO', 'CO', 'EC', 'PE', 'VE'],
          availableLanguage: ['Spanish', 'English'],
        },
        sameAs: [
          siteSettings.social.instagram,
          siteSettings.social.facebook,
          siteSettings.social.tiktok,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: siteSettings.brand_name,
        description:
          'Building Innovation: architectural building materials (PVC, WPC, SPC) and AI commerce tools from Doral, Miami.',
        publisher: { '@id': `${baseUrl}/#organization` },
        inLanguage: ['es', 'en'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/catalogo/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18156507743"
        />
        <Script
          id="inline-script-1"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18156507743');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#17242e]">
        <RootLayoutClient lang={lang}>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
