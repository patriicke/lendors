/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueish: "#000C21",
        redish: "#EA001E",
        "blueish-2": "#161829"
      },
      animation: {
        show: "show 1s linear"
      },
      keyframes: {
        show: {
          "0%": {
            opacity: 0.6
          },
          "100%": {
            opacity: 1
          }
        }
      }
    }
  },
  plugins: []
};
