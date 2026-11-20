'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  UserCheck,
} from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';
import { siteSettings } from '../../utils/siteSettings';

const TikTokIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function ContactClient() {
  const { bi, isEs } = useLanguage();
  const c = bi.contactPage;

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    reason: 'Cotización de materiales',
    message: '',
    _hp: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [refId, setRefId] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Error');
        return;
      }
      setRefId(data.ref || '');
      setStatus('success');
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        reason: c.fields.reasons[0],
        message: '',
        _hp: '',
      });
    } catch {
      setStatus('error');
      setErrorMsg(isEs ? 'No pudimos enviar el formulario. Intenta por WhatsApp.' : 'Submission failed. Please reach us on WhatsApp.');
    }
  };

  return (
    <main className="w-full bg-white">
      {/* 1. Banner */}
      <section className="bg-[#f4f1eb] border-b border-[#e5e7e5] py-16">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{c.eyebrow}</p>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#17242e] mt-2 max-w-3xl">
            {c.title}
          </h1>
          <p className="text-[#66737c] mt-3 max-w-2xl text-base">{c.subtitle}</p>
        </div>
      </section>

      {/* 2. Contacto Inmediato (3 botones grandes con ícono) */}
      <section className="py-14 bg-white">
        <div className="bi-wrap grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[22px] bg-[#f4f1eb] p-8 text-center flex flex-col items-center justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#278d62] text-white flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#17242e]">{c.immediate.waTitle}</h2>
              <p className="text-sm text-[#66737c] mt-2">{c.immediate.waDesc}</p>
            </div>
            <a
              href={siteSettings.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bi-pill-btn bg-[#278d62] hover:bg-[#1f7450] text-white"
            >
              <span>{c.immediate.waBtn}</span>
            </a>
          </div>

          <div className="rounded-[22px] bg-[#f4f1eb] p-8 text-center flex flex-col items-center justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#142d3d] text-white flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#17242e]">{c.immediate.callTitle}</h2>
              <p className="text-base font-bold text-[#142d3d] mt-2">{siteSettings.primary_phone}</p>
            </div>
            <a
              href={siteSettings.primary_phone_href}
              className="mt-6 bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white"
            >
              <span>{c.immediate.callBtn}</span>
            </a>
          </div>

          <div className="rounded-[22px] bg-[#f4f1eb] p-8 text-center flex flex-col items-center justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#d68a50] text-white flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#17242e]">{c.immediate.emailTitle}</h2>
              <p className="text-sm font-semibold text-[#142d3d] mt-2 break-all">
                {siteSettings.public_email}
              </p>
            </div>
            <a
              href={`mailto:${siteSettings.public_email}?subject=${encodeURIComponent(
                '[Web - Building Innovation] Contacto Comercial'
              )}`}
              className="mt-6 bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white"
            >
              <span>{c.immediate.emailBtn}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Equipo Comercial (4 asesores por área) */}
      <section className="py-14 bg-[#f4f1eb]">
        <div className="bi-wrap">
          <p className="bi-eyebrow">{c.teamEyebrow}</p>
          <h2 className="font-heading font-extrabold text-3xl text-[#17242e] mt-2 mb-8">
            {c.teamTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {siteSettings.advisors.map((adv) => (
              <div key={adv.id} className="bi-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#f6e7da] text-[#d68a50] flex items-center justify-center mb-4">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#17242e]">{adv.name}</h3>
                  <p className="text-xs font-semibold text-[#245b77] mt-1">
                    {isEs ? adv.role_es : adv.role_en}
                  </p>
                  <p className="text-xs text-[#66737c] mt-2">{adv.phone}</p>
                </div>

                <div className="mt-5 flex gap-2">
                  <a
                    href={adv.whatsapp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2 rounded-full bg-[#278d62] hover:bg-[#1f7450] text-white text-xs font-bold"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={adv.phone_href}
                    className="flex-1 text-center px-3 py-2 rounded-full bg-[#142d3d] hover:bg-[#245b77] text-white text-xs font-bold"
                  >
                    {bi.common.callNow}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Formulario Corto + 5. Showroom Doral */}
      <section className="py-20 bg-white">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Short Form */}
          <div className="lg:col-span-6">
            <p className="bi-eyebrow">{c.formEyebrow}</p>
            <h2 className="font-heading font-extrabold text-3xl text-[#17242e] mt-2">
              {c.formTitle}
            </h2>
            <p className="text-sm text-[#66737c] mt-2 mb-6">{c.formDesc}</p>

            {status === 'success' ? (
              <div className="bi-card p-8 border-l-4 border-l-[#278d62] bg-[#f4f1eb]/50 space-y-3">
                <div className="flex items-center gap-2 text-[#278d62] font-heading font-bold text-xl">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{c.formSuccessTitle}</span>
                </div>
                <p className="text-sm text-[#17242e]">{c.formSuccessDesc}</p>
                {refId && (
                  <p className="text-xs font-mono text-[#66737c]">Ref: {refId}</p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={form._hp}
                  onChange={(e) => setForm({ ...form, _hp: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={c.fields.name}
                    className="w-full px-4 py-3 rounded-xl border border-[#d9dfe0] text-sm focus:outline-none focus:border-[#245b77]"
                  />
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder={c.fields.company}
                    className="w-full px-4 py-3 rounded-xl border border-[#d9dfe0] text-sm focus:outline-none focus:border-[#245b77]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={c.fields.email}
                    className="w-full px-4 py-3 rounded-xl border border-[#d9dfe0] text-sm focus:outline-none focus:border-[#245b77]"
                  />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={c.fields.phone}
                    className="w-full px-4 py-3 rounded-xl border border-[#d9dfe0] text-sm focus:outline-none focus:border-[#245b77]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder={c.fields.country}
                    className="w-full px-4 py-3 rounded-xl border border-[#d9dfe0] text-sm focus:outline-none focus:border-[#245b77]"
                  />
                  <select
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    aria-label={c.fields.reason}
                    className="w-full px-4 py-3 rounded-xl border border-[#d9dfe0] text-sm bg-white focus:outline-none focus:border-[#245b77]"
                  >
                    {c.fields.reasons.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={c.fields.message}
                  className="w-full px-4 py-3 rounded-xl border border-[#d9dfe0] text-sm focus:outline-none focus:border-[#245b77]"
                />
                {status === 'error' && errorMsg && (
                  <p className="text-xs font-semibold text-red-600">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bi-pill-btn bg-[#d68a50] hover:bg-[#c27941] text-white cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? c.fields.submitting : c.fields.submit}</span>
                </button>
              </form>
            )}
          </div>

          {/* Showroom Doral + Google Maps */}
          <div className="lg:col-span-6 space-y-5">
            <p className="bi-eyebrow">{c.showroomEyebrow}</p>
            <h2 className="font-heading font-extrabold text-3xl text-[#17242e] mt-2">
              {c.showroomTitle}
            </h2>
            <div className="bi-card p-6 space-y-3 bg-[#f4f1eb]/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d68a50] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#17242e] text-sm">{siteSettings.doral_address}</p>
                  <p className="text-xs text-[#66737c] mt-1">{siteSettings.medellin_showroom}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#d68a50] shrink-0" />
                <p className="text-sm text-[#17242e]">
                  <strong className="mr-1">{c.hoursLabel}:</strong>
                  {isEs ? siteSettings.doral_hours_es : siteSettings.doral_hours_en}
                </p>
              </div>
              <a
                href={siteSettings.doral_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bi-pill-btn bg-[#142d3d] hover:bg-[#245b77] text-white mt-2"
              >
                <span>{c.mapsBtn}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="rounded-[22px] overflow-hidden border border-[#e5e7e5] h-[270px] bg-[#f4f1eb]">
              <iframe
                title="Building Innovation Doral Miami Showroom"
                src="https://maps.google.com/maps?q=6120%20NW%2074th%20Ave,%20Doral,%20FL%2033166&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Preguntas Frecuentes + 7. Redes Sociales (@building.innovation) */}
      <section className="py-16 bg-[#f4f1eb]">
        <div className="bi-wrap grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="bi-eyebrow">{c.faqEyebrow}</p>
            <h2 className="font-heading font-extrabold text-3xl text-[#17242e] mt-2 mb-6">
              {c.faqTitle}
            </h2>
            <div className="space-y-3">
              {c.faqs.map((f, idx) => {
                const open = openFaq === idx;
                return (
                  <div key={idx} className="bi-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-[#17242e] cursor-pointer"
                    >
                      <span>{f.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#d68a50] shrink-0 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-6 pb-5 text-sm text-[#66737c] leading-relaxed">
                        {f.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[24px] bg-[#142d3d] text-white p-8 h-full flex flex-col justify-between">
              <div>
                <p className="bi-eyebrow">{c.socialEyebrow}</p>
                <h2 className="font-heading font-extrabold text-3xl text-white mt-2">
                  {c.socialTitle}
                </h2>
                <p className="text-[#d4dce1] text-sm mt-3 leading-relaxed">
                  {isEs
                    ? 'Sigue lanzamientos de colecciones, proyectos instalados y avances de Building Tech en nuestros perfiles oficiales.'
                    : 'Follow new collection drops, installed projects, and Building Tech updates across our official channels.'}
                </p>
              </div>
              <div className="mt-8 space-y-3">
                <a
                  href={siteSettings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/10 hover:bg-[#d68a50] transition-colors text-sm font-bold"
                >
                  <span className="inline-flex items-center gap-3">
                    <Instagram className="w-5 h-5" />
                    <span>Instagram · @building.innovation</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={siteSettings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/10 hover:bg-[#d68a50] transition-colors text-sm font-bold"
                >
                  <span className="inline-flex items-center gap-3">
                    <Facebook className="w-5 h-5" />
                    <span>Facebook · @building.innovation</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={siteSettings.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white/10 hover:bg-[#d68a50] transition-colors text-sm font-bold"
                >
                  <span className="inline-flex items-center gap-3">
                    <TikTokIcon className="w-5 h-5" />
                    <span>TikTok · @building.innovation</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
