import { translations } from './translations';

export function getDictionary(lang) {
  return translations[lang] || translations.en;
}

export const locales = ['en', 'es'];
export const defaultLocale = 'es';
