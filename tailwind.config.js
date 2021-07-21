module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: {
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./Components/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: ["html", "body"],
  },
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },

    backgroundColor: (theme) => ({
      ...theme("colors"),
      primaryBG: "#fefaf5",
      yellowBtn: "#FFE67E",
      blueBtn: "#C1E5FF",
      redBtn: "#ffe0e0",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
