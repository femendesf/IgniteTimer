/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{tsx,ts}',
    './index.html'
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'gray-100': '#E1E1E6',
        'gray-300': '#C4C4CC',
        'gray-400': '#8D8D99',
        'gray-500': '#7C7C8A',
        'gray-600': '#323238',
        'gray-700': '#29292E',
        'gray-800': '#202024',
        'gray-900': '#121214',

        'green-300': '#00B37E',
        'green-500': '#00875F',
        'green-700': '#015F43',

        'red': '#F03847',
        'red-dark': '#7A1921',

        'yellow-500': '#FBA94C',
      },
      fontFamily:{
        'Roboto': ['Roboto' , 'sans-serif'],
        'Roboto-Mono': ['Roboto Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
