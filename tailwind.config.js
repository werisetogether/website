module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./Components/**/*.{js,ts,jsx,tsx}"],
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
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
