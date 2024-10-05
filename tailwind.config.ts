module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "underlying-bg": "#292929",
        "overlaying-bg": "#010203",
        border: "#292929",
        glass: "#000000",
        white: "#CCCCCC",
        active: "#28C840",
        warning: "#FEBC2E",
        error: "#FF5F57",
        "lilac-accent": "#7B6CBD",
        "teal-accent": "#003431",
        "text-primary": "#ABC4C3",
        "text-secondary": "#748393",
      },
    },
  },
  plugins: [require("daisyui")],
};
