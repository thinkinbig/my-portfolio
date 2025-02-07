'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Add pt-16 to account for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 animate-fade-in space-y-6">
              <div className="inline-block">
                <h1 className="text-5xl lg:text-7xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {getI18nText(language, 'hero.title')}
                </h1>
                <div className="h-1 w-1/3 bg-gradient-to-r from-primary to-transparent rounded-full" />
              </div>
              <p className="text-xl text-secondary">
                {getI18nText(language, 'hero.role')}
              </p>
              <p className="text-lg leading-relaxed">
                {getI18nText(language, 'hero.introduction')}
              </p>
              <div className="flex gap-4">
                <Link 
                  href="#projects" 
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {getI18nText(language, 'hero.viewProjects')}
                </Link>
                <Link 
                  href="#contact" 
                  className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  {getI18nText(language, 'hero.contactMe')}
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 lg:w-96 lg:h-96">
                <Image
                  src="/crystal.svg"
                  alt="Crystal Logo"
                  fill
                  className="dark:invert animate-float"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <section className="bg-foreground/5 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {getI18nText(language, 'sections.experience')}
            </h2>
            <div className="space-y-8">
              {/* 这里将放置工作经历时间线 */}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {getI18nText(language, 'sections.contact')}
          </h2>
          <div className="flex justify-center space-x-8">
            {/* 这里将放置社交媒体链接和联系方式 */}
          </div>
        </section>
      </div>
    </div>
  );
}
