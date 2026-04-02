import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        terra: {
          700: '#9A3412', 600: '#C2410C', 500: '#EA580C',
          400: '#F97316', 300: '#FB923C', 200: '#FDBA74', 100: '#FED7AA',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fira)', 'monospace'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)',
      },
      boxShadow: {
        'warm':     '0 4px 24px rgba(245, 158, 11, 0.15)',
        'warm-lg':  '0 8px 40px rgba(245, 158, 11, 0.22)',
        'card':     '0 2px 16px rgba(0, 0, 0, 0.45)',
        'card-hover':'0 8px 32px rgba(0, 0, 0, 0.6)',
        'glow':     '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-sm':  '0 0 10px rgba(245, 158, 11, 0.2)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-up':     'fadeUp 0.45s ease forwards',
        'fade-in':     'fadeIn 0.3s ease forwards',
        'scale-in':    'scaleIn 0.2s ease forwards',
        'slide-in':    'slideIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-soft':  'pulseSoft 2s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 1.2s ease-in-out infinite',
        'shimmer':     'shimmer 1.5s infinite linear',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn:   { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        slideIn:   { '0%': { opacity: '0', transform: 'translateX(100%)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        bounceSoft:{ '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        shimmer:   { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
      },
    },
  },
  plugins: [],
}

export default config
