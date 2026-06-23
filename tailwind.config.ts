import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        admin: {
          bg: 'rgb(var(--admin-bg) / <alpha-value>)',
          surface: 'rgb(var(--admin-surface) / <alpha-value>)',
          'surface-2': 'rgb(var(--admin-surface-2) / <alpha-value>)',
          text: 'rgb(var(--admin-text) / <alpha-value>)',
          muted: 'rgb(var(--admin-text-muted) / <alpha-value>)',
          border: 'rgb(var(--admin-border) / <alpha-value>)',
          'border-soft': 'rgb(var(--admin-border-soft) / <alpha-value>)',
          primary: 'rgb(var(--admin-primary) / <alpha-value>)',
          'primary-soft': 'rgb(var(--admin-primary-soft) / <alpha-value>)',
        },
      },
      borderRadius: {
        admin: '12px',
        'admin-sm': '10px',
      },
      boxShadow: {
        aether: '0 18px 44px -28px rgb(16 24 40 / 0.34)',
        'aether-soft': '0 10px 24px -18px rgb(16 24 40 / 0.28)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
