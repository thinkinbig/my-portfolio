import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#007AFF",
        secondary: "#6B7280",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'cursor': 'cursor 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        cursor: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  layer: {
    components: {
      '.layout-container': 'container mx-auto px-4',
      '.layout-section': 'py-20',
      '.card': 'bg-foreground/5 rounded-xl p-6 border border-foreground/10',
      '.card-hover': 'hover:bg-foreground/10 transition-colors',
      '.btn': 'px-6 py-3 rounded-xl transition-colors text-base font-medium',
      '.btn-primary': 'bg-primary text-white hover:bg-primary/90',
      '.btn-disabled': 'bg-foreground/10 text-foreground/50',
      '.input': 'w-full px-6 py-3 rounded-xl bg-foreground/5 border border-foreground/10 focus:outline-none focus:border-primary/30',
      '.icon-container': 'w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary',
      '.icon-sm': 'w-8 h-8',
      '.title': 'text-3xl font-bold mb-12',
      '.subtitle': 'text-xl font-semibold text-primary mb-4',
      '.list-item': 'flex items-start gap-2',
      '.list-dot': 'w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 flex-shrink-0',
    }
  }
} satisfies Config;
