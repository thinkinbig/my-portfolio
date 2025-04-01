'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createAudioAnalyzer, cleanupAudioAnalyzer, updateAudioData, type AudioAnalyzer } from '@/utils/audio';
import { useTheme } from 'next-themes';
import * as d3 from 'd3';

interface GuitarTunerProps {
  startRecordingText: string;
  stopRecordingText: string;
  micPermissionErrorText: string;
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

export default function GuitarTuner({
  startRecordingText,
  stopRecordingText,
  micPermissionErrorText,
  strings,
  tuner,
}: GuitarTunerProps) {
  const { theme: colorTheme } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const [currentFrequency, setCurrentFrequency] = useState<number | null>(null);
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [cents, setCents] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const svgRef = useRef<SVGSVGElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // 使用 useMemo 优化主题颜色
  const themeColors = useMemo(() => ({
    background: colorTheme === 'dark' 
      ? 'from-gray-900 via-gray-800 to-gray-900' 
      : 'from-gray-50 via-gray-100 to-gray-50',
    text: {
      primary: colorTheme === 'dark' ? 'text-white' : 'text-gray-900',
      secondary: colorTheme === 'dark' ? 'text-gray-400' : 'text-gray-600',
      accent: colorTheme === 'dark' ? 'text-green-500' : 'text-green-600',
      error: colorTheme === 'dark' ? 'text-red-500' : 'text-red-600',
    },
    border: colorTheme === 'dark' 
      ? 'border-zinc-800/50' 
      : 'border-gray-200/50',
    card: {
      background: colorTheme === 'dark' 
        ? 'bg-zinc-900/90' 
        : 'bg-white/90',
      border: colorTheme === 'dark' 
        ? 'border-zinc-800/50' 
        : 'border-gray-200/50',
    },
    display: {
      background: colorTheme === 'dark' 
        ? 'bg-black/80' 
        : 'bg-gray-900/80',
      border: colorTheme === 'dark' 
        ? 'border-zinc-800/50' 
        : 'border-gray-700/50',
    },
    string: {
      active: colorTheme === 'dark' 
        ? 'from-green-500/20 via-green-500 to-green-500/20' 
        : 'from-green-600/20 via-green-600 to-green-600/20',
      inactive: colorTheme === 'dark' 
        ? 'from-zinc-700/20 via-zinc-400 to-zinc-700/20' 
        : 'from-gray-400/20 via-gray-500 to-gray-400/20',
    },
  }), [colorTheme]);

  // 播放标准音
  const playReferenceNote = useCallback((frequency: number) => {
    // 如果已经在播放，先停止
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    // 创建或获取 AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const audioContext = audioContextRef.current;

    // 创建音频节点
    const mainOscillator = audioContext.createOscillator();
    const harmonicOscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const harmonicGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    // 设置主音色参数
    mainOscillator.type = 'triangle';  // 使用三角波作为基础
    mainOscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    // 设置泛音参数
    harmonicOscillator.type = 'sine';
    harmonicOscillator.frequency.setValueAtTime(frequency * 2, audioContext.currentTime); // 添加八度泛音

    // 设置滤波器
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, audioContext.currentTime);
    filter.Q.setValueAtTime(1, audioContext.currentTime);

    // 设置音量包络
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.02);  // 快速起音
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.5);  // 衰减
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);  // 渐出

    // 设置泛音音量
    harmonicGain.gain.setValueAtTime(0, audioContext.currentTime);
    harmonicGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.02);
    harmonicGain.gain.exponentialRampToValueAtTime(0.03, audioContext.currentTime + 0.3);
    harmonicGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5);

    // 连接音频节点
    mainOscillator.connect(filter);
    harmonicOscillator.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 保存引用
    oscillatorRef.current = mainOscillator;
    gainNodeRef.current = gainNode;

    // 开始播放
    mainOscillator.start();
    harmonicOscillator.start();

    // 2秒后自动停止
    setTimeout(() => {
      mainOscillator.stop();
      harmonicOscillator.stop();
      mainOscillator.disconnect();
      harmonicOscillator.disconnect();
      harmonicGain.disconnect();
      filter.disconnect();
      gainNode.disconnect();
      oscillatorRef.current = null;
      gainNodeRef.current = null;
    }, 2000);
  }, []);

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
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
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

  // 计算最接近的音符
  const findClosestNote = useCallback((frequency: number) => {
    let closestNote = strings[0];
    let minDiff = Math.abs(frequency - strings[0].frequency);
    
    strings.forEach(string => {
      const diff = Math.abs(frequency - string.frequency);
      if (diff < minDiff) {
        minDiff = diff;
        closestNote = string;
      }
    });

    return closestNote;
  }, [strings]);

  // 计算音分差
  const calculateCents = useCallback((frequency: number, targetFrequency: number) => {
    return 1200 * Math.log2(frequency / targetFrequency);
  }, []);

  const updateTuner = useCallback(() => {
    if (!audioAnalyzerRef.current) return;

    updateAudioData(audioAnalyzerRef.current);
    const freqData = audioAnalyzerRef.current.freqData;
    
    // 找到最强的频率
    let maxAmplitude = 0;
    let dominantFrequency = 0;
    
    for (let i = 0; i < freqData.length; i++) {
      if (freqData[i] > maxAmplitude) {
        maxAmplitude = freqData[i];
        dominantFrequency = i * (audioAnalyzerRef.current.context.sampleRate / audioAnalyzerRef.current.analyzer.fftSize);
      }
    }

    if (dominantFrequency > 0) {
      setCurrentFrequency(dominantFrequency);
      const closestNote = findClosestNote(dominantFrequency);
      setCurrentNote(closestNote.note);
      const centsDiff = calculateCents(dominantFrequency, closestNote.frequency);
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

    animationFrameIdRef.current = requestAnimationFrame(updateTuner);
  }, [tuner, findClosestNote, calculateCents]);

  useEffect(() => {
    if (isRecording && audioAnalyzerRef.current) {
      updateTuner();
    }
  }, [isRecording, updateTuner]);

  // 更新LED位置 - 优化动画效果
  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const margin = { left: 30, right: 30 };
    
    // 缩小移动范围
    const xScale = d3.scaleLinear()
      .domain([-50, 50])
      .range([margin.left, width - margin.right]);

    // 限制移动范围
    const clampedCents = Math.max(-50, Math.min(50, cents));
    
    // 使用easeOut缓动效果，减少动画时间
    d3.select(svgRef.current)
      .select('.active-led-group')
      .transition()
      .duration(50)
      .ease(d3.easeQuad)
      .attr('transform', `translate(${xScale(clampedCents)}, ${svgRef.current.clientHeight/2})`);

    // 更新LED颜色和亮度
    const isPerfect = Math.abs(clampedCents) < 5;
    d3.select(svgRef.current)
      .selectAll('.active-led-group circle')
      .transition()
      .duration(50)
      .attr('fill', isPerfect ? '#22C55E' : '#EF4444')
      .style('opacity', isPerfect ? 1 : 0.8);

  }, [cents]);

  // 初始化D3
  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 10, right: 30, bottom: 10, left: 30 };

    // 创建SVG
    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    // 清除已有内容
    svg.selectAll('*').remove();

    // 创建比例尺
    const xScale = d3.scaleLinear()
      .domain([-50, 50])
      .range([margin.left, width - margin.right]);

    // 添加发光效果滤镜
    const defs = svg.append('defs');
    
    // 暗光效果
    const darkGlow = defs.append('filter')
      .attr('id', 'darkGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    darkGlow.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');

    const darkMerge = darkGlow.append('feMerge');
    darkMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    darkMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // 亮光效果
    const brightGlow = defs.append('filter')
      .attr('id', 'brightGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    brightGlow.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');

    const brightMerge = brightGlow.append('feMerge');
    brightMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    brightMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // 创建LED点阵
    const ledPoints = d3.range(-50, 51, 5);
    
    // 添加背景LED点（暗色）
    svg.selectAll('.led-point-bg')
      .data(ledPoints)
      .enter()
      .append('circle')
      .attr('class', 'led-point-bg')
      .attr('cx', d => xScale(d))
      .attr('cy', height/2)
      .attr('r', 2.5)
      .attr('fill', d => d === 0 ? '#FFFFFF' : '#4B5563')
      .attr('opacity', d => d === 0 ? 0.8 : 0.4)
      .attr('filter', 'url(#darkGlow)');

    // 创建激活的LED点组
    const activeLedGroup = svg.append('g')
      .attr('class', 'active-led-group')
      .attr('transform', `translate(${xScale(0)}, ${height/2})`);

    // 添加激活的LED点
    const activeLedRadius = 3;
    const ledSpacing = 6;
    
    [-1, 0, 1].forEach((offset, i) => {
      activeLedGroup.append('circle')
        .attr('class', `active-led-${i}`)
        .attr('cx', offset * ledSpacing)
        .attr('cy', 0)
        .attr('r', activeLedRadius)
        .attr('fill', '#EF4444')
        .attr('opacity', 0.9)
        .attr('filter', 'url(#brightGlow)');
    });

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
            <div className={`${themeColors.card.background} p-6 rounded-xl border ${themeColors.card.border} shadow-lg backdrop-blur-sm
              before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-50`}>
              <div className="flex justify-between items-center mb-4">
                <div className={`${themeColors.text.secondary} text-sm font-mono tracking-wider`}>TUNER DISPLAY</div>
                <div className={`text-sm ${themeColors.text.secondary} font-mono`}>{status || '--'}</div>
              </div>
              
              {/* 表盘显示区 */}
              <div className={`relative h-24 ${themeColors.display.background} rounded-lg border ${themeColors.display.border} overflow-hidden`}>
                <div className="absolute inset-0">
                  <svg ref={svgRef} className="w-full h-full" style={{ background: 'transparent' }} />
                </div>
              </div>
            </div>

            {/* 吉他弦模型 */}
            <div className={`${themeColors.card.background} p-6 rounded-xl border ${themeColors.card.border} shadow-lg backdrop-blur-sm
              before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-50`}>
              <div className="flex justify-between items-center mb-4">
                <div className={`${themeColors.text.secondary} text-sm font-mono tracking-wider`}>GUITAR STRINGS</div>
                <div className={`text-xs ${themeColors.text.secondary} font-mono`}>Standard Tuning</div>
              </div>

              {/* 吉他弦区域 - 使用网格布局 */}
              <div className="grid grid-cols-2 gap-4">
                {strings.slice().reverse().map((string, index) => (
                  <div key={index} className="relative">
                    {/* 弦的容器 */}
                    <div className={`relative h-12 ${themeColors.display.background} rounded-lg border ${themeColors.display.border} overflow-hidden`}>
                      {/* 弦的视觉效果 */}
                      <div className={`absolute left-0 right-0 h-[2px] top-1/2 -translate-y-1/2
                        ${currentNote === string.note
                          ? `bg-gradient-to-r ${themeColors.string.active} animate-pulse`
                          : `bg-gradient-to-r ${themeColors.string.inactive}`}`}
                      />

                      {/* 音符和频率信息 */}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-4">
                        <div className={`text-lg font-bold ${
                          currentNote === string.note ? themeColors.text.accent : themeColors.text.secondary
                        }`}>
                          {string.note}
                        </div>
                        <div className={`text-xs font-mono ${themeColors.text.secondary}`}>
                          {string.frequency.toFixed(1)} Hz
                        </div>
                      </div>

                      {/* 播放标准音按钮 */}
                      <button
                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                          ${colorTheme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600' : 'bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500'}
                          flex items-center justify-center transition-colors`}
                        onClick={() => playReferenceNote(string.frequency)}
                      >
                        <div className={`w-0 h-0 border-t-[6px] border-t-transparent
                          border-l-[10px] ${colorTheme === 'dark' ? 'border-l-zinc-400 hover:border-l-zinc-300' : 'border-l-zinc-300 hover:border-l-zinc-200'}
                          border-b-[6px] border-b-transparent ml-1`} />
                      </button>
                    </div>

                    {/* 音准指示器 */}
                    {currentNote === string.note && (
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                        <div className="text-xs font-mono">
                          <span className={`${Math.abs(cents) < 5 ? themeColors.text.accent : themeColors.text.error}`}>
                            {cents > 0 ? '+' : ''}{cents.toFixed(1)}¢
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 快速参考显示 */}
            <div className={`${themeColors.display.background} p-4 rounded-lg backdrop-blur-sm border ${themeColors.display.border} shadow-lg shadow-black/30
              before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-50`}>
              <div className="grid grid-cols-6 gap-2">
                {strings.map((string, index) => (
                  <div
                    key={index}
                    className={`text-center p-2 rounded ${
                      currentNote === string.note
                        ? 'bg-green-500/20 text-green-500'
                        : themeColors.text.secondary
                    }`}
                  >
                    <div className={`text-xs font-mono ${themeColors.text.secondary}`}>{string.name}</div>
                    <div className={`text-sm font-bold ${themeColors.text.primary}`}>{string.note}</div>
                    <div className={`text-xs font-mono ${themeColors.text.secondary}`}>{string.frequency.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}