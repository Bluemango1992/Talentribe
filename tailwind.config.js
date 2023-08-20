/** @type {import('tailwindcss').Config} */
export default {
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
        customBlue: '#123456',
      },
    },
  },
  plugins: [],
}
