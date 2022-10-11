/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      width: {
        '1100': '1100px'
      },
      backgroundColor: {
        primary: '#F5F5F5',
        secondary: '#1266dd',
        secondary1: '#3961fb',
        secondary2: '#f73859',
      },
      maxWidth: {
        '600': '600px'
      },
      cursor: {
        pointer: 'pointer'
      }
    },
  },
  plugins: [],
}