module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
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

    extend: {
      backgroundImage: (theme) => ({
        sheHy: "url('/header.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
