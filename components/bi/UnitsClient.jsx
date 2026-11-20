'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings } from '../../utils/siteSettings';

export default function UnitsClient() {
  const { bi } = useLanguage();
  const u = bi.unitsPage;

  return (
    <main className="w-full">
      {/* 1. Split Banner */}
      <section className="relative overflow-hidden bg-[#142d3d] text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
          <div className="relative min-h-[220px] lg:min-h-[420px]">
            <Image
              src="/raster/blog/lamina-marmol-pvc-portada-unitec.webp"
              alt="Building Innovation — Materiales"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#101f29]/60" />
            <span className="absolute bottom-5 left-6 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
              {u.leftBadge}
            </span>
          </div>
          <div className="relative min-h-[220px] lg:min-h-[420px]">
            <Image
              src="/raster/blog/inteligencia-artificial-construccion-remodelacion-portada-unitec.webp"
              alt="Building Tech — Tecnología con IA"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#142d3d]/65" />
            <span className="absolute bottom-5 right-6 px-3.5 py-1 rounded-full bg-[#d68a50]/90 text-white text-xs font-bold uppercase tracking-wider">
              {u.rightBadge}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-5">
          <div className="max-w-3xl text-center bg-[#101f29]/75 backdrop-blur-md border border-white/15 rounded-[26px] p-7 sm:p-10 pointer-events-auto">
            <p className="bi-eyebrow">{u.eyebrow}</p>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl leading-[1.08] text-white mt-2">
              {u.title}
            </h1>
            <p className="text-[#e3e8eb] text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              {u.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Introducción */}
      <section className="py-16 bg-white">
        <div className="bi-wrap max-w-4xl text-center">
          <p className="bi-eyebrow">{u.introEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2">
            {u.introTitle}
          </h2>
          <p className="text-[#66737c] text-base sm:text-lg leading-relaxed mt-4">
            {u.introBody}
          </p>
        </div>
      </section>

      {/* 3 & 4. Tarjetas de las dos unidades */}
      <section className="py-14 bg-[#f4f1eb]">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* Tarjeta Building Innovation */}
          <article className="bi-card p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="relative h-60 w-full rounded-[18px] overflow-hidden mb-6">
                <Image
                  src="/raster/interior.webp"
                  alt="Building Innovation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <span className="bi-eyebrow">01 · Materiales</span>
              <h2 className="font-heading font-extrabold text-3xl text-[#17242e] mt-2">
                Building Innovation
              </h2>
              <p className="text-[#66737c] mt-3 leading-relaxed">
                {bi.home.units.bi.desc}
              </p>
              <ul className="mt-5 space-y-2.5">
                {u.biPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-[#17242e]">
                    <CheckCircle2 className="w-4 h-4 text-[#d68a50] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/unidades/building-innovation"
                className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
              >
                <span>{u.biCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catalogo"
                className="bi-pill-btn border border-[#142d3d]/20 text-[#142d3d] hover:bg-[#f4f1eb]"
              >
                <span>{u.biSecondary}</span>
              </Link>
            </div>
          </article>

          {/* Tarjeta Building Tech */}
          <article className="bi-card p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="relative h-60 w-full rounded-[18px] overflow-hidden mb-6">
                <Image
                  src="/raster/blog/asistente-virtual-ia-chatbot-unitec.webp"
                  alt="Building Tech"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <span className="bi-eyebrow">02 · Tecnología IA</span>
              <h2 className="font-heading font-extrabold text-3xl text-[#17242e] mt-2">
                Building Tech
              </h2>
              <p className="text-[#66737c] mt-3 leading-relaxed">
                {bi.home.units.tech.desc}
              </p>
              <ul className="mt-5 space-y-2.5">
                {u.techPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-[#17242e]">
                    <CheckCircle2 className="w-4 h-4 text-[#d68a50] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <Link
                href="/unidades/building-tech"
                className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
              >
                <span>{u.techCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* 5. Cierre */}
      <section className="py-16 bg-white">
        <div className="bi-wrap">
          <div className="rounded-[26px] bg-[#142d3d] text-white p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                {u.closingTitle}
              </h2>
              <p className="text-[#d4dce1] mt-2 max-w-xl text-sm sm:text-base">
                {u.closingDesc}
              </p>
            </div>
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{u.closingCta}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
