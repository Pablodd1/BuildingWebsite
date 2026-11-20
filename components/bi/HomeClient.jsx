'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings } from '../../utils/siteSettings';
import AmericasMap from './AmericasMap';

function AnimatedCounter({ value, suffix = '' }) {
  const [display, setDisplay] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const duration = 900;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.max(1, Math.round(progress * value));
            setDisplay(current);
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const VALUE_ICONS = [Sparkles, ShieldCheck, Layers, Cpu, Clock, Users];

export default function HomeClient({ blogs = [] }) {
  const { bi, isEs } = useLanguage();
  const h = bi.home;
  const recentBlogs = blogs.slice(0, 3);

  return (
    <main className="w-full">
      {/* 1. Banner Principal (Video Loop) */}
      <section className="relative min-h-[600px] lg:min-h-[650px] flex items-center text-white overflow-hidden bg-[#142d3d]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/raster/interior.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, rgba(16,31,41,0.9) 0%, rgba(20,45,61,0.72) 55%, rgba(20,45,61,0.42) 100%)',
          }}
        />

        <div className="bi-wrap relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[11px] uppercase tracking-[0.18em] font-bold text-[#d68a50] mb-5">
              {h.hero.eyebrow}
            </span>
            <h1 className="font-heading font-extrabold text-[40px] sm:text-[54px] lg:text-[68px] leading-[1.03] text-white">
              {h.hero.title}
            </h1>
            <p className="text-[#e3e8eb] text-lg sm:text-xl leading-relaxed mt-6 max-w-2xl">
              {h.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/unidades"
                className="bi-pill-btn bg-white text-[#142d3d] hover:bg-[#f4f1eb]"
              >
                <span>{h.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={siteSettings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{h.hero.ctaSecondary}</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 absolute right-6 bottom-8 bg-[#101f29]/80 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-full text-xs font-semibold text-[#e3e8eb]">
            <Award className="w-4 h-4 text-[#d68a50]" />
            <span>{h.hero.badge}</span>
          </div>
        </div>
      </section>

      {/* 2. Quiénes Somos + 3. Cifras */}
      <section className="py-20 bg-white">
        <div className="bi-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="bi-eyebrow">{h.about.eyebrow}</p>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.12] text-[#17242e]">
                {h.about.title}
              </h2>
              <p className="text-[#66737c] text-base leading-relaxed">{h.about.p1}</p>
              <p className="text-[#66737c] text-base leading-relaxed">{h.about.p2}</p>
              <div className="pt-2">
                <Link
                  href="/unidades"
                  className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
                >
                  <span>{h.about.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Dual visual balancing materials + AI */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative h-72 sm:h-80 rounded-[22px] overflow-hidden shadow-[0_18px_50px_rgba(16,36,50,0.09)]">
                <Image
                  src="/raster/blog/lamina-marmol-pvc-portada-unitec.webp"
                  alt="Building Innovation — Materiales arquitectónicos"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101f29]/90 to-transparent p-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Building Innovation
                  </span>
                </div>
              </div>
              <div className="relative h-72 sm:h-80 rounded-[22px] overflow-hidden shadow-[0_18px_50px_rgba(16,36,50,0.09)] mt-6">
                <Image
                  src="/raster/blog/inteligencia-artificial-construccion-remodelacion-portada-unitec.webp"
                  alt="Building Tech — Tecnología con IA"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101f29]/90 to-transparent p-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Building Tech
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Cifras (Contadores Animados) */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {h.stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-[20px] bg-[#f4f1eb] border border-[#e5e7e5] p-7 text-center"
              >
                <strong className="font-heading font-extrabold text-4xl sm:text-[42px] text-[#142d3d] block leading-none">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </strong>
                <span className="block text-sm font-semibold text-[#66737c] mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nuestras Unidades de Negocio (Equilibrio 50/50) */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="bi-eyebrow">{h.units.eyebrow}</p>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2">
                {h.units.title}
              </h2>
            </div>
            <p className="text-[#66737c] max-w-md text-sm sm:text-base">
              {h.units.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card Building Innovation */}
            <article className="bi-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="relative h-60 w-full rounded-[16px] overflow-hidden mb-6 bg-[#142d3d]">
                  <Image
                    src="/raster/interior.webp"
                    alt={h.units.bi.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[#142d3d] text-[11px] font-bold uppercase tracking-wider">
                    {h.units.bi.tag}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-[#17242e]">
                  {h.units.bi.title}
                </h3>
                <p className="text-[#66737c] text-sm sm:text-base leading-relaxed mt-3">
                  {h.units.bi.desc}
                </p>
                <p className="text-sm font-bold text-[#245b77] mt-4">
                  {h.units.bi.highlight}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/unidades/building-innovation"
                  className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
                >
                  <span>{h.units.bi.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/catalogo"
                  className="bi-pill-btn border border-[#142d3d]/20 text-[#142d3d] hover:bg-white"
                >
                  <span>{h.units.bi.secondary}</span>
                </Link>
              </div>
            </article>

            {/* Card Building Tech */}
            <article className="bi-card p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="relative h-60 w-full rounded-[16px] overflow-hidden mb-6 bg-[#142d3d]">
                  <Image
                    src="/raster/blog/inteligencia-artificial-remodelacion-app-building-innovation.webp"
                    alt={h.units.tech.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#142d3d]/90 text-white text-[11px] font-bold uppercase tracking-wider">
                    {h.units.tech.tag}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-[#17242e]">
                  {h.units.tech.title}
                </h3>
                <p className="text-[#66737c] text-sm sm:text-base leading-relaxed mt-3">
                  {h.units.tech.desc}
                </p>
                <p className="text-sm font-bold text-[#d68a50] mt-4">
                  {h.units.tech.highlight}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/unidades/building-tech"
                  className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
                >
                  <span>{h.units.tech.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Principales Logros (Timeline) */}
      <section className="py-20 bg-white">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{h.milestones.eyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {h.milestones.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {h.milestones.items.map((item, idx) => (
              <div
                key={idx}
                className="bi-card p-7 border-t-4 border-t-[#d68a50]"
              >
                <span className="font-heading font-extrabold text-3xl text-[#d68a50] block">
                  {item.year}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#17242e] mt-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#66737c] leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Presencia Geográfica (10 Países) */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <div className="max-w-2xl mb-10">
            <p className="bi-eyebrow">{h.presence.eyebrow}</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2">
              {h.presence.title}
            </h2>
            <p className="text-[#66737c] mt-3 text-base">{h.presence.desc}</p>
          </div>
          <AmericasMap />
        </div>
      </section>

      {/* 7. Por Qué Elegirnos (6 Íconos) */}
      <section className="py-20 bg-white">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{h.whyUs.eyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {h.whyUs.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {h.whyUs.items.map((item, idx) => {
              const Icon = VALUE_ICONS[idx % VALUE_ICONS.length];
              return (
                <div key={idx} className="bi-card p-7 hover:border-[#d68a50]/50 transition-colors">
                  <div className="w-11 h-11 rounded-[13px] bg-[#f6e7da] text-[#d68a50] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#17242e]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#66737c] leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Clientes y Aliados + Perfiles */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{h.clients.eyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-8">
            {h.clients.title}
          </h2>

          {/* Partner / Ecosystem Strip */}
          <div className="overflow-hidden rounded-[20px] bg-white border border-[#e5e7e5] py-6 px-4 mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#66737c] text-center mb-4">
              {h.clients.logosLabel}
            </p>
            <div className="animate-marquee items-center gap-12">
              {[...Array(2)].flatMap((_, dup) => [
                <div key={`unitec-${dup}`} className="flex items-center px-6 opacity-80">
                  <Image
                    src="/unitec-logo.png"
                    alt="UNITEC USA Design"
                    width={130}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                </div>,
                <div key={`bi-${dup}`} className="flex items-center gap-2.5 px-6 opacity-85">
                  <Image src="/logo.png" alt="Building Innovation" width={30} height={30} className="h-7 w-auto" />
                  <span className="font-heading font-extrabold text-base text-[#142d3d] whitespace-nowrap">
                    BUILDING INNOVATION
                  </span>
                </div>,
                <div key={`tech-${dup}`} className="flex items-center gap-2 px-6 opacity-85">
                  <Bot className="w-6 h-6 text-[#d68a50]" />
                  <span className="font-heading font-extrabold text-base text-[#245b77] whitespace-nowrap">
                    BUILDING TECH · AI
                  </span>
                </div>,
                <div key={`iso-${dup}`} className="flex items-center gap-2 px-6 opacity-75">
                  <ShieldCheck className="w-5 h-5 text-[#278d62]" />
                  <span className="font-heading font-bold text-sm text-[#17242e] whitespace-nowrap">
                    ISO 9001 PARTNER FACTORIES
                  </span>
                </div>,
              ])}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {h.clients.profiles.map((profile, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#e5e7e5] px-5 py-4 flex items-center gap-3 font-semibold text-sm text-[#17242e]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#d68a50] shrink-0" />
                <span>{profile}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Últimas Noticias (3 artículos) */}
      <section className="py-20 bg-white">
        <div className="bi-wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="bi-eyebrow">{h.news.eyebrow}</p>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2">
                {h.news.title}
              </h2>
            </div>
            <Link
              href="/blog"
              className="bi-pill-btn border border-[#142d3d]/20 text-[#142d3d] hover:bg-[#f4f1eb]"
            >
              <span>{h.news.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogs.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bi-card overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform"
              >
                <div className="relative h-52 w-full bg-[#142d3d]">
                  <Image
                    src={post.image}
                    alt={isEs ? post.title : post.title_en || post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#d68a50]">
                      {isEs ? post.category : post.category_en || post.category}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[#17242e] mt-2 line-clamp-2 group-hover:text-[#245b77]">
                      {isEs ? post.title : post.title_en || post.title}
                    </h3>
                    <p className="text-sm text-[#66737c] mt-2 line-clamp-2">
                      {isEs ? post.excerpt : post.excerpt_en || post.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#142d3d] mt-4">
                    <span>{h.news.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Cierre de Contacto */}
      <section className="py-16 bg-[#142d3d] text-white">
        <div className="bi-wrap">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                {h.closing.title}
              </h2>
              <p className="text-[#d4dce1] mt-3 text-base sm:text-lg">
                {h.closing.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={siteSettings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{h.closing.whatsapp}</span>
              </a>
              <a
                href={siteSettings.primary_phone_href}
                className="bi-pill-btn bg-white text-[#142d3d] hover:bg-[#f4f1eb]"
              >
                <Phone className="w-4 h-4" />
                <span>{h.closing.call}</span>
              </a>
              <a
                href={`mailto:${siteSettings.public_email}`}
                className="bi-pill-btn bg-white/15 hover:bg-white/25 text-white border border-white/20"
              >
                <Mail className="w-4 h-4" />
                <span>{h.closing.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
