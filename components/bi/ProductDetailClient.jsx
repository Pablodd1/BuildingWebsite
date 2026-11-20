'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Download,
  Maximize2,
  MessageCircle,
  Phone,
  Ruler,
  X,
} from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings, getWhatsappLink } from '../../utils/siteSettings';
import { openBuildingAssistant } from '../ui/VirtualFrontDesk';

export default function ProductDetailClient({ product, related = [] }) {
  const [zoomOpen, setZoomOpen] = useState(false);
  const { bi, isEs } = useLanguage();
  const c = bi.catalog;
  const d = c.detail;

  const waUrl = getWhatsappLink(
    isEs
      ? `Hola Building Innovation, quiero cotizar el producto ${product.name} (SKU: ${product.id}).`
      : `Hello Building Innovation, I would like a quote for ${product.name} (SKU: ${product.id}).`
  );

  const metric = product.dimensions?.metric || {};
  const imperial = product.dimensions?.imperial || {};
  const widthMeters = metric.width ? (metric.width / 100).toFixed(2) : null;
  const lengthMeters = metric.length ? (metric.length / 100).toFixed(2) : null;

  const recommendedUses =
    product.scope === 'Exterior'
      ? isEs
        ? ['Fachadas arquitectónicas', 'Terrazas y pérgolas', 'Zonas de piscina', 'Proyectos comerciales exteriores']
        : ['Architectural facades', 'Terraces & patios', 'Pool deck areas', 'Commercial outdoor zones']
      : isEs
      ? ['Muros de salas y habitaciones', 'Baños y zonas húmedas', 'Cocinas y locales comerciales', 'Oficinas, hoteles y recepciones']
      : ['Living rooms & bedrooms', 'Bathrooms & wet areas', 'Kitchens & retail stores', 'Offices, hotels & lobbies'];

  return (
    <main className="w-full bg-white pb-20">
      {/* Breadcrumb */}
      <div className="bg-[#f4f1eb] border-b border-[#e5e7e5] py-4">
        <div className="bi-wrap flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245b77] hover:text-[#d68a50]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{d.backCatalog}</span>
          </Link>
          <span className="text-xs font-mono text-[#66737c]">
            {product.scope} · {product.subcategory} · SKU {product.id}
          </span>
        </div>
      </div>

      {/* Main Product Sheet */}
      <section className="py-12">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Photo Gallery */}
          <div className="lg:col-span-5">
            <div className="relative h-[380px] sm:h-[460px] w-full rounded-[24px] overflow-hidden border border-[#e5e7e5] bg-[#f4f1eb]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                aria-label="Ampliar imagen"
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/95 text-[#142d3d] shadow flex items-center justify-center hover:bg-[#d68a50] hover:text-white transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Info & Specs (ZERO PRICE / ZERO CART) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#edf2f3] text-[#245b77] text-xs font-bold uppercase">
                  {product.scope}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f6e7da] text-[#d68a50] text-xs font-bold uppercase">
                  {product.subcategory}
                </span>
                <span className="text-xs font-mono text-[#66737c]">SKU {product.id}</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] leading-tight">
                {product.name}
              </h1>
              <p className="text-[#66737c] text-sm sm:text-base leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            {/* Specs in Inches, Feet & Meters */}
            <div className="rounded-[20px] bg-[#f4f1eb] border border-[#e5e7e5] p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#142d3d] mb-4">
                <Ruler className="w-4 h-4 text-[#d68a50]" />
                <span>{d.specsTitle}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <tbody className="divide-y divide-black/10">
                    <tr>
                      <th className="py-2.5 pr-4 font-semibold text-[#66737c]">{d.specWidth}</th>
                      <td className="py-2.5 font-bold text-[#17242e]">
                        {imperial.width ? `${imperial.width} ${imperial.widthUnit || 'in'}` : '-'} ·{' '}
                        {metric.width ? `${metric.width} ${metric.widthUnit || 'cm'}` : '-'}
                        {widthMeters ? ` (${widthMeters} m)` : ''}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 pr-4 font-semibold text-[#66737c]">{d.specLength}</th>
                      <td className="py-2.5 font-bold text-[#17242e]">
                        {imperial.length ? `${imperial.length} ${imperial.lengthUnit || 'ft'}` : '-'} ·{' '}
                        {metric.length ? `${metric.length} ${metric.lengthUnit || 'cm'}` : '-'}
                        {lengthMeters ? ` (${lengthMeters} m)` : ''}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 pr-4 font-semibold text-[#66737c]">{d.specThickness}</th>
                      <td className="py-2.5 font-bold text-[#17242e]">
                        {metric.thickness ? `${metric.thickness} ${metric.thicknessUnit || 'mm'}` : '-'}
                        {imperial.thickness ? ` · ${imperial.thickness} ${imperial.thicknessUnit || 'in'}` : ''}
                      </td>
                    </tr>
                    <tr>
                      <th className="py-2.5 pr-4 font-semibold text-[#66737c]">{d.specPacking}</th>
                      <td className="py-2.5 font-bold text-[#17242e]">
                        {product.unit}
                        {product.itemsPerBox ? ` (${product.itemsPerBox} uds)` : ''}
                      </td>
                    </tr>
                    {product.weight ? (
                      <tr>
                        <th className="py-2.5 pr-4 font-semibold text-[#66737c]">{d.specWeight}</th>
                        <td className="py-2.5 font-bold text-[#17242e]">{product.weight} kg</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommended Uses */}
            <div>
              <h2 className="font-heading font-bold text-lg text-[#17242e] mb-3">{d.usesTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recommendedUses.map((u, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-[#17242e]">
                    <CheckCircle2 className="w-4 h-4 text-[#d68a50] shrink-0" />
                    <span>{u}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Action Buttons: AI Assistant, WhatsApp, Call, PDF Tech Sheet */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={openBuildingAssistant}
                className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>{c.askAi}</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-[#278d62] hover:bg-[#1f7450] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{c.quoteWa}</span>
              </a>

              <a
                href={siteSettings.primary_phone_href}
                className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
              >
                <Phone className="w-4 h-4" />
                <span>{bi.common.callNow}</span>
              </a>

              <a
                href={product.technicalSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn border border-[#142d3d]/25 text-[#142d3d] hover:bg-[#f4f1eb]"
              >
                <Download className="w-4 h-4" />
                <span>{c.downloadPdf}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Complementary / Related Products */}
      {related.length > 0 && (
        <section className="py-14 bg-[#f4f1eb]">
          <div className="bi-wrap">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17242e] mb-8">
              {d.relatedTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/catalogo/${item.id}`}
                  className="bi-card overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                  <div className="relative h-44 w-full bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase text-[#d68a50]">
                      {item.subcategory}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-[#17242e] mt-1 line-clamp-2 group-hover:text-[#245b77]">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#66737c] mt-1">
                      {item.formattedDims?.metricLabel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Zoom Lightbox */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[999999] bg-black/80 flex items-center justify-center p-5"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white text-[#142d3d] flex items-center justify-center cursor-pointer"
            aria-label="Cerrar imagen"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-4xl w-full h-[75vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
