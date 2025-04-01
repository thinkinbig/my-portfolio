'use client';

interface GuitarString {
  note: string;
  frequency: number;
  name: string;
  audioUrl?: string;
}

interface GuitarStringsProps {
  strings: GuitarString[];
  currentNote: string | null;
  cents: number;
  colorTheme: string;
  themeColors: {
    text: {
      secondary: string;
      accent: string;
      error: string;
    };
    display: {
      background: string;
      border: string;
    };
    card: {
      background: string;
      border: string;
    };
  };
  onPlayNote: (audioUrl?: string) => void;
}

export default function GuitarStrings({
  strings,
  currentNote,
  cents,
  colorTheme,
  themeColors,
  onPlayNote,
}: GuitarStringsProps) {
  return (
    <div className={`${themeColors.card.background} p-6 rounded-xl border ${themeColors.card.border} shadow-lg backdrop-blur-sm
      before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-50`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`${themeColors.text.secondary} text-sm font-mono tracking-wider`}>GUITAR STRINGS</div>
        <div className={`text-xs ${themeColors.text.secondary} font-mono`}>Standard Tuning</div>
      </div>

      {/* 吉他弦区域 - 使用网格布局 */}
      <div className="grid grid-cols-2 gap-4">
        {strings.map((string) => (
          <div key={string.note} className="relative">
            {/* 弦的容器 */}
            <div className={`relative h-12 ${themeColors.display.background} rounded-lg border ${themeColors.display.border} overflow-hidden`}>
              {/* 音符和频率显示 */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-4">
                <div className={`text-2xl font-bold ${
                  currentNote === string.note ? themeColors.text.accent : themeColors.text.secondary
                }`}>
                  {string.note}
                </div>
                <div className={`text-sm font-mono ${themeColors.text.secondary}`}>
                  {string.frequency.toFixed(1)} Hz
                </div>
              </div>

              {/* 频率指示器 */}
              {currentNote === string.note && (
                <div className="absolute left-1/2 right-4 top-1/2 -translate-y-1/2">
                  <div className={`h-1 ${
                    Math.abs(cents) < 5 ? 'bg-green-500' : 'bg-red-500'
                  } rounded transition-all`}
                    style={{
                      width: `${Math.min(100, Math.abs(cents))}%`,
                      opacity: 0.6
                    }}
                  />
                </div>
              )}

              {/* 播放按钮 */}
              <button
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
                  ${colorTheme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-700 hover:bg-zinc-600'}
                  flex items-center justify-center transition-colors`}
                onClick={() => string.audioUrl && onPlayNote(string.audioUrl)}
              >
                <div className={`w-0 h-0 border-t-[6px] border-t-transparent
                  border-l-[10px] ${colorTheme === 'dark' ? 'border-l-zinc-400' : 'border-l-zinc-300'}
                  border-b-[6px] border-b-transparent ml-1`} />
              </button>
            </div>

            {/* 音分差显示 */}
            {currentNote === string.note && (
              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                <div className={`text-sm font-mono ${
                  Math.abs(cents) < 5 ? themeColors.text.accent : themeColors.text.error
                }`}>
                  {cents > 0 ? '+' : ''}{cents.toFixed(1)}¢
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 