'use client';

interface GuitarString {
  note: string;
  frequency: number;
  name: string;
}

interface QuickReferenceProps {
  strings: GuitarString[];
  currentNote: string | null;
  themeColors: {
    text: {
      primary: string;
      secondary: string;
    };
    display: {
      background: string;
      border: string;
    };
  };
}

export default function QuickReference({
  strings,
  currentNote,
  themeColors,
}: QuickReferenceProps) {
  return (
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
  );
} 