/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: '#FF5580',
        pinkHover: '#ff5580e6',
        darkBlue: '#058c2c',
        darkBlue: '#183d3d',
        offWhite: "#F5F7F8",
        black: '#1b1b1b'
      }
    },
  },
  plugins: [],
}

