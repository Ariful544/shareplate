/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff9800',
        'secondary': '#ffeb3b',
    },
    },
    fontFamily: {
      'open-sans': ["Open Sans", "serif"],
    },
  },
  plugins: [
    daisyui,
    flowbite.plugin(),
  ],
}