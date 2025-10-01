/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      colors: {
        brand: {
          purple: "#7C3AED",
          pink: "#F472B6",
          background: "#F9FAFB"
        }
      }
    }
  },
  plugins: []
};

