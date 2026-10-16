/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#0A0A0A', mute: '#6B7280', line: '#E5E7EB', wash: '#F5F5F7' },
      fontFamily: { sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: {
        frame: '0 40px 120px -30px rgba(0,0,0,.18), 0 8px 30px rgba(0,0,0,.06)',
        card: '0 1px 2px rgba(0,0,0,.04), 0 12px 32px -12px rgba(0,0,0,.12)',
        lift: '0 2px 4px rgba(0,0,0,.05), 0 28px 60px -16px rgba(0,0,0,.22)',
      },
    },
  },
  plugins: [],
};
