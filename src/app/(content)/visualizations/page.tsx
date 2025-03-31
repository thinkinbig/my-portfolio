'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getI18nText } from '@/i18n';
import { useState, useEffect } from 'react';
import { HelloWorldContent } from './helloworld/page';

interface VisualizationContent {
  title: string;
  d3: {
    title: string;
    description: string;
    viewDetails: string;
  };
  helloworld: {
    title: string;
    description: string;
    viewDetails: string;
    content?: HelloWorldContent;
  };
  knowledgeGraph: {
    title: string;
    description: string;
    viewDetails: string;
  };
  audioWave: {
    title: string;
    description: string;
    viewDetails: string;
  };
}

export default function VisualizationsPage() {
  const { language } = useLanguage();
  const [content, setContent] = useState<VisualizationContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = getI18nText<VisualizationContent>(language, 'visualizations');
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载内容失败');
    } finally {
      setLoading(false);
    }
  }, [language]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>错误：{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>没有找到内容</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">{content.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">{content.d3.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {content.d3.description}
          </p>
          <a
            href="/visualizations/d3"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            {content.d3.viewDetails}
          </a>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">{content.helloworld.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {content.helloworld.description}
          </p>
          <a
            href="/visualizations/helloworld"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            {content.helloworld.viewDetails}
          </a>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">{content.knowledgeGraph.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {content.knowledgeGraph.description}
          </p>
          <a
            href="/visualizations/knowledge-graph"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            {content.knowledgeGraph.viewDetails}
          </a>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">{content.audioWave.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {content.audioWave.description}
          </p>
          <a
            href="/visualizations/audio-wave"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            {content.audioWave.viewDetails}
          </a>
        </div>
      </div>
    </div>
  );
} 