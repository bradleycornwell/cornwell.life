/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			white: '#FFFFFF',
			black: '#000000',
			grey: {
				100: '#F8F8F8',
				500: '#36454F',
			},
			green: {
				100: '#eef3f0',
				300: '#a9c1b2',
				500: '#528265',
				900: '#314e3d',
			},
		},
		extend: {},
	},
	plugins: [],
};
