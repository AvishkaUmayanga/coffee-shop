/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'buttonColor' : '#C67C4E',
      'white' : '#FFFFFF',
      'black' : '#000000',
      'lightBlack' : '#313131',
      'goldYellow' : '#FBBE21',
      'red' : '#FF0000',
      'lightGray' : '#f0f0f0',
      'lightRed' : '#FF5B61'
    },
    extend: {
      backgroundImage: {
        'startBg' : "url('./assets/startBg.png')",
        'startBgLg' : "url('./assets/startBg_larg.jpg')",
        'promoBg' : "url('./assets/promoBg.jpg')"
      }
    },
  },
  plugins: [],
}

