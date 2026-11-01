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
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arial: ['Arial', '"Helvetica Neue"', 'Helvetica', '"Liberation Sans"', 'sans-serif'],
      },
      boxShadow: {
        frame: '0 40px 120px -30px rgba(36,17,61, 0.14), 0 8px 30px rgba(36,17,61, 0.06)',
        'violet-sm': '0 1px 2px rgba(36, 17, 61, 0.10), 0 6px 14px -6px rgba(121, 80, 181, 0.38)',
        'violet-md': '0 2px 4px rgba(36, 17, 61, 0.10), 0 14px 26px -10px rgba(84, 37, 138, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'violet-lg': '0 4px 8px rgba(36, 17, 61, 0.10), 0 26px 44px -18px rgba(84, 37, 138, 0.52), 0 0 0 1px rgba(121, 80, 181, 0.12)',
        card: '0 1px 2px rgba(36,17,61, 0.06), 0 12px 32px -12px rgba(36,17,61, 0.18)',
        lift: '0 2px 4px rgba(36,17,61, 0.06), 0 20px 48px -12px rgba(36,17,61, 0.24)',
        'black-btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 10px 24px -8px rgba(36,17,61, 0.45)',
        'black-btn-hover': 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 14px 28px -8px rgba(36,17,61, 0.55)',
      },
    },
  },
  plugins: [],
};
