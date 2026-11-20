import siteSettingsData from '../static_data/site_settings.json';

export const siteSettings = siteSettingsData;

export function getWhatsappLink(customMessage = '') {
  const base = siteSettings.whatsapp_url;
  if (!customMessage) return base;
  return `${base}?text=${encodeURIComponent(customMessage)}`;
}

export function getAdvisorWhatsappLink(whatsappNumber, customMessage = '') {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!customMessage) return base;
  return `${base}?text=${encodeURIComponent(customMessage)}`;
}

export default siteSettings;
