'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { 
  createAudioAnalyzer, 
  cleanupAudioAnalyzer, 
  updateAudioData, 
  type AudioAnalyzer,
} from '@/utils/audio';
import { findFundamentalFrequency, medianFilter, calculateCents, findClosestNote } from '@/utils/audio/frequency';
import { useTheme } from 'next-themes';
import TunerDisplay from './components/TunerDisplay';
import GuitarStrings from './components/GuitarStrings';
import QuickReference from './components/QuickReference';
import { getThemeColors } from './styles/theme';

// 标准调音频率（从低音到高音）
const STANDARD_TUNING = [
  { 
    note: 'E2', 
    frequency: 82.41, 
    name: '6th',
    audioUrl: '/sounds/guitar/e2.mp3'
  },
  { 
    note: 'A2', 
    frequency: 110.00, 
    name: '5th',
    audioUrl: '/sounds/guitar/a2.mp3'
  },
  { 
    note: 'D3', 
    frequency: 146.83, 
    name: '4th',
    audioUrl: '/sounds/guitar/d3.mp3'
  },
  { 
    note: 'G3', 
    frequency: 196.00, 
    name: '3rd',
    audioUrl: '/sounds/guitar/g3.mp3'
  },
  { 
    note: 'B3', 
    frequency: 246.94, 
    name: '2nd',
    audioUrl: '/sounds/guitar/b3.mp3'
  },
  { 
    note: 'E4', 
    frequency: 329.63, 
    name: '1st',
    audioUrl: '/sounds/guitar/e4.mp3'
  },
];

interface GuitarTunerProps {
  startRecordingText: string;
  stopRecordingText: string;
  micPermissionErrorText: string;
  strings?: Array<{
    note: string;
    frequency: number;
    name: string;
    audioUrl?: string;
  }>;
  tuner: {
    perfect: string;
    tooHigh: string;
    tooLow: string;
    cents: string;
  };
}

export default function GuitarTuner({
  startRecordingText,
  stopRecordingText,
  micPermissionErrorText,
  strings: propStrings = [],
  tuner,
}: GuitarTunerProps) {
  const { theme: colorTheme, setTheme } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const [currentFrequency, setCurrentFrequency] = useState<number | null>(null);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [cents, setCents] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioCache = useRef(new Map<string, HTMLAudioElement>());
  const freqHistoryRef = useRef<number[]>([]);
  const lastValidFreqRef = useRef<number | null>(null);
  const stableCountRef = useRef<number>(0);

  // 设置默认主题为黑色
  useEffect(() => {
    if (!colorTheme) {
      setTheme('dark');
    }
  }, [colorTheme, setTheme]);

  // 合并 props 和默认值，确保使用 STANDARD_TUNING 中的 audioUrl
  const strings = useMemo(() => {
    return propStrings.map((string, index) => ({
      ...string,
      audioUrl: string.audioUrl || STANDARD_TUNING[index].audioUrl
    }));
  }, [propStrings]);

  // 使用 useMemo 优化主题颜色
  const themeColors = useMemo(() => getThemeColors(colorTheme), [colorTheme]);

  // 预加载音频文件
  const preloadAudio = useCallback(async (audioUrl: string): Promise<HTMLAudioElement | null> => {
    try {
      if (!audioUrl) {
        console.error('音频URL为空');
        return null;
      }

      // 检查缓存
      if (audioCache.current.has(audioUrl)) {
        return audioCache.current.get(audioUrl) || null;
      }

      // 创建音频元素
      const audio = new Audio();
      audio.preload = 'auto';
      
      // 设置音频源
      audio.src = audioUrl;
      
      // 等待音频加载完成
      await new Promise<void>((resolve, reject) => {
        const handleCanPlayThrough = () => resolve();
        const handleError = (e: ErrorEvent) => {
          console.error('音频加载错误:', audioUrl, e);
          reject(new Error(`加载音频失败: ${audioUrl}`));
        };

        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('error', handleError as EventListener);
      });
      
      // 存入缓存
      audioCache.current.set(audioUrl, audio);
      return audio;
    } catch (error) {
      console.error('预加载音频失败:', audioUrl, error);
      return null;
    }
  }, []);

  // 播放音频
  const playAudio = useCallback(async (audioUrl: string): Promise<void> => {
    try {
      if (!audioUrl) {
        console.error('未提供音频URL');
        return;
      }

      // 从缓存获取或加载音频
      let audio: HTMLAudioElement | undefined = audioCache.current.get(audioUrl);
      if (!audio) {
        const loadedAudio = await preloadAudio(audioUrl);
        if (loadedAudio) {
          audio = loadedAudio;
        }
      }

      if (!audio) {
        console.error('无法加载音频:', audioUrl);
        return;
      }

      // 重置音频
      audio.currentTime = 0;
      
      // 使用 Promise 包装音频播放
      const playPromise = new Promise<void>((resolve, reject) => {
        const handleEnded = () => resolve();
        const handleError = (e: ErrorEvent) => {
          console.error('播放音频错误:', audioUrl, e);
          reject(new Error(`播放音频失败: ${audioUrl}`));
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError as EventListener);
      });

      // 尝试播放
      try {
        await audio.play();
        await playPromise;
      } catch (error) {
        console.error('播放失败，等待用户交互:', audioUrl, error);
        // 尝试用户交互后播放
        const playOnInteraction = async () => {
          try {
            await audio.play();
            await playPromise;
          } catch (e) {
            console.error('用户交互后播放失败:', audioUrl, e);
          }
        };
        
        document.addEventListener('click', playOnInteraction, { once: true });
      }
    } catch (error) {
      console.error('播放音频过程中出错:', audioUrl, error);
    }
  }, [preloadAudio]);

  // 预加载所有音频文件
  useEffect(() => {
    const loadAllAudio = async () => {
      try {
        const validStrings = strings.filter(string => string.audioUrl && string.audioUrl.trim() !== '');
        
        if (validStrings.length === 0) {
          console.warn('没有找到有效的音频URL');
          return;
        }

        const loadPromises = validStrings.map(string => preloadAudio(string.audioUrl!));
        await Promise.all(loadPromises);
      } catch (error) {
        console.error('音频预加载失败:', error);
      }
    };

    loadAllAudio();
  }, [strings, preloadAudio]);

  // 修改播放标准音的函数
  const playReferenceNote = useCallback(async (audioUrl?: string) => {
    if (!audioUrl) {
      console.error('未提供音频URL');
      return;
    }
    await playAudio(audioUrl);
  }, [playAudio]);

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
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startRecording = async () => {
    try {
      const analyzer = await createAudioAnalyzer({
        fftSize: 2048,
        smoothingTimeConstant: 0.8,
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

  const updateTuner = useCallback(() => {
    if (!audioAnalyzerRef.current) return;

    updateAudioData(audioAnalyzerRef.current);
    const timeData = new Float32Array(audioAnalyzerRef.current.analyzer.fftSize);
    audioAnalyzerRef.current.analyzer.getFloatTimeDomainData(timeData);
    
    // 使用 YIN 算法检测频率
    const freq = findFundamentalFrequency(
      timeData,
      audioAnalyzerRef.current.context.sampleRate
    );

    if (freq > 0) {
      // 更新频率历史
      freqHistoryRef.current.push(freq);
      if (freqHistoryRef.current.length > 10) { // 增加历史记录长度
        freqHistoryRef.current.shift();
      }

      // 应用中值滤波，使用更大的窗口
      const filteredFreq = medianFilter(freqHistoryRef.current, 5)[0];
      
      if (filteredFreq) {
        // 检查频率稳定性
        const freqDiff = lastValidFreqRef.current ? Math.abs(filteredFreq - lastValidFreqRef.current) : Infinity;
        
        if (freqDiff < 1.0) { // 如果频率变化小于1Hz
          stableCountRef.current++;
        } else {
          stableCountRef.current = 0;
        }

        // 只有当频率足够稳定时才更新显示
        if (stableCountRef.current >= 3) {
          setCurrentFrequency(filteredFreq);
          const closestNote = findClosestNote(filteredFreq, strings);
          setCurrentNote(closestNote.note);
          const centsDiff = calculateCents(filteredFreq, closestNote.frequency);
          setCents(centsDiff);

          // 设置状态
          if (Math.abs(centsDiff) < 5) {
            setStatus(tuner.perfect);
          } else if (centsDiff > 0) {
            setStatus(tuner.tooHigh);
          } else {
            setStatus(tuner.tooLow);
          }
        }

        lastValidFreqRef.current = filteredFreq;
      }
    }

    animationFrameIdRef.current = requestAnimationFrame(updateTuner);
  }, [strings, tuner]);

  useEffect(() => {
    if (isRecording && audioAnalyzerRef.current) {
      updateTuner();
    }
  }, [isRecording, updateTuner]);

  // 在组件挂载时初始化音频上下文
  useEffect(() => {
    const initAudioContext = async () => {
      try {
        if (!audioContextRef.current) {
          const webkitAudioContext = (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          const AudioContextClass = window.AudioContext || webkitAudioContext;
          
          if (!AudioContextClass) {
            throw new Error('不支持 Web Audio API');
          }
          
          audioContextRef.current = new AudioContextClass();
          await audioContextRef.current.resume();
        }
      } catch (error) {
        console.error('初始化音频上下文失败:', error);
      }
    };

    initAudioContext();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${themeColors.background} p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* 主要内容区域 - 使用网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧效果器 */}
          <div className="relative">
            {/* 效果器外壳 */}
            <div className={`relative bg-gradient-to-br ${colorTheme === 'dark' ? 'from-zinc-800 via-zinc-700 to-zinc-900' : 'from-zinc-300 via-zinc-100 to-zinc-400'} rounded-lg shadow-2xl overflow-hidden
              before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/30 before:to-transparent before:opacity-50
              after:absolute after:inset-0 after:bg-gradient-to-bl after:from-black/5 after:via-transparent after:to-black/5
              border-t border-white/20`}>
              {/* 摇滚装饰元素 */}
              <div className={`absolute -top-2 -left-2 w-4 h-4 ${colorTheme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-800'} rounded-full border-2 ${colorTheme === 'dark' ? 'border-zinc-700' : 'border-zinc-600'}`}></div>
              <div className={`absolute -top-2 -right-2 w-4 h-4 ${colorTheme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-800'} rounded-full border-2 ${colorTheme === 'dark' ? 'border-zinc-700' : 'border-zinc-600'}`}></div>
              <div className={`absolute -bottom-2 -left-2 w-4 h-4 ${colorTheme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-800'} rounded-full border-2 ${colorTheme === 'dark' ? 'border-zinc-700' : 'border-zinc-600'}`}></div>
              <div className={`absolute -bottom-2 -right-2 w-4 h-4 ${colorTheme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-800'} rounded-full border-2 ${colorTheme === 'dark' ? 'border-zinc-700' : 'border-zinc-600'}`}></div>
              
              {/* 显示屏部分 */}
              <div className={`bg-black p-6 relative border-4 ${colorTheme === 'dark' ? 'border-zinc-900' : 'border-zinc-800'} m-3 rounded-md`}>
                {/* 模式显示 */}
                <div className={`flex justify-between text-xs ${colorTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-2`}>
                  <div>BASS 6 5 4 3 2 b GUITAR 2 b CHROMATIC</div>
                </div>

                {/* 主显示区 */}
                <div className="relative h-32 bg-black border border-gray-800 rounded overflow-visible">
                  {/* 音高显示 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-4xl font-mono font-bold ${
                      Math.abs(cents) < 5
                        ? `${themeColors.text.accent} drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]`
                        : `${themeColors.text.error} drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]`
                    }`}>
                      {currentNote || '--'}
                    </div>
                  </div>

                  {/* 频率显示 */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
                    <div className={`${themeColors.text.accent} font-mono text-sm drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]`}>
                      {currentFrequency ? `${currentFrequency.toFixed(1)} Hz` : '--'}
                    </div>
                    <div className={`text-xs ${themeColors.text.secondary}`}>
                      {cents ? `${cents > 0 ? '+' : ''}${cents.toFixed(1)}¢` : ''}
                    </div>
                  </div>
                </div>

                {/* 状态指示灯 */}
                <div className="absolute top-2 right-4">
                  <div className={`w-2 h-2 rounded-full ${
                    isRecording
                      ? `${themeColors.text.error} animate-pulse`
                      : 'bg-gray-800'
                  }`} />
                </div>
              </div>

              {/* 效果器底部 */}
              <div className={`bg-gradient-to-b ${colorTheme === 'dark' ? 'from-zinc-800 to-zinc-900' : 'from-zinc-200 to-zinc-400'} p-6 relative
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent`}>
                {/* 输入输出标签 */}
                <div className={`flex justify-between ${themeColors.text.error} font-bold mb-4 text-shadow-sm`}>
                  <div className="flex items-center">
                    <span className="mr-2 text-lg">←</span>
                    <span className="tracking-wider">OUTPUT</span>
                  </div>
                  <div className="flex items-center">
                    <span className="tracking-wider">INPUT</span>
                    <span className="ml-2 text-lg">←</span>
                  </div>
                </div>

                {/* 开关按钮 */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-full h-16 ${colorTheme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-800'} rounded-lg shadow-lg flex items-center justify-center
                    ${isRecording ? 'bg-opacity-90 ring-2 ring-red-500/50' : 'bg-opacity-100'}
                    transition-all duration-200 transform active:scale-95 active:shadow-inner
                    hover:shadow-red-500/20 hover:shadow-lg relative z-20`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-lg"></div>
                  <div className={`${themeColors.text.primary} font-bold tracking-wider relative z-10`}>
                    {isRecording ? stopRecordingText : startRecordingText}
                  </div>
                </button>

                {/* BOSS标志 */}
                <div className="mt-6 text-center relative">
                  <div className={`${colorTheme === 'dark' ? 'text-zinc-700' : 'text-zinc-800'} font-black text-2xl tracking-[0.2em] transform rotate-[-2deg] relative
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
                    after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-black/10 after:to-transparent`}>
                    BOSS
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧调音显示和吉他弦 */}
          <div className="space-y-8">
            {/* 调音仪表盘 */}
            <TunerDisplay
              cents={cents}
              status={status}
              colorTheme={colorTheme || 'light'}
              themeColors={themeColors}
            />

            {/* 吉他弦显示 */}
            <GuitarStrings
              strings={strings}
              currentNote={currentNote}
              cents={cents}
              colorTheme={colorTheme || 'light'}
              themeColors={themeColors}
              onPlayNote={playReferenceNote}
            />

            {/* 快速参考显示 */}
            <QuickReference
              strings={strings}
              currentNote={currentNote}
              themeColors={themeColors}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 