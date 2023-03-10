/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Work Sans', ...defaultTheme.fontFamily.sans],
      mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
};
