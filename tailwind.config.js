/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        thin: 'Helvetica Neue Thin',
        display: 'Helvetica Neue Light',
        bold: 'Helvetica Neue Medium',
      },
      colors: {
        'stroke': 'rgba(255, 255, 255, 0.364)',
      }
    },
  },
  plugins: [],
}

