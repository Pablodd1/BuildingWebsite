'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  Mail,
  MessageCircle,
  Phone,
  Recycle,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings, getWhatsappLink } from '../../utils/siteSettings';

const FEATURE_ICONS = [Clock, Droplets, Sparkles, Flame, Recycle, Zap];

const LINE_IMAGES = {
  'laminas-marmol': '/raster/blog/lamina-marmol-pvc-portada-unitec.webp',
  'paneles-wpc': '/raster/blog/panel-wpc-interior-portada-unitec.webp',
  'paneles-acusticos': '/raster/interior.webp',
  'paneles-3d': '/raster/blog/panel-wpc-interior-recepcion-marmol-unitec.webp',
  'pisos-spc': '/raster/blog/inteligencia-artificial-remodelacion-antes-despues-unitec.webp',
  'cielo-raso': '/raster/blog/panel-wpc-interior-cielo-raso-unitec.webp',
  jardines: '/raster/exterior.webp',
  complementos: '/raster/product.jpg',
  'paneles-wpc-exterior': '/raster/exterior.webp',
  'pisos-deck': '/raster/top.jpg',
  'cubiertas-upvc': '/raster/containers.webp',
  fachadas: '/raster/blog/panel-wpc-interior-instalacion-unitec.webp',
};

export default function BuildingInnovationClient() {
  const { bi, isEs } = useLanguage();
  const b = bi.biPage;

  return (
    <main className="w-full">
      {/* 1. Banner Principal */}
      <section className="relative min-h-[500px] flex items-center text-white bg-[#142d3d] overflow-hidden">
        <Image
          src="/raster/blog/lamina-marmol-pvc-portada-unitec.webp"
          alt={b.heroTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, rgba(16,31,41,0.92) 0%, rgba(20,45,61,0.74) 60%, rgba(20,45,61,0.35) 100%)',
          }}
        />
        <div className="bi-wrap relative z-10 py-20">
          <div className="max-w-3xl">
            <p className="bi-eyebrow">{b.eyebrow}</p>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[58px] leading-[1.05] text-white mt-3">
              {b.heroTitle}
            </h1>
            <p className="text-[#e3e8eb] text-base sm:text-lg leading-relaxed mt-5 max-w-2xl">
              {b.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link href="/catalogo" className="bi-pill-btn bg-white text-[#142d3d] hover:bg-[#f4f1eb]">
                <span>{b.heroPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getWhatsappLink(
                  isEs
                    ? 'Hola Building Innovation, quiero cotizar materiales de su catálogo.'
                    : 'Hello Building Innovation, I would like to quote materials from your catalog.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{b.heroSecondary}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Qué es Building Innovation */}
      <section className="py-20 bg-white">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="bi-eyebrow">{b.whatEyebrow}</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] leading-tight">
              {b.whatTitle}
            </h2>
            <p className="text-[#66737c] leading-relaxed">{b.whatP1}</p>
            <p className="text-[#66737c] leading-relaxed">{b.whatP2}</p>
            <ul className="space-y-2.5 pt-2">
              {b.whatHighlights.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-sm font-bold text-[#142d3d]">
                  <CheckCircle2 className="w-4 h-4 text-[#d68a50] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] rounded-[24px] overflow-hidden shadow-[0_18px_50px_rgba(16,36,50,0.1)]">
            <Image
              src="/raster/blog/lamina-marmol-pvc-vs-marmol-real-unitec.webp"
              alt="Acabados Building Innovation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Lo que comercializamos (Interior + Exterior -> links to filtered /catalogo) */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="bi-eyebrow">{b.linesEyebrow}</p>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2">
                {b.linesTitle}
              </h2>
              <p className="text-[#66737c] mt-2">{b.linesSubtitle}</p>
            </div>
            <Link href="/catalogo" className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white shrink-0">
              <span>{bi.common.viewCatalog}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <h3 className="font-heading font-bold text-xl text-[#142d3d] mb-4">{b.interiorTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {b.linesInterior.map((line) => (
              <Link
                key={line.slug}
                href={`/catalogo?line=${line.slug}`}
                className="bi-card p-4 flex flex-col justify-between group hover:-translate-y-1 transition-all hover:border-[#d68a50]"
              >
                <div>
                  <div className="relative h-36 w-full rounded-[14px] overflow-hidden mb-3.5 bg-[#142d3d]">
                    <Image
                      src={LINE_IMAGES[line.slug] || '/raster/interior.webp'}
                      alt={line.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#17242e] group-hover:text-[#245b77]">
                    {line.title}
                  </h4>
                  <p className="text-xs text-[#66737c] mt-1.5 leading-relaxed">{line.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#d68a50] mt-3">
                  <span>{b.exploreLine}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>

          <h3 className="font-heading font-bold text-xl text-[#142d3d] mb-4">{b.exteriorTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {b.linesExterior.map((line) => (
              <Link
                key={line.slug}
                href={`/catalogo?line=${line.slug}`}
                className="bi-card p-4 flex flex-col justify-between group hover:-translate-y-1 transition-all hover:border-[#d68a50]"
              >
                <div>
                  <div className="relative h-36 w-full rounded-[14px] overflow-hidden mb-3.5 bg-[#142d3d]">
                    <Image
                      src={LINE_IMAGES[line.slug] || '/raster/exterior.webp'}
                      alt={line.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-heading font-bold text-base text-[#17242e] group-hover:text-[#245b77]">
                    {line.title}
                  </h4>
                  <p className="text-xs text-[#66737c] mt-1.5 leading-relaxed">{line.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#d68a50] mt-3">
                  <span>{b.exploreLine}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Características de los productos (6 íconos) */}
      <section className="py-20 bg-white">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{b.featuresEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {b.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {b.features.map((feat, idx) => {
              const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
              return (
                <div key={idx} className="bi-card p-7">
                  <div className="w-11 h-11 rounded-[13px] bg-[#f6e7da] text-[#d68a50] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#17242e]">{feat.title}</h3>
                  <p className="text-sm text-[#66737c] mt-2">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Usos por espacio */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{b.usesEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {b.usesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b.usesGroups.map((g, idx) => (
              <div key={idx} className="bi-card overflow-hidden">
                <div className="relative h-52 w-full">
                  <Image
                    src={g.image}
                    alt={g.group}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-[#17242e]">{g.group}</h3>
                  <p className="text-sm text-[#66737c] mt-2">{g.items}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Para mayoristas y para cliente final */}
      <section className="py-20 bg-white">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{b.segmentsEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {b.segmentsTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bi-card p-8 border-t-4 border-t-[#d68a50] flex flex-col justify-between">
              <div>
                <span className="bi-eyebrow">{b.wholesale.badge}</span>
                <h3 className="font-heading font-extrabold text-2xl text-[#17242e] mt-2">
                  {b.wholesale.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {b.wholesale.bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#17242e]">
                      <CheckCircle2 className="w-4 h-4 text-[#d68a50] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-7">
                <a
                  href={getWhatsappLink(
                    isEs
                      ? 'Hola Building Innovation, quiero información para ser distribuidor/aliado mayorista.'
                      : 'Hello Building Innovation, I want to become a wholesale distribution partner.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{b.wholesale.cta}</span>
                </a>
              </div>
            </div>

            <div className="bi-card p-8 border-t-4 border-t-[#142d3d] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#245b77]">
                  {b.retail.badge}
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#17242e] mt-2">
                  {b.retail.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {b.retail.bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#17242e]">
                      <CheckCircle2 className="w-4 h-4 text-[#245b77] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-7">
                <a
                  href={getWhatsappLink(
                    isEs
                      ? 'Hola Building Innovation, quiero cotizar materiales para mi proyecto.'
                      : 'Hello Building Innovation, I would like a quote for my project.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{b.retail.cta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Cómo comprar */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{b.howEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {b.howTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b.steps.map((s) => (
              <div key={s.num} className="bi-card p-7">
                <strong className="font-heading font-extrabold text-4xl text-[#d68a50] block">
                  {s.num}
                </strong>
                <h3 className="font-heading font-bold text-xl text-[#17242e] mt-3">{s.title}</h3>
                <p className="text-sm text-[#66737c] mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-[#142d3d] text-white px-6 py-4 text-sm font-semibold text-center">
            {b.shippingNote}
          </div>
        </div>
      </section>

      {/* 8. Programa de Aliados + 9. Calidad y Respaldo */}
      <section className="py-20 bg-white">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Programa de Aliados */}
          <div className="bi-card p-8">
            <p className="bi-eyebrow">{b.alliesEyebrow}</p>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#17242e] mt-2">
              {b.alliesTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {b.alliesList.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#17242e]">
                  <Award className="w-4 h-4 text-[#d68a50] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={getWhatsappLink(
                  isEs
                    ? 'Hola, quiero aplicar al Programa de Aliados de Building Innovation.'
                    : 'Hello, I want to apply for the Building Innovation Partner Program.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{b.alliesCta}</span>
              </a>
              <a
                href={`mailto:${siteSettings.public_email}?subject=${encodeURIComponent(
                  '[Web - Building Innovation] Aplicación Programa de Aliados'
                )}`}
                className="bi-pill-btn border border-[#142d3d]/20 text-[#142d3d] hover:bg-[#f4f1eb]"
              >
                <Mail className="w-4 h-4" />
                <span>{b.alliesEmailCta}</span>
              </a>
            </div>
          </div>

          {/* Calidad y Respaldo */}
          <div className="rounded-[22px] bg-[#142d3d] text-white p-8 sm:p-10 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#d68a50] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="bi-eyebrow">{b.qualityEyebrow}</p>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {b.qualityTitle}
            </h2>
            <p className="text-[#d4dce1] leading-relaxed text-sm sm:text-base">{b.qualityDesc}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {b.qualityBadges.map((badge, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Proyectos */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{b.projectsEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {b.projectsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {b.projects.map((proj, idx) => (
              <article key={idx} className="bi-card overflow-hidden">
                <div className="relative h-56 w-full">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#d68a50]">
                    {proj.type} · {proj.location}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#17242e]">{proj.title}</h3>
                  <p className="text-xs font-semibold text-[#245b77]">{proj.product}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-promo Building IA App */}
      <section className="py-16 bg-white">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="bi-eyebrow">Building Tech · Building IA App</span>
            <h2 className="font-heading font-extrabold text-3xl text-[#17242e]">{b.appTeaserTitle}</h2>
            <p className="text-[#66737c] leading-relaxed">{b.appTeaserDesc}</p>
            <Link href="/unidades/building-tech" className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white">
              <span>{b.appTeaserCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-72 rounded-[22px] overflow-hidden shadow-lg">
            <Image
              src="/raster/blog/inteligencia-artificial-remodelacion-app-building-innovation.webp"
              alt="Building IA App"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 11. Cierre */}
      <section className="py-16 bg-[#142d3d] text-white">
        <div className="bi-wrap flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-extrabold text-3xl text-white">{b.closingTitle}</h2>
            <p className="text-[#d4dce1] mt-2">{b.closingDesc}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalogo" className="bi-pill-btn bg-white text-[#142d3d] hover:bg-[#f4f1eb]">
              <span>{bi.common.viewCatalog}</span>
            </Link>
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
              className="bi-pill-btn bg-white/15 hover:bg-white/25 text-white border border-white/20"
            >
              <Phone className="w-4 h-4" />
              <span>{bi.common.callNow}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
