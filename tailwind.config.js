/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
        optional: '#9E9E9E',
        hover: '#E1F5FE',
        marine: '#29B6F6',
        chat:'#00E676',
        chatSecond:'#85CFAB',
        chatThird:'#C7EDFF',
        textProject:'#1769AA',
        chatModal:'#E0E0E0'
      },
      boxShadow: {
        'default': ' 0px 0px 10px 0px rgba(0, 0, 0, 0.05);'
      }
    },
  },
  plugins: [],
}

