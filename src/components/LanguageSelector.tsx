'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { locales, localeNames, localeFlags } from '@/i18n/config';

interface LanguageSelectorProps {
  currentLocale?: string;
  className?: string;
}

export default function LanguageSelector({ currentLocale = 'en', className = '' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (locale: string) => {
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 shadow-sm"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {localeFlags[currentLocale as keyof typeof localeFlags]} {localeNames[currentLocale as keyof typeof localeNames]}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : -10,
          scale: isOpen ? 1 : 0.95
        }}
        transition={{ duration: 0.2 }}
        className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="py-2">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              onClick={() => handleLanguageChange(locale)}
              className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 ${
                currentLocale === locale ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{localeFlags[locale as keyof typeof localeFlags]}</span>
              <span className="flex-1 text-sm font-medium">
                {localeNames[locale as keyof typeof localeNames]}
              </span>
              {currentLocale === locale && (
                <Check className="w-4 h-4 text-indigo-600" />
              )}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}