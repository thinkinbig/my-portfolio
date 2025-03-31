'use client';

import { useEffect, useState } from 'react';
import { getI18nText } from '@/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import GuitarTuner from './GuitarTuner';

interface GuitarTunerContent {
  startRecording: string;
  stopRecording: string;
  micPermissionError: string;
  strings: Array<{
    note: string;
    frequency: number;
    name: string;
  }>;
  tuner: {
    perfect: string;
    tooHigh: string;
    tooLow: string;
    cents: string;
  };
}

export default function GuitarTunerPage() {
  const { language } = useLanguage();
  const [content, setContent] = useState<GuitarTunerContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const i18nContent = getI18nText(language, 'visualizations.guitarTuner') as GuitarTunerContent;
      if (!i18nContent) {
        throw new Error('没有找到内容');
      }
      setContent(i18nContent);
    } catch (err) {
      console.error('Error loading content:', err);
      setError(err instanceof Error ? err.message : '未知错误');
    }
  }, [language]);

  if (error) {
    return <div className="text-red-500">错误: {error}</div>;
  }

  if (!content) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <GuitarTuner
        startRecordingText={content.startRecording}
        stopRecordingText={content.stopRecording}
        micPermissionErrorText={content.micPermissionError}
        strings={content.strings}
        tuner={content.tuner}
      />
    </div>
  );
} 