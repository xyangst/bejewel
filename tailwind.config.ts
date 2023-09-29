import { Config } from "tailwindcss"
import colors from "tailwindcss/colors"
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		colors: {
			crack: "#0aa400",
			crack2: "#088200",
			black: colors.black
		},
		extend: {}
	},
	plugins: []
} as Config
