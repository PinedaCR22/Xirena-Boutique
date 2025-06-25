// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',               // usa la clase .dark para activar dark mode
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // aquí tus extensiones de tema si las tuvieras
    },
  },
  plugins: [],
}
