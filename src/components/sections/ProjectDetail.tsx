'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Tag } from "@/components/ui/Tag";
import ReactMarkdown from 'react-markdown';

type DetailSection = {
  title: string;
  content: string[] | string;
};

function DetailBlock({ title, content }: DetailSection) {
  const linkStyle = "text-primary font-medium hover:underline inline-flex items-center gap-1 after:content-['↗'] after:text-xs";

  return (
    <div className="mb-12 animate-fade-in">
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
          {title.includes('技术') ? (
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          ) : title.includes('要求') ? (
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ) : title.includes('挑战') ? (
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
      </div>

      {Array.isArray(content) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map((item, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-foreground/10 bg-background hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              style={{ 
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              <ReactMarkdown
                components={{
                  h3: ({...props}) => (
                    <h3 className="text-lg font-semibold mb-3 text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      <span {...props} />
                    </h3>
                  ),
                  h4: ({...props}) => (
                    <h4 className="text-base font-medium mb-2 text-primary/80 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary/40" />
                      <span {...props} />
                    </h4>
                  ),
                  ul: ({...props}) => (
                    <ul className="space-y-2 ml-4" {...props} />
                  ),
                  li: ({...props}) => (
                    <li className="text-secondary hover:text-foreground transition-colors flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/20" {...props} />
                  ),
                  strong: ({...props}) => (
                    <strong className="font-semibold text-primary/90" {...props} />
                  ),
                }}
              >
                {item}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      ) : (
        <div className="prose prose-primary dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h3: ({...props}) => (
                <h3 className="text-xl font-semibold mb-3 text-primary/90" {...props} />
              ),
              h4: ({...props}) => (
                <h4 className="text-lg font-medium mb-2 text-primary/80" {...props} />
              ),
              ul: ({...props}) => (
                <ul className="space-y-2 ml-4" {...props} />
              ),
              li: ({...props}) => (
                <li className="text-secondary hover:text-foreground transition-colors list-disc" {...props} />
              ),
              a: ({...props}) => (
                <a 
                  {...props} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={linkStyle}
                />
              ),
              strong: ({...props}) => (
                <strong className="font-semibold text-foreground" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

function ArchitectureSection({ title, description, image }: { 
  title: string;
  description: string;
  image: string;
}) {
  const linkStyle = "text-primary font-medium hover:underline inline-flex items-center gap-1 after:content-['↗'] after:text-xs";

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
      <div className="text-secondary mb-4 leading-relaxed">
        <ReactMarkdown
          components={{
            a: ({...props}) => (
              <a 
                {...props} 
                target="_blank" 
                rel="noopener noreferrer"
                className={linkStyle}
              />
            ),
          }}
        >
          {description}
        </ReactMarkdown>
      </div>
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-foreground/10">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain bg-white dark:bg-gray-900 p-4"
        />
      </div>
    </div>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  const linkStyle = "text-primary font-semibold hover:underline inline-flex items-center gap-1 after:content-['↗'] after:text-xs transition-colors";

  return (
    <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-500 dark:text-yellow-400 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <div className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
            <ReactMarkdown
              components={{
                a: ({...props}) => (
                  <a 
                    {...props} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${linkStyle} text-yellow-600 dark:text-yellow-300 hover:text-primary dark:hover:text-primary`}
                  />
                ),
              }}
            >
              {children as string}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetail() {
  const { language } = useLanguage();
  const { id } = useParams();
  const projects = getI18nText<Array<{
    id: string;
    title: string;
    description: string;
    introduction: string;
    requirements: string[];
    technologies: string[];
    challenges: string[];
    tags: string[];
    image?: string;
    architecture?: {
      title: string;
      description: string;
    };
    architectureImage?: string;
  }>>(language, 'projects.items');
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const sections = [
    {
      title: getI18nText(language, 'projects.details.introduction'),
      content: project.introduction
    },
    {
      title: getI18nText(language, 'projects.details.requirements'),
      content: project.requirements
    },
    {
      title: getI18nText(language, 'projects.details.technologies'),
      content: project.technologies
    },
    {
      title: getI18nText(language, 'projects.details.challenges'),
      content: project.challenges
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 container mx-auto px-4">
        <Link 
          href="/" 
          className="text-primary mb-8 inline-flex items-center hover:underline"
        >
          <svg
            className="w-4 h-4 mr-2"
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
          {getI18nText(language, 'projects.backToHome')}
        </Link>

        <div className="bg-background rounded-lg shadow-xl overflow-hidden">
          {project.image && (
            <div className="w-full h-64 relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            
            {project.id === 'web-ide' && (
              <Notice>
                {language === 'zh' ? (
                  "注意：此演示项目部署在 Google Cloud Platform 上（[点击访问](http://34.32.7.125)），将持续运行至 2025 年 5 月 1 日。"
                ) : language === 'de' ? (
                  "Hinweis: Dieses Demo-Projekt ist auf Google Cloud Platform gehostet ([hier klicken](http://34.32.7.125)) und wird bis zum 1. Mai 2025 verfügbar sein."
                ) : (
                  "Notice: This demo project is hosted on Google Cloud Platform ([click to visit](http://34.32.7.125)) and will be available until May 1st, 2025."
                )}
              </Notice>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <Tag key={tag} variant="primary">
                  {tag}
                </Tag>
              ))}
            </div>

            {sections.map((section, index) => (
              <DetailBlock
                key={index}
                title={section.title}
                content={section.content}
              />
            ))}

            {project.architecture?.description && project.architectureImage && (
              <ArchitectureSection
                title={getI18nText(language, 'projects.details.architecture')}
                description={project.architecture.description}
                image={project.architectureImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 