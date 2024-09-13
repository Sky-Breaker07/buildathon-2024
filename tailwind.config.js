/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				clrBlue: 'hsla(230, 100%, 70%, 1)',
				clrRed: 'hsla(0, 100%, 64%, 1)',
				clrBlack: 'hsla(218, 15%, 11%, 1)',
				clrWhite: 'hsla(231, 100%, 97%, 1)',
				clrOffWhite: 'hsla(0, 0%, 85%, 1)',
				offWhiteAlt: 'hsla(0, 0%, 70%, 1)',
				purplish: 'hsla(230, 100%, 97%, 1)',
				grayish: 'hsla(219, 12%, 76%, 1)',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				afacad: ['Afacad', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
