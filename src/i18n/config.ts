import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales
export const locales = ['en', 'ko', 'th'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

// Locale display names
export const localeNames = {
  en: 'English',
  ko: '한국어',
  th: 'ไทย'
} as const;

// Locale flags
export const localeFlags = {
  en: '🇺🇸',
  ko: '🇰🇷',
  th: '🇹🇭'
} as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default
  };
}); 