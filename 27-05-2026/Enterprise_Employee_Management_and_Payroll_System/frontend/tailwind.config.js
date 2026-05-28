/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bbddfc',
          300: '#7cc0fb',
          400: '#369ff7',
          500: '#0c83eb',
          600: '#0267c7',
          700: '#0352a1',
          800: '#074685',
          900: '#0b3c6f',
        }
      }
    },
  },
  plugins: [],
}
