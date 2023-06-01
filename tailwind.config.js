/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter'],
    },
    extend: {
      colors: {
        'pastel-green': {
          100: '#46B37F',
          200: 'rgba(70,179,127,0.63)',
        },
        'button-blue': {
          300: '#4679B3',
          400: '#38608E',
        }
      },
    },
  },
  plugins: [],
}

