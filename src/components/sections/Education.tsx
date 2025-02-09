'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";

export function Education() {
  const { language } = useLanguage();

  const schools = [
    {
      key: 'tum',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        </svg>
      ),
      showCourses: true
    },
    {
      key: 'kit',
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        </svg>
      ),
      showCourses: false
    }
  ];

  return (
    <section className="bg-foreground/5 py-20" id="education">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          {getI18nText(language, 'sections.experience')}
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {schools.map(({ key, icon, showCourses }) => (
            <div key={key} className="bg-background rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {getI18nText(language, `education.${key}.school`)}
                  </h3>
                  <p className="text-primary mb-2">
                    {getI18nText(language, `education.${key}.degree`)}
                  </p>
                  <p className="text-secondary mb-2">
                    {getI18nText(language, `education.${key}.time`)}
                  </p>
                  {getI18nText(language, `education.${key}.location`) && (
                    <p className="text-sm text-secondary">
                      {getI18nText(language, `education.${key}.location`)}
                    </p>
                  )}
                  {showCourses && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {getI18nText<string[]>(language, `education.${key}.courses`).map((course, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 text-sm text-secondary"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {course}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 