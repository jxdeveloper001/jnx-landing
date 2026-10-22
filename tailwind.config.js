/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        mute: 'var(--muted)',
        line: 'var(--border)',
        wash: 'var(--wash)',
        cloud: 'var(--cloud)',
        purple: {
          DEFAULT: 'var(--purple)',
          deep: 'var(--purple-deep)',
          bright: 'var(--purple-bright)',
        },
        'on-dark-muted': 'var(--on-dark-muted)',
        brand: {
          DEFAULT: 'var(--purple)',
          hover: 'var(--purple-bright)',
          deep: 'var(--purple-deep)',
          sub: 'var(--on-dark-muted)',
          muted: 'var(--on-dark-muted)',
        },
      },
      fontFamily: { sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: {
        frame: '0 40px 120px -30px rgba(20, 8, 50, 0.14), 0 8px 30px rgba(20, 8, 50, 0.06)',
        card: '0 1px 2px rgba(20, 8, 50, 0.06), 0 12px 32px -12px rgba(20, 8, 50, 0.18)',
        lift: '0 2px 4px rgba(20, 8, 50, 0.06), 0 20px 48px -12px rgba(20, 8, 50, 0.24)',
        'black-btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 10px 24px -8px rgba(20, 8, 50, 0.45)',
        'black-btn-hover': 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 14px 28px -8px rgba(20, 8, 50, 0.55)',
      },
    },
  },
  plugins: [],
};
