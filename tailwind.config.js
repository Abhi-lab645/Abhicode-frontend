/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        raised: 'var(--color-raised)',
        line: 'var(--color-line)',
        'line-focus': 'var(--color-line-focus)',
        'text-main': 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        'accent-subtle': 'var(--color-accent-subtle)',
        'diff-easy': 'var(--color-diff-easy)',
        'diff-medium': 'var(--color-diff-medium)',
        'diff-hard': 'var(--color-diff-hard)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Schibsted Grotesk"', 'sans-serif'],
        serif: ['"Newsreader"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'xs': ['0.64rem', { lineHeight: '1.25' }],     // ~9.6px
        'sm': ['0.8rem', { lineHeight: '1.35' }],      // 12px
        'base': ['1rem', { lineHeight: '1.5' }],        // 15px
        'md': ['1.25rem', { lineHeight: '1.5' }],       // 18.75px
        'lg': ['1.5625rem', { lineHeight: '1.4' }],     // 23.44px
        'xl': ['1.953rem', { lineHeight: '1.3' }],      // 29.3px
        '2xl': ['2.441rem', { lineHeight: '1.2' }],     // 36.62px
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '2px',
        'md': '4px',
        'lg': '4px',
      },
      maxWidth: {
        'reading': '68ch',
      },
      transitionDuration: {
        'default': '140ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
