module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
