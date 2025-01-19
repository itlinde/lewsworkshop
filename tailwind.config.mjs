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
        background: "#FEF9F2",
        backgroundDark: "#EFEAE3",
        primary: "#789DBC",
        primaryLight: "#CBDDED",
        secondary: "#D78A9D",
        secondaryLight: "#FFE3E3",
        textDark: "#535353",
        textLight: "#7A736B",
      },
      fontFamily: {
        inclusiveSans: ["var(--font-inclusive-sans)", "Arial", "serif"],
        darumadrop: ["var(--font-darumadrop-one)", "Arial", "serif"],
      },
    },
  },
  plugins: [],
};
