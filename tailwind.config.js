/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37', // ពណ៌មាស (Gold)
        secondary: '#F3E5AB', // ពណ៌មាសស្រាល
        dark: '#0a0a0a',    // ពណ៌ខ្មៅ (Background)
        darkLight: '#1a1a1a', // ពណ៌ខ្មៅស្រាល (សម្រាប់ Card/Sidebar)
      }
    },
  },
  plugins: [],
}