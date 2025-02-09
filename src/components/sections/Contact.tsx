'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";

type ContactInfo = {
  label: string;
  value: string;
};

export function Contact() {
  const { language } = useLanguage();

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      key: 'email'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      key: 'github'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      key: 'linkedin'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      key: 'location'
    }
  ];

  return (
    <section className="container mx-auto px-4 py-20" id="contact">
      <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">
        {getI18nText(language, 'contact.title')}
      </h2>
      <div className="max-w-2xl mx-auto grid gap-6">
        {contactInfo.map(({ icon, key }) => {
          const info = getI18nText<ContactInfo>(language, `contact.${key}`);
          if (!info.value) return null;

          return (
            <div 
              key={key}
              className="flex items-center p-4 bg-foreground/5 rounded-lg hover:bg-foreground/10 transition-colors animate-fade-in"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                {icon}
              </div>
              <div>
                <div className="text-sm text-secondary">{info.label}</div>
                <a 
                  href={info.value.match(/\((.*?)\)/)?.[1] || info.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary transition-colors"
                >
                  {info.value.match(/\[(.*?)\]/)?.[1] || info.value}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
} 