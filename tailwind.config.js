/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: { 50: '#FCF8F2', 100: '#F8F1E6', 200: '#EFE3D0', 300: '#E3D2B8' },
        blush: { 100: '#F8E4E2', 200: '#F1CFCD', 300: '#E8B8B8' },
        dustyrose: { 300: '#E0B4BA', 400: '#CF949C', 500: '#B97580' },
        ink: '#4A3236',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        polaroid:
          '0 1px 2px rgba(74,50,54,.12), 0 8px 18px -6px rgba(74,50,54,.22), 0 22px 40px -18px rgba(74,50,54,.25)',
      },
    },
  },
  plugins: [],
};
