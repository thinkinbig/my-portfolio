/**
 * YIN 算法实现频率检测
 */
export const findFundamentalFrequency = (buffer: Float32Array, sampleRate: number): number => {
  const threshold = 0.15; // 提高阈值，减少误检
  const minFreq = 70;  // E2 的频率略低于 82.41Hz
  const maxPeriod = Math.floor(sampleRate / minFreq);
  
  // 计算信号强度
  let signalStrength = 0;
  for (let i = 0; i < buffer.length; i++) {
    signalStrength += buffer[i] * buffer[i];
  }
  signalStrength = Math.sqrt(signalStrength / buffer.length);
  
  // 如果信号太弱，直接返回
  if (signalStrength < 0.01) {
    return -1;
  }
  
  // 步骤 1: 自差函数
  const diff = new Float32Array(maxPeriod);
  for (let tau = 0; tau < maxPeriod; tau++) {
    let sum = 0;
    for (let i = 0; i < maxPeriod; i++) {
      const delta = buffer[i] - buffer[i + tau];
      sum += delta * delta;
    }
    diff[tau] = sum;
  }

  // 步骤 2: 累积平均归一化
  const cmndiff = new Float32Array(maxPeriod);
  let runningSum = 0;
  for (let tau = 1; tau < maxPeriod; tau++) {
    runningSum += diff[tau];
    cmndiff[tau] = diff[tau] * tau / runningSum;
  }

  // 步骤 3: 绝对阈值法
  let tau = 2;
  let bestPeriod = -1;
  let bestValue = 1;

  while (tau < maxPeriod) {
    if (cmndiff[tau] < threshold && cmndiff[tau] < bestValue) {
      bestValue = cmndiff[tau];
      bestPeriod = tau;
    }
    tau++;
  }

  if (bestPeriod !== -1) {
    // 步骤 4: 抛物线插值，使用更大的窗口
    const start = Math.max(0, bestPeriod - 5);
    const end = Math.min(maxPeriod - 1, bestPeriod + 5);
    let minValue = cmndiff[bestPeriod];
    let minPeriod = bestPeriod;

    for (let i = start; i <= end; i++) {
      if (cmndiff[i] < minValue) {
        minValue = cmndiff[i];
        minPeriod = i;
      }
    }

    // 使用三点抛物线插值
    const alpha = cmndiff[minPeriod - 1];
    const beta = cmndiff[minPeriod];
    const gamma = cmndiff[minPeriod + 1];
    const peak = minPeriod + 0.5 * (alpha - gamma) / (alpha - 2 * beta + gamma);
    
    return sampleRate / peak;
  }

  return -1; // 未找到基频
};

/**
 * 中值滤波平滑频率
 */
export const medianFilter = (values: number[], windowSize: number): number[] => {
  if (values.length < windowSize) return values;
  const result = [];
  for (let i = 0; i < values.length - windowSize + 1; i++) {
    const window = values.slice(i, i + windowSize).sort((a, b) => a - b);
    result.push(window[Math.floor(windowSize / 2)]);
  }
  return result;
};

/**
 * 计算音分差
 */
export const calculateCents = (frequency: number, targetFrequency: number): number => {
  return 1200 * Math.log2(frequency / targetFrequency);
};

/**
 * 查找最接近的音符
 */
export const findClosestNote = (frequency: number, notes: Array<{ note: string; frequency: number }>) => {
  let closestNote = notes[0];
  let minDiff = Math.abs(frequency - notes[0].frequency);
  
  notes.forEach(note => {
    const diff = Math.abs(frequency - note.frequency);
    if (diff < minDiff) {
      minDiff = diff;
      closestNote = note;
    }
  });

  return closestNote;
}; 