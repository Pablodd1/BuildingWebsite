'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings } from '../../utils/siteSettings';

const TikTokIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const { bi } = useLanguage();

  return (
    <footer className="bg-[#101f29] text-white pt-16 pb-10">
      <div className="bi-wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Brand + Tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Building Innovation"
                width={42}
                height={42}
                className="w-10 h-10 object-contain brightness-0 invert"
              />
              <div className="leading-none">
                <span className="block font-heading font-extrabold text-[17px] tracking-[-0.04em] text-white">
                  BUILDING INNOVATION
                </span>
                <small className="block text-[9px] tracking-[0.2em] text-[#d4dce1] font-bold uppercase mt-1">
                  WE DESIGN THE FUTURE
                </small>
              </div>
            </Link>
            <p className="text-[#d4dce1] font-semibold text-sm mb-2">
              {bi.footer.tagline}
            </p>
            <p className="text-[#9cb0bc] text-sm leading-relaxed max-w-sm">
              {bi.footer.subtitle}
            </p>
          </div>

          {/* Column 2: 4 Core Pages */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-[0.16em] text-[#d68a50] font-bold mb-4">
              {bi.footer.exploreTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#d4dce1]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {bi.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/unidades" className="hover:text-white transition-colors">
                  {bi.nav.units}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {bi.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  {bi.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Units & Catalog */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-[0.16em] text-[#d68a50] font-bold mb-4">
              {bi.footer.unitsTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#d4dce1]">
              <li>
                <Link href="/unidades/building-innovation" className="hover:text-white transition-colors">
                  Building Innovation
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition-colors">
                  {bi.nav.biCatalogLink}
                </Link>
              </li>
              <li>
                <Link href="/unidades/building-tech" className="hover:text-white transition-colors">
                  Building Tech
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  {bi.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {bi.footer.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & @building.innovation */}
          <div>
            <h3 className="font-heading text-sm uppercase tracking-[0.16em] text-[#d68a50] font-bold mb-4">
              {bi.footer.contactTitle}
            </h3>
            <div className="space-y-3 text-sm text-[#d4dce1]">
              <a
                href={siteSettings.doral_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#d68a50] shrink-0 mt-0.5" />
                <span>{siteSettings.doral_address}</span>
              </a>
              <a
                href={siteSettings.primary_phone_href}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d68a50] shrink-0" />
                <span>{siteSettings.primary_phone}</span>
              </a>
              <a
                href={`mailto:${siteSettings.public_email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#d68a50] shrink-0" />
                <span>{siteSettings.public_email}</span>
              </a>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteSettings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @building.innovation"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d68a50] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook @building.innovation"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d68a50] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok @building.innovation"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#d68a50] flex items-center justify-center transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#d4dce1] hover:text-white inline-flex items-center gap-1 ml-1"
              >
                <span>{siteSettings.social.handle}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9cb0bc]">
          <p>{bi.footer.copyright}</p>
          <div className="flex items-center gap-5">
            <Link href="/policies" className="hover:text-white transition-colors">
              {bi.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {bi.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
