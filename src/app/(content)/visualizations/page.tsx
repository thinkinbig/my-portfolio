'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getI18nText } from '@/i18n';
import { useState, useEffect } from 'react';

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
  guitarTuner: {
    title: string;
    description: string;
    viewDetails: string;
  };
  githubHeatmap: {
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

  const visualizationItems = [
    {
      key: 'd3',
      title: content.d3.title,
      description: content.d3.description,
      viewDetails: content.d3.viewDetails,
      href: '/visualizations/d3'
    },
    {
      key: 'knowledgeGraph',
      title: content.knowledgeGraph.title,
      description: content.knowledgeGraph.description,
      viewDetails: content.knowledgeGraph.viewDetails,
      href: '/visualizations/knowledge-graph'
    },
    {
      key: 'audioWave',
      title: content.audioWave.title,
      description: content.audioWave.description,
      viewDetails: content.audioWave.viewDetails,
      href: '/visualizations/audio-wave'
    },
    {
      key: 'guitarTuner',
      title: content.guitarTuner.title,
      description: content.guitarTuner.description,
      viewDetails: content.guitarTuner.viewDetails,
      href: '/visualizations/guitar-tuner'
    },
    {
      key: 'githubHeatmap',
      title: content.githubHeatmap.title,
      description: content.githubHeatmap.description,
      viewDetails: content.githubHeatmap.viewDetails,
      href: '/visualizations/github-heatmap'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">{content.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visualizationItems.map((item) => (
          <div key={item.key} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {item.description}
            </p>
            <a
              href={item.href}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              {item.viewDetails}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 