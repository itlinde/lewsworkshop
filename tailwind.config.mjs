/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fffbf6",
        backgroundDark: "#EFEAE3",
        primary: "#8db0cd",
        primaryLight: "#CBDDED",
        primaryDark: "#789DBC",
        secondary: "#CBDDED",
        secondaryLight: "#DEEEFC",
        textDark: "#535353",
        textLight: "#7A736B",
        accent: "#edc0cb",
        successGreen: "#C8DA95",
        progressYellow: "#FFDE97",
        failRed: "#F27878",
      },
      fontFamily: {
        inclusiveSans: ["var(--font-inclusive-sans)", "Arial", "serif"],
        darumadrop: ["var(--font-darumadrop-one)", "Arial", "serif"],
      },
    },
  },
  plugins: [],
};
