'use client';

import { useEffect, useState } from 'react';
import { getI18nText } from '@/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import AudioWaveVisualizer from './AudioWaveVisualizer';

interface AudioWaveContent {
  startRecording: string;
  stopRecording: string;
  micPermissionError: string;
  controls: {
    volume: string;
    smoothing: string;
    fftSize: string;
    theme: string;
  };
  display: {
    waveform: string;
    spectrum: string;
    parameters: {
      sampleRate: string;
      fftSize: string;
      smoothing: string;
      volume: string;
    };
  };
}

export default function AudioWavePage() {
  const { language } = useLanguage();
  const [content, setContent] = useState<AudioWaveContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const i18nContent = getI18nText(language, 'visualizations.audioWave') as AudioWaveContent;
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
      <AudioWaveVisualizer
        startRecordingText={content.startRecording}
        stopRecordingText={content.stopRecording}
        micPermissionErrorText={content.micPermissionError}
        controls={content.controls}
        display={content.display}
      />
    </div>
  );
} 