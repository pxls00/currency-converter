/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
   content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: 'montserrat',
      }
    },
    fontSize: {
      'xxs': '16px',
      'xs': '18px',
      'sm': '22px',
      'md': '26px',
      'lg': '34px',
      'extra-lg': '64px'
    },
    colors: {
      'transparent': 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      'loading-bg': 'rgb(243 244 246 / 80%)'
    }
  },
  plugins: [],
}

