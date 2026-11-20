'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings } from '../../utils/siteSettings';

export default function NavBar() {
  const { language, switchLanguage, bi } = useLanguage();
  const pathname = usePathname();
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    setDropOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 h-[82px] bg-white/95 backdrop-blur-md border-b border-black/10">
      <div className="bi-wrap h-full flex items-center justify-between gap-4">
        {/* Left: Brand Lockup */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 group"
          aria-label="Building Innovation Home"
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <Image
              src="/logo.png"
              alt="Building Innovation"
              width={40}
              height={40}
              priority
              className="w-10 h-10 object-contain"
            />
          </div>
          <div className="leading-none">
            <span className="block font-heading font-extrabold text-[17px] tracking-[-0.04em] text-[#17242e]">
              BUILDING INNOVATION
            </span>
            <small className="block text-[9px] tracking-[0.2em] text-[#66737c] font-bold uppercase mt-0.5">
              WE DESIGN THE FUTURE
            </small>
          </div>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-[#17242e]">
          <Link
            href="/"
            className={`transition-colors hover:text-[#d68a50] ${
              isActive('/') ? 'text-[#d68a50]' : ''
            }`}
          >
            {bi.nav.home}
          </Link>

          {/* Dropdown Unidades de negocio */}
          <div
            ref={dropRef}
            className="relative"
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}
          >
            <div className="flex items-center gap-1">
              <Link
                href="/unidades"
                className={`inline-flex items-center gap-1 py-2 transition-colors hover:text-[#d68a50] ${
                  isActive('/unidades') || isActive('/catalogo') ? 'text-[#d68a50]' : ''
                }`}
              >
                {bi.nav.units}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    dropOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>
            </div>

            {dropOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[470px] z-50">
                <div className="bg-white rounded-[20px] shadow-[0_22px_55px_rgba(16,36,50,0.14)] border border-[#e5e7e5] p-3.5 grid grid-cols-2 gap-3">
                  {/* Card 1: Building Innovation + direct catalog link */}
                  <div className="rounded-[14px] bg-[#f4f1eb]/75 hover:bg-[#f4f1eb] p-3 transition-colors flex flex-col justify-between border border-transparent hover:border-[#d68a50]/40">
                    <Link href="/unidades/building-innovation" className="block group">
                      <div className="relative h-24 w-full rounded-[10px] overflow-hidden mb-2.5 bg-[#142d3d]">
                        <Image
                          src="/raster/interior.webp"
                          alt={bi.nav.biCardTitle}
                          fill
                          sizes="210px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="block font-heading font-extrabold text-[15px] text-[#17242e] group-hover:text-[#d68a50]">
                        {bi.nav.biCardTitle}
                      </span>
                      <span className="block text-[12px] text-[#66737c] leading-snug mt-0.5 font-normal">
                        {bi.nav.biCardDesc}
                      </span>
                    </Link>
                    <Link
                      href="/catalogo"
                      className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-bold text-[#245b77] hover:text-[#d68a50] transition-colors pt-2 border-t border-black/10"
                    >
                      <span>{bi.nav.biCatalogLink}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Card 2: Building Tech */}
                  <Link
                    href="/unidades/building-tech"
                    className="rounded-[14px] bg-[#f4f1eb]/75 hover:bg-[#f4f1eb] p-3 transition-colors flex flex-col group border border-transparent hover:border-[#d68a50]/40"
                  >
                    <div className="relative h-24 w-full rounded-[10px] overflow-hidden mb-2.5 bg-[#142d3d]">
                      <Image
                        src="/raster/blog/inteligencia-artificial-construccion-remodelacion-portada-unitec.webp"
                        alt={bi.nav.techCardTitle}
                        fill
                        sizes="210px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="block font-heading font-extrabold text-[15px] text-[#17242e] group-hover:text-[#d68a50]">
                      {bi.nav.techCardTitle}
                    </span>
                    <span className="block text-[12px] text-[#66737c] leading-snug mt-0.5 font-normal">
                      {bi.nav.techCardDesc}
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`transition-colors hover:text-[#d68a50] ${
              isActive('/blog') ? 'text-[#d68a50]' : ''
            }`}
          >
            {bi.nav.blog}
          </Link>

          <Link
            href="/contacto"
            className={`transition-colors hover:text-[#d68a50] ${
              isActive('/contacto') ? 'text-[#d68a50]' : ''
            }`}
          >
            {bi.nav.contact}
          </Link>
        </nav>

        {/* Right: Language Toggle + CTA */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center rounded-full border border-[#e5e7e5] bg-[#f4f1eb]/60 p-0.5 text-[12px] font-bold"
          >
            <button
              type="button"
              onClick={() => switchLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-[#142d3d] text-white'
                  : 'text-[#66737c] hover:text-[#17242e]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLanguage('es')}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                language === 'es'
                  ? 'bg-[#142d3d] text-white'
                  : 'text-[#66737c] hover:text-[#17242e]'
              }`}
            >
              ES
            </button>
          </div>

          <a
            href={siteSettings.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d68a50] hover:bg-[#c27941] text-white text-[13px] font-bold transition-all hover:-translate-y-0.5 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{bi.nav.talkAdvisor}</span>
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="inline-flex items-center rounded-full border border-[#e5e7e5] bg-[#f4f1eb]/60 p-0.5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => switchLanguage('en')}
              className={`px-2 py-1 rounded-full ${
                language === 'en' ? 'bg-[#142d3d] text-white' : 'text-[#66737c]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLanguage('es')}
              className={`px-2 py-1 rounded-full ${
                language === 'es' ? 'bg-[#142d3d] text-white' : 'text-[#66737c]'
              }`}
            >
              ES
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-2 rounded-xl border border-[#e5e7e5] text-[#17242e]"
            aria-label={mobileOpen ? bi.nav.menuClose : bi.nav.menuOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#e5e7e5] shadow-xl px-5 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-[15px] font-semibold text-[#17242e]">
            <Link href="/" className="py-1" onClick={() => setMobileOpen(false)}>
              {bi.nav.home}
            </Link>
            <Link href="/unidades" className="py-1" onClick={() => setMobileOpen(false)}>
              {bi.nav.units}
            </Link>
            <div className="pl-4 flex flex-col space-y-2 border-l-2 border-[#d68a50]/40 text-[14px] font-medium">
              <Link href="/unidades/building-innovation" onClick={() => setMobileOpen(false)}>
                {bi.nav.biCardTitle}
              </Link>
              <Link href="/catalogo" className="text-[#245b77] font-bold" onClick={() => setMobileOpen(false)}>
                → {bi.nav.biCatalogLink}
              </Link>
              <Link href="/unidades/building-tech" onClick={() => setMobileOpen(false)}>
                {bi.nav.techCardTitle}
              </Link>
            </div>
            <Link href="/blog" className="py-1" onClick={() => setMobileOpen(false)}>
              {bi.nav.blog}
            </Link>
            <Link href="/contacto" className="py-1" onClick={() => setMobileOpen(false)}>
              {bi.nav.contact}
            </Link>
          </nav>
          <a
            href={siteSettings.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#d68a50] text-white text-[14px] font-bold"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{bi.nav.talkAdvisor}</span>
          </a>
        </div>
      )}
    </header>
  );
}
