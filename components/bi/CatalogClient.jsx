'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Bot,
  Download,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  RotateCcw,
  Search,
} from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings, getWhatsappLink } from '../../utils/siteSettings';
import { openBuildingAssistant } from '../ui/VirtualFrontDesk';

const PAGE_SIZE = 24;

export default function CatalogClient({ products = [], lineCounts = [] }) {
  const searchParams = useSearchParams();
  const { bi, isEs } = useLanguage();
  const c = bi.catalog;

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [scope, setScope] = useState(searchParams.get('scope') || 'ALL');
  const [lineSlug, setLineSlug] = useState(searchParams.get('line') || 'ALL');
  const [colorFilter, setColorFilter] = useState('ALL');
  const [sizeFilter, setSizeFilter] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const qParam = searchParams.get('q');
    const sParam = searchParams.get('scope');
    const lParam = searchParams.get('line');
    if (qParam !== null) setQuery(qParam);
    if (sParam === 'Interior' || sParam === 'Exterior') setScope(sParam);
    if (lParam) setLineSlug(lParam);
    setVisibleCount(PAGE_SIZE);
  }, [searchParams]);

  const sizeOptions = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.formattedDims?.metersLabel && p.formattedDims.metersLabel !== '-') {
        set.add(p.formattedDims.metersLabel);
      }
    });
    return Array.from(set).sort().slice(0, 20);
  }, [products]);

  const colorOptions = [
    { key: 'ALL', label: isEs ? 'Todos los colores' : 'All colors' },
    { key: 'blanco', label: isEs ? 'Blanco / Marfil' : 'White / Ivory' },
    { key: 'gris', label: isEs ? 'Gris / Plata' : 'Gray / Silver' },
    { key: 'negro', label: isEs ? 'Negro / Carbón' : 'Black / Charcoal' },
    { key: 'marmol', label: isEs ? 'Mármol / Calacatta' : 'Marble / Calacatta' },
    { key: 'madera', label: isEs ? 'Madera / Roble / Nogal' : 'Wood / Oak / Walnut' },
    { key: 'beige', label: isEs ? 'Arena / Beige / Dorado' : 'Sand / Beige / Gold' },
    { key: 'verde', label: isEs ? 'Verde / Moss' : 'Green / Moss' },
  ];

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (scope !== 'ALL' && p.scope !== scope) return false;
      if (lineSlug !== 'ALL' && p.lineSlug !== lineSlug) return false;
      if (colorFilter !== 'ALL' && !p.colors?.includes(colorFilter)) return false;
      if (sizeFilter !== 'ALL' && p.formattedDims?.metersLabel !== sizeFilter) return false;
      if (q) {
        const haystack = `${p.name} ${p.id} ${p.category} ${p.subcategory} ${p.colors?.join(' ')} ${p.formattedDims?.metricLabel} ${p.formattedDims?.imperialLabel}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [products, query, scope, lineSlug, colorFilter, sizeFilter]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const interiorCollections = lineCounts.filter((l) => l.scope === 'Interior');
  const exteriorCollections = lineCounts.filter((l) => l.scope === 'Exterior');

  const clearAll = () => {
    setQuery('');
    setScope('ALL');
    setLineSlug('ALL');
    setColorFilter('ALL');
    setSizeFilter('ALL');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="w-full">
      {/* 1. Banner con buscador */}
      <section className="bg-[#f4f1eb] border-b border-[#e5e7e5] py-14 sm:py-16">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{c.eyebrow}</p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#17242e] mt-2 max-w-3xl">
            {c.title}
          </h1>
          <p className="text-[#66737c] mt-3 max-w-2xl text-base">{c.subtitle}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setVisibleCount(PAGE_SIZE);
            }}
            className="mt-7 flex flex-col sm:flex-row gap-3 max-w-3xl"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#66737c] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder={c.searchPlaceholder}
                aria-label={c.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#dce2e4] text-sm text-[#17242e] focus:outline-none focus:border-[#245b77] shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white cursor-pointer shrink-0"
            >
              <span>{c.searchBtn}</span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. Colecciones visuales divididas en Interior y Exterior */}
      <section className="py-12 bg-white border-b border-[#e5e7e5]">
        <div className="bi-wrap space-y-8">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17242e]">
            {c.collectionsTitle}
          </h2>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#245b77] mb-3">
              {c.interiorLabel}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {interiorCollections.map((col) => {
                const selected = lineSlug === col.slug;
                return (
                  <button
                    key={col.slug}
                    type="button"
                    onClick={() => {
                      setScope('Interior');
                      setLineSlug(selected ? 'ALL' : col.slug);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className={`text-left rounded-2xl p-2.5 border transition-all cursor-pointer ${
                      selected
                        ? 'bg-[#142d3d] text-white border-[#142d3d] shadow-md'
                        : 'bg-[#f4f1eb]/70 text-[#17242e] border-[#e5e7e5] hover:border-[#d68a50]'
                    }`}
                  >
                    <div className="relative h-16 w-full rounded-xl overflow-hidden mb-2 bg-[#142d3d]">
                      <Image
                        src={col.image}
                        alt={isEs ? col.title_es : col.title_en}
                        fill
                        sizes="150px"
                        className="object-cover"
                      />
                    </div>
                    <span className="block text-[11px] font-bold leading-tight line-clamp-2">
                      {isEs ? col.title_es : col.title_en}
                    </span>
                    <span
                      className={`block text-[10px] mt-1 ${
                        selected ? 'text-[#d4dce1]' : 'text-[#66737c]'
                      }`}
                    >
                      {col.count} SKUs
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d68a50] mb-3">
              {c.exteriorLabel}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {exteriorCollections.map((col) => {
                const selected = lineSlug === col.slug;
                return (
                  <button
                    key={col.slug}
                    type="button"
                    onClick={() => {
                      setScope('Exterior');
                      setLineSlug(selected ? 'ALL' : col.slug);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className={`text-left rounded-2xl p-3 border transition-all cursor-pointer flex items-center gap-3 ${
                      selected
                        ? 'bg-[#142d3d] text-white border-[#142d3d] shadow-md'
                        : 'bg-[#f4f1eb]/70 text-[#17242e] border-[#e5e7e5] hover:border-[#d68a50]'
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#142d3d]">
                      <Image
                        src={col.image}
                        alt={isEs ? col.title_es : col.title_en}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-bold leading-snug">
                        {isEs ? col.title_es : col.title_en}
                      </span>
                      <span
                        className={`block text-[11px] mt-0.5 ${
                          selected ? 'text-[#d4dce1]' : 'text-[#66737c]'
                        }`}
                      >
                        {col.count} SKUs
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filtros + 4. Grilla de productos (SIN PRECIOS NI CARRITO) */}
      <section className="py-14 bg-white">
        <div className="bi-wrap">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#e5e7e5]">
            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'Interior', 'Exterior'].map((sc) => (
                <button
                  key={sc}
                  type="button"
                  onClick={() => {
                    setScope(sc);
                    if (sc === 'ALL') setLineSlug('ALL');
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    scope === sc
                      ? 'bg-[#142d3d] text-white border-[#142d3d]'
                      : 'bg-white text-[#66737c] border-[#e5e7e5] hover:text-[#17242e]'
                  }`}
                >
                  {sc === 'ALL' ? bi.common.all : sc}
                </button>
              ))}

              <select
                value={lineSlug}
                onChange={(e) => {
                  setLineSlug(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-label={c.allCollections}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#f4f1eb] border border-[#e5e7e5] text-[#17242e]"
              >
                <option value="ALL">{c.allCollections}</option>
                {lineCounts.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {isEs ? l.title_es : l.title_en} ({l.count})
                  </option>
                ))}
              </select>

              <select
                value={colorFilter}
                onChange={(e) => {
                  setColorFilter(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-label={c.colorFilterPlaceholder}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#f4f1eb] border border-[#e5e7e5] text-[#17242e]"
              >
                {colorOptions.map((col) => (
                  <option key={col.key} value={col.key}>
                    {col.label}
                  </option>
                ))}
              </select>

              <select
                value={sizeFilter}
                onChange={(e) => {
                  setSizeFilter(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-label={c.sizeFilterAll}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#f4f1eb] border border-[#e5e7e5] text-[#17242e] max-w-[230px]"
              >
                <option value="ALL">{c.sizeFilterAll}</option>
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {(query || scope !== 'ALL' || lineSlug !== 'ALL' || colorFilter !== 'ALL' || sizeFilter !== 'ALL') && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold text-[#d68a50] hover:bg-[#f4f1eb] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{c.clearFilters}</span>
                </button>
              )}
            </div>

            <p className="text-xs font-bold text-[#66737c]">
              <strong className="text-[#142d3d]">{filteredProducts.length}</strong> {c.resultsCount}
            </p>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="bi-card p-12 text-center max-w-xl mx-auto">
              <h3 className="font-heading font-bold text-xl text-[#17242e]">{c.noResultsTitle}</h3>
              <p className="text-sm text-[#66737c] mt-2">{c.noResultsDesc}</p>
              <div className="mt-5 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={clearAll}
                  className="bi-pill-btn border border-[#142d3d]/20 text-[#142d3d] cursor-pointer"
                >
                  {c.clearFilters}
                </button>
                <button
                  type="button"
                  onClick={openBuildingAssistant}
                  className="bi-pill-btn bg-[#d68a50] text-white cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>{c.askAi}</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {visibleProducts.map((product) => {
                  const waQuoteUrl = getWhatsappLink(
                    isEs
                      ? `Hola Building Innovation, me interesa cotizar la referencia ${product.name} (SKU: ${product.id}).`
                      : `Hello Building Innovation, I would like a quote for ${product.name} (SKU: ${product.id}).`
                  );
                  return (
                    <article
                      key={product.id}
                      className="bi-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all"
                    >
                      <div>
                        <Link
                          href={`/catalogo/${product.id}`}
                          className="relative h-52 w-full block bg-[#f4f1eb] overflow-hidden"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <div className="p-4 space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#edf2f3] text-[#245b77] text-[10px] font-bold uppercase">
                              {product.scope}
                            </span>
                            <span className="text-[11px] font-mono text-[#66737c]">
                              SKU {product.id}
                            </span>
                          </div>
                          <Link href={`/catalogo/${product.id}`} className="block">
                            <h3 className="font-heading font-bold text-sm text-[#17242e] line-clamp-2 group-hover:text-[#245b77] pt-1">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-[11px] text-[#66737c]">
                            {product.formattedDims?.metricLabel}
                          </p>
                          <p className="text-[11px] text-[#66737c]">
                            {product.formattedDims?.imperialLabel}
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-2 flex items-center gap-2">
                        <Link
                          href={`/catalogo/${product.id}`}
                          className="flex-1 text-center px-3 py-2 rounded-full border border-[#142d3d]/20 text-[#142d3d] hover:bg-[#f4f1eb] text-xs font-bold transition-colors"
                        >
                          {c.viewSheet}
                        </Link>
                        <a
                          href={waQuoteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-3 py-2 rounded-full bg-[#d68a50] hover:bg-[#c27941] text-white text-xs font-bold transition-colors"
                        >
                          {isEs ? 'Cotiza' : 'Quote'}
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white cursor-pointer"
                  >
                    <span>
                      {c.loadMore} ({filteredProducts.length - visibleCount})
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* 6. Asistente IA + 7. Descargas PDF */}
      <section className="py-16 bg-[#f4f1eb]">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bi-card p-8 flex flex-col justify-between">
            <div>
              <span className="bi-eyebrow">{bi.assistant.onlineBadge}</span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17242e] mt-2">
                {c.assistantBannerTitle}
              </h2>
              <p className="text-sm text-[#66737c] mt-2 leading-relaxed">
                {c.assistantBannerDesc}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openBuildingAssistant}
                className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>{c.assistantBannerChat}</span>
              </button>
              <a
                href={siteSettings.primary_phone_href}
                className="bi-pill-btn border border-[#142d3d]/20 text-[#142d3d] hover:bg-[#f4f1eb]"
              >
                <Phone className="w-4 h-4" />
                <span>{c.callAdvisor}</span>
              </a>
            </div>
          </div>

          <div className="bi-card p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#245b77]">
                PDF Downloads
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17242e] mt-2">
                {c.downloadsTitle}
              </h2>
              <p className="text-sm text-[#66737c] mt-2">{c.downloadsDesc}</p>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={siteSettings.catalog_pdfs.es}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white flex-1"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="truncate">{c.catalogEs}</span>
              </a>
              <a
                href={siteSettings.catalog_pdfs.en}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn border border-[#142d3d]/25 text-[#142d3d] hover:bg-[#f4f1eb] flex-1"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate">{c.catalogEn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ayuda: ¿No encuentras lo que buscas? */}
      <section className="py-14 bg-[#142d3d] text-white">
        <div className="bi-wrap flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {c.helpTitle}
            </h2>
            <p className="text-[#d4dce1] mt-2 text-sm sm:text-base">{c.helpDesc}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{bi.common.whatsapp}</span>
            </a>
            <a
              href={siteSettings.primary_phone_href}
              className="bi-pill-btn bg-white text-[#142d3d] hover:bg-[#f4f1eb]"
            >
              <Phone className="w-4 h-4" />
              <span>{bi.common.callNow}</span>
            </a>
            <a
              href={`mailto:${siteSettings.public_email}`}
              className="bi-pill-btn bg-white/15 hover:bg-white/25 text-white border border-white/20"
            >
              <Mail className="w-4 h-4" />
              <span>{bi.common.sendEmail}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
