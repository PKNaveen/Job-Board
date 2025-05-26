import type {Config} from "tailwindcss";
import {fontFamily} from "tailwindcss/defaultTheme";

const config: Config = {
      darkMode:["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

  theme:{
  	extend: {
  		screens: {
  			xs: '475px'
  		},
		backgroundImage:{
			"primary-gradient": "linear-gradient(\n" +
				"  to bottom,\n" +
				"  #4A90E2,\n" +
				"  #ecf5fc  48%,\n" +
				"  #4A90E2 68%,\n" +
				"  #2C6693 100%\n" +
				");",
			frost: "repeating-linear-gradient(to right, rgba(255,255,255,.04) 0%, rgba(0,0,0,.39) 49%, rgba(255,255,255,.27) 100%)"
		},
  		colors: {
				primary:{
					"100":"#000000",
					DEFAULT:"#000000"
				},
				dark:{
					"100":"#000000",
					"200":"#131313",
					"250":"#18181C",
					"275":"#1e1f24",
					"300":"#313030",
					"400":"#6E6E6E",
					"500":"#D2D3E0",
					"test":"#1a1b1d",
					"dialog":"#151621",
					"button-400":"#858699",
					"button-600":"#5C67C7",
					DEFAULT: "#000000",

				},
				light:{
					"100":"#f0f0f0",
				},
				text:{
					"main":"#EEEFFC",
					"main-sub":"#E0E1EC",
					"test":"#4A90E2",
					"header":"#DFDFDF",
					"sub-header":"#D0D0D0",
					"date":"#6E6E6E",
					DEFAULT: "#FFFFFF",
				},
				icon:{
					"100":"#C8C8C8",
					DEFAULT:"#C8C8C8"
				},

  		},
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
                    ...fontFamily.sans
                ],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		boxShadow: {
			100: "2px 2px 0px 0px rgb(0, 0, 0)",
			200: "2px 2px 0px 2px rgb(0, 0, 0)",
			300: "2px 2px 0px 2px rgb(238, 43, 105)",
		},
  	},
  },
    plugins: [require("tailwindcss-animate")]
}

export default config;
