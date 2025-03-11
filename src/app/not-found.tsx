'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { i18n } from '@/i18n';
import { Header } from "@/components/layout/Header";
import Image from "next/image";

export default function NotFound() {
  const { language } = useLanguage();
  const content = i18n[language].notFound;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative w-48 h-48 mx-auto mb-8 animate-float">
            <Image
              src="/crystal.svg"
              alt="404"
              fill
              className="dark:invert"
            />
          </div>
          
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold mb-4">
            {content.title}
          </h2>
          <p className="text-secondary mb-8">
            {content.description}
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-xl 
              bg-primary/10 hover:bg-primary/20 text-primary 
              transition-all duration-300 hover:shadow-md group"
          >
            <svg
              className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            {content.backHome}
          </Link>
        </div>
      </main>
    </div>
  );
} 