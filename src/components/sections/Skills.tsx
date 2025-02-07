'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { getI18nText } from "@/i18n";
import React from "react";

type SkillItem = {
  name: string;
  level: number;
  description: string;
};

type SkillCategory = {
  title: string;
  items: SkillItem[];
};

type SkillsData = {
  [key: string]: SkillCategory;
};

type Skill = {
  name: string;
  value: number;
  color: string;
  icon: string;
};

function SkillBar({ name, level, description }: SkillItem) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="p-4 rounded-lg border border-foreground/10 bg-background hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-primary">{name}</h3>
        <div className="flex items-center gap-2">
          <div className="text-sm text-secondary">{level}%</div>
          <div className="w-12 h-12 relative">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
                r="20"
                cx="24"
                cy="24"
              />
              <circle
                className="text-primary transition-all duration-1000"
                strokeWidth="2"
                strokeDasharray={126}
                strokeDashoffset={isVisible ? 126 - (level / 100) * 126 : 126}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="20"
                cx="24"
                cy="24"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs font-medium text-primary">
                {isVisible ? Math.round(level) : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-secondary text-sm">{description}</p>
      <div 
        className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      >
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${level}%` : '0%',
          }}
        />
      </div>
    </div>
  );
}

function SkillPieChart({ skills }: { skills: Skill[] }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hoveredSkill, setHoveredSkill] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const total = skills.reduce((sum, skill) => sum + skill.value, 0);
  let startAngle = 0;
  const radius = 40;
  const strokeWidth = 12;
  const center = radius + strokeWidth;
  const size = (radius + strokeWidth) * 2;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        {skills.map((skill, i) => {
          const percentage = skill.value / total;
          const dashArray = radius * Math.PI * 2;
          const dashOffset = dashArray * (1 - percentage);
          const isHovered = hoveredSkill === skill.name;
          
          const rotation = (startAngle / total) * 360;
          startAngle += skill.value;

          return (
            <circle
              key={skill.name}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={skill.color}
              strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={isVisible ? dashOffset : dashArray}
              strokeLinecap="round"
              transform={`rotate(${rotation} ${center} ${center})`}
              style={{
                transition: `all 1s ease-out ${i * 0.2}s`,
                opacity: isVisible ? (isHovered ? 1 : 0.8) : 0,
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {hoveredSkill ? (
          <div className="text-center">
            <div className="text-3xl mb-1">{skills.find(s => s.name === hoveredSkill)?.icon}</div>
            <div className="text-xl font-bold text-primary">
              {skills.find(s => s.name === hoveredSkill)?.value}%
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-3xl mb-1">💻</div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillDistribution() {
  const { language } = useLanguage();
  
  const skills = [
    { name: 'Frontend', value: 35, color: '#3B82F6', icon: '⚛️' },
    { name: 'Backend', value: 40, color: '#10B981', icon: '🛠️' },
    { name: 'DevOps', value: 15, color: '#F59E0B', icon: '🚀' },
    { name: 'ML/AI', value: 10, color: '#8B5CF6', icon: '🤖' }
  ];

  return (
    <div className="flex flex-col items-center mb-16">
      <h3 className="text-2xl font-bold mb-8 text-primary flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        {getI18nText(language, 'skills.distribution')}
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <SkillPieChart skills={skills} />
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div 
              key={skill.name}
              className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="text-2xl">{skill.icon}</div>
              <div>
                <div className="text-sm font-medium text-primary">
                  {getI18nText(language, `skills.labels.${skill.name}`)}
                </div>
                <div className="text-xs text-secondary">{skill.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const { language } = useLanguage();
  const skills = getI18nText<SkillsData>(language, 'skills');

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-primary">
          {getI18nText(language, 'skills.title')}
        </h2>
        
        <SkillDistribution />

        {Object.entries(skills).filter(([key]) => key !== 'distribution').map(([key, category]) => (
          <div key={key} className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              {category.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items?.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  description={skill.description}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 