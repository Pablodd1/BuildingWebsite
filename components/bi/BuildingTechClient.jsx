'use client';

import Image from 'next/image';
import {
  BarChart3,
  Bot,
  CheckCircle2,
  Clock,
  Code2,
  Mail,
  MessageCircle,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings, getWhatsappLink } from '../../utils/siteSettings';
import { openBuildingAssistant } from '../ui/VirtualFrontDesk';

const SERVICE_ICONS = [Bot, Smartphone, Code2];
const BENEFIT_ICONS = [Clock, TrendingUp, Users, Sparkles, BarChart3];

export default function BuildingTechClient() {
  const { bi, isEs } = useLanguage();
  const t = bi.techPage;

  const demoWaUrl = getWhatsappLink(
    isEs
      ? 'Hola Building Tech, quiero agendar una demo de sus herramientas de IA para mi empresa.'
      : 'Hello Building Tech, I would like to schedule a demo of your AI tools for my business.'
  );

  const appAccessWaUrl = getWhatsappLink(
    isEs
      ? 'Hola Building Tech, quiero acceso / enlace de descarga de Building IA App.'
      : 'Hello Building Tech, I would like access / download link for Building IA App.'
  );

  return (
    <main className="w-full">
      {/* 1. Banner Principal */}
      <section className="relative min-h-[500px] flex items-center text-white bg-[#142d3d] overflow-hidden">
        <Image
          src="/raster/blog/inteligencia-artificial-construccion-remodelacion-portada-unitec.webp"
          alt={t.heroTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, rgba(16,31,41,0.94) 0%, rgba(20,45,61,0.78) 60%, rgba(36,91,119,0.5) 100%)',
          }}
        />
        <div className="bi-wrap relative z-10 py-20">
          <div className="max-w-3xl">
            <p className="bi-eyebrow">{t.eyebrow}</p>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[58px] leading-[1.05] text-white mt-3">
              {t.heroTitle}
            </h1>
            <p className="text-[#e3e8eb] text-base sm:text-lg leading-relaxed mt-5 max-w-2xl">
              {t.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href={demoWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-white text-[#142d3d] hover:bg-[#f4f1eb]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.heroPrimary}</span>
              </a>
              <button
                type="button"
                onClick={openBuildingAssistant}
                className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>{t.heroSecondary}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Qué es Building Tech */}
      <section className="py-20 bg-white">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="bi-eyebrow">{t.whatEyebrow}</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] leading-tight">
              {t.whatTitle}
            </h2>
            <p className="text-[#66737c] leading-relaxed">{t.whatP1}</p>
            <p className="text-[#66737c] leading-relaxed">{t.whatP2}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {t.whatHighlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-bold text-[#142d3d]">
                  <CheckCircle2 className="w-4 h-4 text-[#d68a50] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] rounded-[24px] overflow-hidden shadow-[0_18px_50px_rgba(16,36,50,0.1)]">
            <Image
              src="/raster/blog/inteligencia-artificial-remodelacion-antes-despues-unitec.webp"
              alt="Building Tech — IA en operación real"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Lo que hacemos (3 tarjetas) */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{t.servicesEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {t.servicesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.services.map((srv, idx) => {
              const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
              return (
                <div key={idx} className="bi-card p-7">
                  <div className="w-12 h-12 rounded-2xl bg-[#f6e7da] text-[#d68a50] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#17242e]">{srv.title}</h3>
                  <p className="text-sm text-[#66737c] leading-relaxed mt-2.5">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Producto Estrella #1: Asistente Virtual con IA */}
      <section className="py-20 bg-white">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="bi-eyebrow">{t.botEyebrow}</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e]">
              {t.botTitle}
            </h2>
            <p className="text-[#66737c] leading-relaxed">{t.botDesc}</p>
            <ul className="space-y-2.5">
              {t.botFunctions.map((fn, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#17242e]">
                  <CheckCircle2 className="w-4 h-4 text-[#d68a50] shrink-0 mt-0.5" />
                  <span>{fn}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={openBuildingAssistant}
              className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>{t.botCta}</span>
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="bi-card p-6 bg-[#f4f1eb]/70">
              <div className="relative h-64 w-full rounded-[16px] overflow-hidden mb-5">
                <Image
                  src="/raster/blog/asistente-virtual-ia-chatbot-unitec.webp"
                  alt="Asistente virtual con IA de Building Tech"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-white rounded-2xl p-4 border border-[#e5e7e5] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#245b77]">
                  <span className="w-2 h-2 rounded-full bg-[#278d62]" />
                  <span>Building AI Assistant · Online 24/7</span>
                </div>
                <p className="text-sm text-[#17242e] bg-[#f4f1eb] rounded-xl px-4 py-2.5">
                  {isEs
                    ? '¡Hola! Puedo recomendarte acabados, comparar especificaciones en pulgadas o metros y pasarte con un asesor.'
                    : 'Hi! I can recommend finishes, compare specs in inches or meters, and connect you with a sales specialist.'}
                </p>
                <button
                  type="button"
                  onClick={openBuildingAssistant}
                  className="w-full bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>{t.botCta}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Producto Estrella #2: Building IA App */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative h-[420px] rounded-[24px] overflow-hidden shadow-[0_18px_50px_rgba(16,36,50,0.12)] border border-[#e5e7e5]">
              <Image
                src="/raster/blog/inteligencia-artificial-remodelacion-app-building-innovation.webp"
                alt="Building IA App — Visualizador móvil con IA"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <p className="bi-eyebrow">{t.appEyebrow}</p>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e]">
              {t.appTitle}
            </h2>
            <p className="text-[#66737c] leading-relaxed">{t.appDesc}</p>
            <div className="space-y-2.5">
              {t.appSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#e5e7e5] px-4 py-3 text-sm font-semibold text-[#17242e]"
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={appAccessWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
              >
                <Smartphone className="w-4 h-4" />
                <span>{t.appStoreBtn}</span>
              </a>
              <a
                href={appAccessWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn border border-[#142d3d]/25 text-[#142d3d] hover:bg-white"
              >
                <Smartphone className="w-4 h-4" />
                <span>{t.playStoreBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Desarrollos a la medida */}
      <section className="py-20 bg-white">
        <div className="bi-wrap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="bi-eyebrow">{t.customEyebrow}</p>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2">
                {t.customTitle}
              </h2>
            </div>
            <a
              href={demoWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white shrink-0"
            >
              <span>{t.customCta}</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.customSteps.map((st) => (
              <div key={st.step} className="bi-card p-6 border-t-4 border-t-[#245b77]">
                <span className="font-heading font-extrabold text-3xl text-[#d68a50] block">
                  {st.step}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#17242e] mt-3">{st.title}</h3>
                <p className="text-sm text-[#66737c] mt-2 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Beneficios + 8. Sectores */}
      <section className="py-20 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{t.benefitsEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {t.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.benefits.map((ben, idx) => {
              const Icon = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];
              return (
                <div key={idx} className="bi-card p-6">
                  <div className="w-10 h-10 rounded-xl bg-[#f6e7da] text-[#d68a50] flex items-center justify-center mb-3.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17242e]">{ben.title}</h3>
                  <p className="text-xs text-[#66737c] mt-2 leading-relaxed">{ben.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-white rounded-2xl border border-[#e5e7e5] p-6 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#245b77] mr-2">
              {t.sectorsEyebrow}:
            </span>
            {t.sectors.map((sec, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full bg-[#f4f1eb] text-[#17242e] text-xs font-bold"
              >
                {sec}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Clientes (UNITEC USA Design & Building Innovation) */}
      <section className="py-20 bg-white">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{t.clientsEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#17242e] mt-2 mb-10">
            {isEs ? 'Ya trabajan con nuestras soluciones' : 'Already powering live businesses'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.clients.map((cl, idx) => (
              <div key={idx} className="bi-card p-8 space-y-4">
                <div className="h-10 flex items-center">
                  <Image
                    src={cl.logo}
                    alt={cl.name}
                    width={140}
                    height={40}
                    className="h-9 w-auto object-contain"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#17242e]">{cl.name}</h3>
                <p className="text-sm text-[#66737c] leading-relaxed">{cl.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Cierre */}
      <section className="py-16 bg-[#142d3d] text-white">
        <div className="bi-wrap flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-extrabold text-3xl text-white">{t.closingTitle}</h2>
            <p className="text-[#d4dce1] mt-2">{t.closingDesc}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={demoWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{bi.common.scheduleDemo}</span>
            </a>
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bi-pill-btn bg-white text-[#142d3d] hover:bg-[#f4f1eb]"
            >
              <span>{bi.common.whatsapp}</span>
            </a>
            <a
              href={`mailto:${siteSettings.public_email}?subject=${encodeURIComponent(
                '[Web - Building Innovation] Demo Building Tech'
              )}`}
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
