/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7C3AED',        // Brand purple
          pink: '#F472B6',          // Brand pink
          background: '#F9FAFB'     // Light background
        }
      },
    },
  },
  plugins: [],
};
