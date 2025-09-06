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