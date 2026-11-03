/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: { DEFAULT: '#F6F3EE', 2: '#ECE8E1', 3: '#E3DED5' },
        line: '#D8D2C8',
        ink: { DEFAULT: '#1C1B19', soft: '#3A3732' },
        muted: '#6D675E',
        clay: { DEFAULT: '#B4573B', dark: '#8E4129', soft: '#EBD9D0' },
      },
      letterSpacing: { label: '0.16em' },
      maxWidth: { page: '1360px' },
    },
  },
  plugins: [],
};
