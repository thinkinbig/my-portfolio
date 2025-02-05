'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";
import { Header } from "@/components/layout/Header";
import Image from "next/image";

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
            <div className="lg:w-1/2 animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {getI18nText(language, 'hero.title')}
              </h1>
              <p className="text-xl text-secondary mb-8">
                {getI18nText(language, 'hero.role')}
              </p>
              <p className="text-lg mb-8">
                {getI18nText(language, 'hero.introduction')}
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <Image
                src="/crystal.svg"
                alt="Crystal Logo"
                width={300}
                height={300}
                className="dark:invert animate-fade-in"
                priority
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-foreground/5 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              {getI18nText(language, 'sections.skills')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* 这里将放置技术栈卡片 */}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {getI18nText(language, 'sections.projects')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 这里将放置项目卡片 */}
          </div>
        </section>

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
