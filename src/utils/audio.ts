export interface AudioAnalyzerConfig {
  fftSize?: number;
  smoothingTimeConstant?: number;
  minDecibels?: number;
  maxDecibels?: number;
}

export interface AudioAnalyzer {
  context: AudioContext;
  analyzer: AnalyserNode;
  source: MediaStreamAudioSourceNode;
  timeData: Uint8Array;
  freqData: Uint8Array;
  stream: MediaStream;
}

export const DEFAULT_ANALYZER_CONFIG: AudioAnalyzerConfig = {
  fftSize: 512,
  smoothingTimeConstant: 0.7,
  minDecibels: -90,
  maxDecibels: -10,
};

export async function createAudioAnalyzer(
  config: AudioAnalyzerConfig = DEFAULT_ANALYZER_CONFIG
): Promise<AudioAnalyzer> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const analyzer = context.createAnalyser();

  // 配置分析器
  analyzer.fftSize = config.fftSize ?? DEFAULT_ANALYZER_CONFIG.fftSize!;
  analyzer.smoothingTimeConstant = config.smoothingTimeConstant ?? DEFAULT_ANALYZER_CONFIG.smoothingTimeConstant!;
  analyzer.minDecibels = config.minDecibels ?? DEFAULT_ANALYZER_CONFIG.minDecibels!;
  analyzer.maxDecibels = config.maxDecibels ?? DEFAULT_ANALYZER_CONFIG.maxDecibels!;

  source.connect(analyzer);

  return {
    context,
    analyzer,
    source,
    timeData: new Uint8Array(analyzer.frequencyBinCount),
    freqData: new Uint8Array(analyzer.frequencyBinCount),
    stream,
  };
}

export function cleanupAudioAnalyzer(audioAnalyzer: AudioAnalyzer) {
  if (audioAnalyzer.stream) {
    audioAnalyzer.stream.getTracks().forEach(track => track.stop());
  }
  if (audioAnalyzer.context && audioAnalyzer.context.state !== 'closed') {
    audioAnalyzer.context.close();
  }
}

export function updateAudioData(audioAnalyzer: AudioAnalyzer) {
  audioAnalyzer.analyzer.getByteTimeDomainData(audioAnalyzer.timeData);
  audioAnalyzer.analyzer.getByteFrequencyData(audioAnalyzer.freqData);
} 