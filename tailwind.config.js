module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./Components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
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
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
