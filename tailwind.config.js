/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'maven-pro': ['Maven Pro', 'sans'],
      },
      colors: {
        primary : {
          DEFAULT: '#1E3A8A',
          light: '#3A5FB4',
          dark: '#0F2C5B',
        },
        secondary: {
          DEFAULT: '#F2F2F2',
          light: '#FFFFFF',
          dark: '#D9D9D9',
        },
      },
    },
  },
  plugins: [],
}
