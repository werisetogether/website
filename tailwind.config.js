/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Montserrat", "sans-serif"],
		},
		extend: {
			colors: {
				red: {
					primary: "#fb5775",
				},
			},
		},
	},
	plugins: [
		require("daisyui"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/forms"),
	],
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/colors/themes")["[data-theme=light]"],
					primary: "#fb5775",
					"primary-focus": "#fb5775",
				},
			},
		],
	},
};
