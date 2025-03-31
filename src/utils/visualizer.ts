interface VisualizerConfig {
  gridColor?: string;
  waveformColor?: string;
  spectrumGradientColors?: {
    start: string;
    end: string;
  };
}

export const DEFAULT_VISUALIZER_CONFIG: VisualizerConfig = {
  gridColor: 'rgba(255, 255, 255, 0.05)',
  waveformColor: '#4F46E5',
  spectrumGradientColors: {
    start: '#4F46E5',
    end: '#9333EA',
  },
};

export function updateCanvasSize(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridColor: string = DEFAULT_VISUALIZER_CONFIG.gridColor!
) {
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  // 横向网格线
  for (let i = 0; i < height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
  }

  // 纵向网格线
  for (let i = 0; i < width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
}

export function drawWaveform(
  canvas: HTMLCanvasElement,
  data: Uint8Array,
  config: VisualizerConfig = DEFAULT_VISUALIZER_CONFIG
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const bufferLength = data.length;
  const sliceWidth = width / bufferLength;

  ctx.clearRect(0, 0, width, height);
  
  // 绘制网格
  drawGrid(ctx, width, height, config.gridColor);

  // 绘制波形
  ctx.beginPath();
  ctx.strokeStyle = config.waveformColor!;
  ctx.lineWidth = 2;
  
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const v = data[i] / 128.0;
    const y = (v * height) / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.stroke();
}

export function drawSpectrum(
  canvas: HTMLCanvasElement,
  data: Uint8Array,
  config: VisualizerConfig = DEFAULT_VISUALIZER_CONFIG
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;
  const bufferLength = data.length;
  const barWidth = width / bufferLength;
  
  ctx.clearRect(0, 0, width, height);

  // 绘制网格
  drawGrid(ctx, width, height, config.gridColor);

  // 创建渐变
  const gradient = ctx.createLinearGradient(0, height, 0, 0);
  gradient.addColorStop(0, config.spectrumGradientColors!.start);
  gradient.addColorStop(1, config.spectrumGradientColors!.end);

  // 绘制频谱
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (data[i] / 255) * height;
    
    ctx.fillStyle = gradient;
    ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
  }
} 