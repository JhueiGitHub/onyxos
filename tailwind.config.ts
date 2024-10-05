module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "underlying-bg": "rgba(41, 41, 41, 0.81)",
        "overlaying-bg": "rgba(1, 2, 3, 0.69)",
        border: "rgba(41, 41, 41, 0.81)",
        black: "#000000",
        glass: "rgba(0, 0, 0, 0.30)",
        white: "rgba(204, 204, 204, 0.69)",
        active: "#28C840",
        warning: "#FEBC2E",
        error: "#FF5F57",
        "lilac-accent": "#7B6CBD",
        "teal-accent": "#003431",
        "text-primary": "#ABC4C3",
        "text-secondary": "#748393",
      },
      fontFamily: {
        'primary': ['Arial', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
};
