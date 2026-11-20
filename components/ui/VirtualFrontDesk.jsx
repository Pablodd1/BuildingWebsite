'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, MessageCircle, Phone, X } from 'lucide-react';
import { siteSettings } from '../../utils/siteSettings';
import { useLanguage } from '../../utils/LanguageContext';

export function openBuildingAssistant() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-bi-assistant'));
  }
}

export default function VirtualFrontDesk() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCatalogPrompt, setShowCatalogPrompt] = useState(false);
  const [dismissedPrompt, setDismissedPrompt] = useState(false);
  const pathname = usePathname();
  const { bi } = useLanguage();

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setShowCatalogPrompt(false);
    };
    window.addEventListener('open-bi-assistant', handleOpen);
    return () => window.removeEventListener('open-bi-assistant', handleOpen);
  }, []);

  useEffect(() => {
    if (pathname?.startsWith('/catalogo') && !dismissedPrompt && !isOpen) {
      setShowCatalogPrompt(true);
    } else if (!pathname?.startsWith('/catalogo')) {
      setShowCatalogPrompt(false);
    }
  }, [pathname, dismissedPrompt, isOpen]);

  const iframeUrl = `${siteSettings.chatbot_url}?embed=true&brandId=${siteSettings.chatbot_brand_id}`;

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-[94px] right-5 w-[400px] h-[680px] max-w-[calc(100vw-24px)] max-h-[calc(100vh-120px)] rounded-[28px] overflow-hidden bg-white shadow-[0_18px_55px_rgba(16,36,50,0.25)] border border-[#e5e7e5] z-[999999]">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={bi.assistant.closeLabel}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#142d3d] text-white flex items-center justify-center shadow hover:bg-[#d68a50] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <iframe
            src={iframeUrl}
            title="Building Innovation AI Front Desk Assistant"
            allow="clipboard-read; clipboard-write; microphone; autoplay"
            className="w-full h-full border-none bg-white"
          />
        </div>
      )}

      {/* Proactive Catalog Assistant Bubble */}
      {showCatalogPrompt && !isOpen && (
        <div className="fixed bottom-[132px] right-5 z-[999990] w-[305px] max-w-[calc(100vw-28px)] bg-white rounded-[22px] p-4 shadow-[0_18px_45px_rgba(16,36,50,0.18)] border border-[#e5e7e5]">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#d68a50]">
              <span className="w-2 h-2 rounded-full bg-[#278d62] animate-pulse" />
              {bi.assistant.onlineBadge}
            </span>
            <button
              type="button"
              onClick={() => {
                setShowCatalogPrompt(false);
                setDismissedPrompt(true);
              }}
              aria-label={bi.assistant.closeLabel}
              className="text-[#66737c] hover:text-[#17242e] p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="font-heading font-extrabold text-[17px] text-[#17242e] leading-tight">
            {bi.assistant.promptTitle}
          </p>
          <p className="text-[13px] text-[#66737c] mt-1 leading-snug">
            {bi.assistant.promptBody}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setShowCatalogPrompt(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#d68a50] hover:bg-[#c27941] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{bi.assistant.promptChat}</span>
            </button>
            <a
              href={siteSettings.primary_phone_href}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#142d3d] hover:bg-[#245b77] text-white text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{bi.assistant.promptCall}</span>
            </a>
          </div>
        </div>
      )}

      {/* Bottom-Right Floating Stack: AI Assistant + WhatsApp */}
      <div className="fixed bottom-5 right-5 z-[999999] flex flex-col items-end gap-2.5">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? bi.assistant.closeLabel : bi.assistant.openLabel}
          className="inline-flex items-center gap-2 px-4 h-12 rounded-full bg-[#d68a50] hover:bg-[#c27941] text-white shadow-[0_12px_30px_rgba(214,138,80,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer text-xs font-bold"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
          <span>{bi.assistant.openLabel}</span>
        </button>

        <a
          href={siteSettings.whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={bi.assistant.whatsappLabel}
          className="inline-flex items-center gap-2 px-4 h-12 rounded-full bg-[#278d62] hover:bg-[#1f7450] text-white shadow-[0_12px_30px_rgba(39,141,98,0.35)] hover:-translate-y-0.5 transition-all text-xs font-bold"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{bi.assistant.whatsappLabel}</span>
        </a>
      </div>
    </>
  );
}
