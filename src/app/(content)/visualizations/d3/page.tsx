'use client';

import { D3Playground } from '@/components/previews/D3Playground';
import { useLanguage } from '@/contexts/LanguageContext';
import { getI18nText } from '@/i18n';

interface D3Content {
  title: string;
  description: string;
}

export default function D3Page() {
  const { language } = useLanguage();
  const content = getI18nText<D3Content>(language, 'visualizations.d3');

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">{content.title}</h1>
        <p className="text-gray-300 mb-8">{content.description}</p>
        <D3Playground />
      </div>
    </main>
  );
} 