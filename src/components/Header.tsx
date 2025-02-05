'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/i18n';

const languages: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
  zh: '中文'
} as const;

export function Header() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm border-b border-foreground/10 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-lg font-semibold">
          Zeyu Li
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-foreground/5 transition-colors"
          >
            <span>{languages[language]}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-1 py-1 w-32 bg-background rounded-md shadow-lg border border-foreground/10">
              {Object.entries(languages).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code as Language);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-foreground/5 transition-colors ${
                    language === code ? 'text-primary' : ''
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 