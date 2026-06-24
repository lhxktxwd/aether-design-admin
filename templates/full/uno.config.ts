import { defineConfig, presetWind4 } from 'unocss';

const adminColors = {
  'admin-bg': 'rgb(var(--admin-bg))',
  'admin-surface': 'rgb(var(--admin-surface))',
  'admin-surface-2': 'rgb(var(--admin-surface-2))',
  'admin-surface-3': 'rgb(var(--admin-surface-3))',
  'admin-text': 'rgb(var(--admin-text))',
  'admin-muted': 'rgb(var(--admin-text-muted))',
  'admin-subtle': 'rgb(var(--admin-text-subtle))',
  'admin-border': 'rgb(var(--admin-border))',
  'admin-border-soft': 'rgb(var(--admin-border-soft))',
  'admin-primary': 'rgb(var(--admin-primary))',
  'admin-primary-soft': 'rgb(var(--admin-primary-soft))',
};

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|ts|js|tsx|jsx|html)($|\?)/],
      exclude: ['node_modules', 'dist'],
    },
  },
  presets: [
    presetWind4({
      dark: 'class',
      preflights: {
        reset: true,
      },
    }),
  ],
  safelist: [
    ...Object.keys(adminColors).flatMap((color) => [`bg-${color}`, `text-${color}`, `border-${color}`]),
    'bg-[rgb(var(--admin-success))]',
    'bg-[rgb(var(--admin-warning))]',
    'bg-[rgb(var(--admin-danger))]',
    'text-[rgb(var(--admin-success-text))]',
    'text-[rgb(var(--admin-warning-text))]',
    'text-[rgb(var(--admin-danger-text))]',
    'shadow-admin-soft',
    'shadow-aether',
    'shadow-aether-soft',
  ],
  theme: {
    colors: {
      ...adminColors,
      admin: {
        bg: 'rgb(var(--admin-bg))',
        surface: 'rgb(var(--admin-surface))',
        'surface-2': 'rgb(var(--admin-surface-2))',
        'surface-3': 'rgb(var(--admin-surface-3))',
        text: 'rgb(var(--admin-text))',
        muted: 'rgb(var(--admin-text-muted))',
        subtle: 'rgb(var(--admin-text-subtle))',
        border: 'rgb(var(--admin-border))',
        'border-soft': 'rgb(var(--admin-border-soft))',
        primary: 'rgb(var(--admin-primary))',
        'primary-soft': 'rgb(var(--admin-primary-soft))',
      },
    },
    radius: {
      admin: '12px',
      'admin-sm': '10px',
    },
    shadow: {
      aether: '0 18px 44px -28px rgb(16 24 40 / 0.34)',
      'aether-soft': '0 10px 24px -18px rgb(16 24 40 / 0.28)',
      'admin-soft': '0 10px 24px -18px rgb(16 24 40 / 0.28)',
    },
    font: {
      sans: 'Inter, ui-sans-serif, system-ui, sans-serif',
      display: 'Geist, Inter, ui-sans-serif, system-ui, sans-serif',
      mono: 'Geist Mono, JetBrains Mono, ui-monospace, monospace',
    },
    fontWeight: {
      650: '650',
    },
  },
});
