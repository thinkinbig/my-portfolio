'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Header } from "@/components/layout/Header";
import { Project } from "@/types/project";

export default function TUMSysProg() {
  const { language } = useLanguage();
  const project = (getI18nText<Project[]>(language, 'projects.items')).find(p => p.id === 'tum-sysprog');

  if (!project) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 container mx-auto px-4 pb-16">
        {/* Navigation */}
        <nav className="mb-12">
          <Link 
            href="/"
            className="group inline-flex items-center px-4 py-2 rounded-xl 
              bg-primary/5 hover:bg-primary/10 text-primary 
              transition-all duration-300 hover:shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {getI18nText(language, 'projects.backToHome')}
          </Link>
        </nav>

        {/* Main Content */}
        <div className="space-y-12 max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-transparent rounded-full" />
          </div>

          {/* Content Sections */}
          <div className="prose dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="bg-foreground/5 rounded-2xl p-8 mb-12">
              <h2 className="flex items-center text-2xl font-bold text-primary mb-6">
                <span className="w-2 h-8 bg-primary rounded-full mr-3" />
                {getI18nText(language, 'projects.details.introduction')}
              </h2>
              <div className="text-lg leading-relaxed">
                <ReactMarkdown>{project.introduction}</ReactMarkdown>
              </div>
            </section>

            {/* Architecture */}
            {project.architecture && (
              <section className="bg-foreground/5 rounded-2xl p-8 mb-12">
                <h2 className="flex items-center text-2xl font-bold text-primary mb-6">
                  <span className="w-2 h-8 bg-primary rounded-full mr-3" />
                  {project.architecture.title}
                </h2>
                <div className="text-lg leading-relaxed mb-8">
                  <ReactMarkdown>{project.architecture.description}</ReactMarkdown>
                </div>
                {project.architecture.architectureImage && (
                  <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={project.architecture.architectureImage}
                      alt="Architecture Diagram"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </section>
            )}

            {/* Requirements */}
            <section className="bg-foreground/5 rounded-2xl p-8 mb-12">
              <h2 className="flex items-center text-2xl font-bold text-primary mb-6">
                <span className="w-2 h-8 bg-primary rounded-full mr-3" />
                {getI18nText(language, 'projects.details.requirements')}
              </h2>
              <ul className="space-y-4">
                {project.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 mr-3 flex-shrink-0" />
                    <ReactMarkdown>{req}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            </section>

            {/* Technologies */}
            <section className="bg-foreground/5 rounded-2xl p-8 mb-12">
              <h2 className="flex items-center text-2xl font-bold text-primary mb-6">
                <span className="w-2 h-8 bg-primary rounded-full mr-3" />
                {getI18nText(language, 'projects.details.technologies')}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.technologies.map((tech, index) => (
                  <li key={index} className="flex items-start p-4 rounded-lg bg-background hover:shadow-md transition-shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 mr-3 flex-shrink-0" />
                    <ReactMarkdown>{tech}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            </section>

            {/* Challenges */}
            <section className="bg-foreground/5 rounded-2xl p-8">
              <h2 className="flex items-center text-2xl font-bold text-primary mb-6">
                <span className="w-2 h-8 bg-primary rounded-full mr-3" />
                {getI18nText(language, 'projects.details.challenges')}
              </h2>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 mr-3 flex-shrink-0" />
                    <ReactMarkdown>{challenge}</ReactMarkdown>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 