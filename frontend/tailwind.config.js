// tailwind.config.js
module.exports = {
  darkMode: "class",
  safelist: [{ pattern: /text-\[.*\]/ }],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        gray: {
          100: "#fafafa",
          200: "#f5f5f5",
          300: "#e8e8e8",
          400: "#e0e0e0",
          500: "#e0e0e0",
          600: "#959595",
          700: "#707070",
          800: "#5c5c5c",
          900: "#333333"
        },
        red: {
          main: "#f87171"
        },
        orange: {
          main: "#fb923c"
        },
        yellow: {
          main: "#facc15"
        },
        blue: {
          main: "#60a5fa"
        },
        purple: {
          main: "#c084fc"
        },
        sky: {
          main: "#00abff"
        }
      }
    }
  },
  plugins: []
};
