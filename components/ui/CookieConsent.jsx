'use client';

import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { useLanguage } from '../../utils/LanguageContext';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { isEs } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem('cookieConsent', choice);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[99990] max-w-md bg-[#142d3d] text-white p-4 rounded-2xl shadow-2xl border border-white/15">
      <div className="flex items-start gap-3">
        <Cookie className="w-5 h-5 text-[#d68a50] shrink-0 mt-0.5" />
        <p className="text-xs text-[#d4dce1] leading-relaxed">
          {isEs
            ? 'Usamos cookies para mejorar tu experiencia de navegación y recordar tu idioma.'
            : 'We use cookies to improve your browsing experience and remember your language preference.'}
        </p>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => handleChoice('declined')}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          {isEs ? 'Rechazar' : 'Decline'}
        </button>
        <button
          type="button"
          onClick={() => handleChoice('accepted')}
          className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-[#d68a50] hover:bg-[#c27941] text-white transition-colors cursor-pointer"
        >
          {isEs ? 'Aceptar' : 'Accept'}
        </button>
      </div>
    </div>
  );
}
