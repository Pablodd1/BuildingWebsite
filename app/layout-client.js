'use client';

import Footer from '../components/footer/main';
import NavBar from '../components/navbar/main';
import VirtualFrontDesk from '../components/ui/VirtualFrontDesk';
import CookieConsent from '../components/ui/CookieConsent';
import Providers from './providers';

export default function RootLayoutClient({ children, lang }) {
  return (
    <Providers lang={lang}>
      <div className="min-h-screen flex flex-col bg-white text-[#17242e]">
        <NavBar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
      <VirtualFrontDesk />
      <CookieConsent />
    </Providers>
  );
}
