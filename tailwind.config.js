/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				"mod-accent": "#8bb174",
				"mod-purple": "#802770",
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						"h1, h2, h3, h4, h5, h6": {
							marginTop: theme("spacing.1"),
							marginBottom: theme("spacing.1"),
						},
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
