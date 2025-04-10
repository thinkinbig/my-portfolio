'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createAudioAnalyzer, cleanupAudioAnalyzer, updateAudioData, type AudioAnalyzer } from '@/lib/audio';
import { updateCanvasSize, drawWaveform, drawSpectrum } from '@/lib/visualizer';
import { useTheme } from 'next-themes';

interface AudioWaveVisualizerProps {
  startRecordingText: string;
  stopRecordingText: string;
  micPermissionErrorText: string;
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

export default function AudioWaveVisualizer({
  startRecordingText,
  stopRecordingText,
  micPermissionErrorText,
  controls,
  display,
}: AudioWaveVisualizerProps) {
  const { theme: colorTheme } = useTheme();
  const waveformRef = useRef<HTMLCanvasElement>(null);
  const spectrumRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastDrawTimeRef = useRef<number>(0);
  const [volume, setVolume] = useState(1);
  const [smoothing, setSmoothing] = useState(0.7);
  const [fftSize, setFftSize] = useState(512);
  const [theme, setTheme] = useState<'blue' | 'purple' | 'green'>('blue');
  const FPS = 30;
  const frameInterval = 1000 / FPS;

  // 添加 useEffect 来处理主题状态
  useEffect(() => {
    // 确保在客户端渲染时主题状态与服务器端一致
    const root = document.documentElement;
    if (colorTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [colorTheme]);

  // 使用 useMemo 优化 themeColors 对象
  const themeColors = useMemo(() => ({
    blue: {
      waveform: colorTheme === 'dark' ? '#4F46E5' : '#3730A3',
      spectrum: colorTheme === 'dark' 
        ? ['#4F46E5', '#60A5FA']
        : ['#3730A3', '#3B82F6'],
      button: colorTheme === 'dark'
        ? 'from-blue-500 to-blue-600'
        : 'from-blue-600 to-blue-700',
    },
    purple: {
      waveform: colorTheme === 'dark' ? '#9333EA' : '#7E22CE',
      spectrum: colorTheme === 'dark'
        ? ['#9333EA', '#C084FC']
        : ['#7E22CE', '#A855F7'],
      button: colorTheme === 'dark'
        ? 'from-purple-500 to-purple-600'
        : 'from-purple-600 to-purple-700',
    },
    green: {
      waveform: colorTheme === 'dark' ? '#059669' : '#047857',
      spectrum: colorTheme === 'dark'
        ? ['#059669', '#34D399']
        : ['#047857', '#10B981'],
      button: colorTheme === 'dark'
        ? 'from-emerald-500 to-emerald-600'
        : 'from-emerald-600 to-emerald-700',
    },
  }), [colorTheme]);

  // 清理函数
  const cleanup = useCallback(() => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    if (audioAnalyzerRef.current) {
      cleanupAudioAnalyzer(audioAnalyzerRef.current);
      audioAnalyzerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startRecording = async () => {
    try {
      const analyzer = await createAudioAnalyzer({
        fftSize,
        smoothingTimeConstant: smoothing,
        minDecibels: -90,
        maxDecibels: -10,
      });
      audioAnalyzerRef.current = analyzer;
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert(micPermissionErrorText);
    }
  };

  const stopRecording = () => {
    cleanup();
    setIsRecording(false);
  };

  const drawVisualizations = useCallback(() => {
    if (!waveformRef.current || !spectrumRef.current || !audioAnalyzerRef.current) return;

    const currentTime = performance.now();
    if (currentTime - lastDrawTimeRef.current < frameInterval) {
      animationFrameIdRef.current = requestAnimationFrame(drawVisualizations);
      return;
    }
    lastDrawTimeRef.current = currentTime;

    updateAudioData(audioAnalyzerRef.current);

    // 应用音量
    const volumeAdjustedTimeData = audioAnalyzerRef.current.timeData.map(
      v => v * volume
    );
    const volumeAdjustedFreqData = audioAnalyzerRef.current.freqData.map(
      v => v * volume
    );

    drawWaveform(waveformRef.current, volumeAdjustedTimeData, {
      waveformColor: themeColors[theme].waveform,
    });
    drawSpectrum(spectrumRef.current, volumeAdjustedFreqData, {
      spectrumGradientColors: {
        start: themeColors[theme].spectrum[0],
        end: themeColors[theme].spectrum[1],
      },
    });

    animationFrameIdRef.current = requestAnimationFrame(drawVisualizations);
  }, [volume, theme, frameInterval, themeColors]);

  useEffect(() => {
    if (isRecording && audioAnalyzerRef.current) {
      updateCanvasSize(waveformRef.current!);
      updateCanvasSize(spectrumRef.current!);
      drawVisualizations();
    }
  }, [isRecording, drawVisualizations]);

  useEffect(() => {
    const handleResize = () => {
      if (waveformRef.current && spectrumRef.current) {
        updateCanvasSize(waveformRef.current);
        updateCanvasSize(spectrumRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen ${colorTheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-8`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 控制面板 */}
        <div className={`${
          colorTheme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white/80 border-gray-200'
        } backdrop-blur-sm rounded-xl p-6 shadow-lg border`}>
          <div className="flex flex-wrap gap-8 items-center">
            {/* 录音按钮 */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`
                px-6 py-3 rounded-full font-medium text-sm text-white
                transition-all duration-300 ease-in-out
                shadow-lg hover:shadow-xl
                transform hover:scale-105
                flex items-center gap-2
                bg-gradient-to-r ${themeColors[theme].button}
              `}
            >
              {isRecording ? (
                <>
                  <span className="block w-3 h-3 rounded-full bg-white animate-ping"></span>
                  {stopRecordingText}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 7a3 3 0 100 6 3 3 0 000-6zM5 10a5 5 0 1110 0 5 5 0 01-10 0z"/>
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                  {startRecordingText}
                </>
              )}
            </button>

            {/* 音量控制 */}
            <div className="space-y-1">
              <label className={`text-sm ${colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {controls.volume}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className={`w-32 h-2 ${
                  colorTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                } rounded-lg appearance-none cursor-pointer`}
              />
            </div>

            {/* 平滑度控制 */}
            <div className="space-y-1">
              <label className={`text-sm ${colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {controls.smoothing}
              </label>
              <input
                type="range"
                min="0"
                max="0.95"
                step="0.05"
                value={smoothing}
                onChange={(e) => setSmoothing(Number(e.target.value))}
                className={`w-32 h-2 ${
                  colorTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                } rounded-lg appearance-none cursor-pointer`}
              />
            </div>

            {/* FFT大小选择 */}
            <div className="space-y-1">
              <label className={`text-sm ${colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {controls.fftSize}
              </label>
              <select
                value={fftSize}
                onChange={(e) => setFftSize(Number(e.target.value))}
                className={`${
                  colorTheme === 'dark'
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-900'
                } rounded-lg px-3 py-1 text-sm`}
              >
                <option value={256}>256</option>
                <option value={512}>512</option>
                <option value={1024}>1024</option>
                <option value={2048}>2048</option>
              </select>
            </div>

            {/* 主题选择 */}
            <div className="space-y-1">
              <label className={`text-sm ${colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {controls.theme}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('blue')}
                  className={`w-6 h-6 rounded-full bg-blue-500 ${theme === 'blue' ? 'ring-2 ring-blue-400' : ''}`}
                />
                <button
                  onClick={() => setTheme('purple')}
                  className={`w-6 h-6 rounded-full bg-purple-500 ${theme === 'purple' ? 'ring-2 ring-purple-400' : ''}`}
                />
                <button
                  onClick={() => setTheme('green')}
                  className={`w-6 h-6 rounded-full bg-emerald-500 ${theme === 'green' ? 'ring-2 ring-emerald-400' : ''}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 波形显示 */}
        <div className="space-y-6">
          <div className={`relative h-[300px] ${
            colorTheme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white/80 border-gray-200'
          } rounded-xl overflow-hidden backdrop-blur-sm border`}>
            <div className={`absolute top-4 left-4 text-sm font-medium ${
              colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {display.waveform}
            </div>
            <canvas
              ref={waveformRef}
              className="w-full h-full"
              style={{ filter: `drop-shadow(0 0 2px ${colorTheme === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.3)'})` }}
            />
          </div>
          <div className={`relative h-[300px] ${
            colorTheme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50'
              : 'bg-white/80 border-gray-200'
          } rounded-xl overflow-hidden backdrop-blur-sm border`}>
            <div className={`absolute top-4 left-4 text-sm font-medium ${
              colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {display.spectrum}
            </div>
            <canvas
              ref={spectrumRef}
              className="w-full h-full"
              style={{ filter: `drop-shadow(0 0 2px ${colorTheme === 'dark' ? 'rgba(147, 51, 234, 0.5)' : 'rgba(126, 34, 206, 0.3)'})` }}
            />
          </div>
        </div>

        {/* 音频参数显示 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: display.parameters.sampleRate,
              value: `${audioAnalyzerRef.current?.context.sampleRate.toLocaleString() ?? '-'} Hz`,
            },
            {
              label: display.parameters.fftSize,
              value: fftSize,
            },
            {
              label: display.parameters.smoothing,
              value: smoothing.toFixed(2),
            },
            {
              label: display.parameters.volume,
              value: `${volume.toFixed(1)}x`,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${
                colorTheme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700/50'
                  : 'bg-white/80 border-gray-200'
              } backdrop-blur-sm rounded-lg p-4 border`}
            >
              <div className={`text-sm ${colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.label}
              </div>
              <div className="text-xl font-medium">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 