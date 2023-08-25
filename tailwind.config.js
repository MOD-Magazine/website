/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				"mod-accent": "#8bb174"
			}
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
