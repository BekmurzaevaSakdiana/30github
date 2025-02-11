import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray1: "#F3F3F3",
        buttonPink: "#FE73A4",
        borderColor: "#BFBFBF4D",
        maBlue: "#57D6E7",
        maBlack: "#333333",
        maHalfBlack: "#333333BF",
        fiftyProcentBlack:"#00000080",
        maHzBlack:"#000000",
        anyBlack:'#2A2A2A',
        anyBlack2:'#2B2B2B',
        anyBlue:'#3E95EF',
        bgPink:"#F5B0B8",
        saShaGray:"#696969",
        anyGray:"#474747",
        anyGreen:"#4DCA5B"

      },

      boxShadow: {
        'custom-inset': 'inset 0px 0px 4px 0px rgba(0, 0, 0, 0.09)', // Кастомная тень
      },

      backgroundImage: {
        'gradient': 'linear-gradient(89.85deg, #F4F4F4 -1.06%, #E4E4E4 105.44%)',
      },

      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        kaushan:['"Kaushan Script", cursive'],
        montseratt:[' "Montserrat", sans-serif']
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "3rem",
          lg: "4rem",
          xl: "5rem",
        },
        screens: {
          sm: "100%",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
