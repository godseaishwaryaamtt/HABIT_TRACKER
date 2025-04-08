
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pixelPurple: '#a259ff',
        pixelPink: '#ff61a6'
      },
      fontFamily: {
        pixel: ['Press Start 2P', 'cursive']
      }
    },
  },
  plugins: [],
}
