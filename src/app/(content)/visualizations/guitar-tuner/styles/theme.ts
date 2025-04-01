export interface ThemeColors {
  background: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
    error: string;
  };
  border: string;
  card: {
    background: string;
    border: string;
  };
  display: {
    background: string;
    border: string;
  };
  string: {
    active: string;
    inactive: string;
  };
}

export const getThemeColors = (colorTheme: string | undefined): ThemeColors => ({
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
}); 