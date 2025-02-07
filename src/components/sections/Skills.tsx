'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";

type Skill = {
  name: string;
  level: number;
  description: string;
};

export function Skills() {
  const { language } = useLanguage();
  const categories = ['frontend', 'backend', 'devops', 'ml'];

  return (
    <section className="bg-foreground/5 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {getI18nText(language, 'sections.skills')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {categories.map(category => (
            <div key={category} className="p-6 rounded-lg bg-background shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                {getI18nText(language, `skills.${category}.title`)}
              </h3>
              <div className="space-y-6">
                {getI18nText<Skill[]>(language, `skills.${category}.items`).map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-foreground/10 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-sm text-secondary mt-1">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 