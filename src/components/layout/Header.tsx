'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getI18nText } from '@/i18n';
import type { Language } from '@/i18n';
import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';

const languages: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
  zh: '中文'
} as const;

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm border-b border-foreground/10 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="header" />
          <div>
            <div className="font-semibold">
              {getI18nText(language, 'header.name')}
            </div>
            <div className="text-xs text-secondary">
              {getI18nText(language, 'header.title')}
            </div>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-4">
            <Link 
              href="/visualizations"
              className="px-4 py-2 rounded-md hover:bg-foreground/5 transition-colors"
            >
              {getI18nText(language, 'header.navigation.visualizations')}
            </Link>
            <a
              href="https://notion-next-nine-iota-64.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md hover:bg-foreground/5 transition-colors"
            >
              {getI18nText(language, 'header.navigation.blog')}
            </a>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-foreground/5 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                />
              </svg>
            )}
          </button>

          {/* Language Switcher */}
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
      </div>
    </header>
  );
} 