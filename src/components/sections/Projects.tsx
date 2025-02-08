'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";
import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { Project } from "@/types/project";

export function Projects() {
  const { language } = useLanguage();

  return (
    <section className="container mx-auto px-4 py-20" id="projects">
      <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">
        {getI18nText(language, 'projects.title')}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {getI18nText<Project[]>(language, 'projects.items').map((project) => (
          <Link 
            href={`/projects/${project.id}`} 
            key={project.id}
            className="group animate-fade-in"
          >
            <div className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-foreground/5 hover:border-primary/20 relative">
              {project.image && (
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                </div>
              )}
              <div className="p-6 relative">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary mb-4 line-clamp-2 group-hover:text-foreground transition-colors">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag 
                      key={tag} 
                      variant="primary"
                      className="transform transition-transform group-hover:translate-y-[-2px]"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 