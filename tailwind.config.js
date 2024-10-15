/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#EDEDED", // Softer white
        bg: "#1C1C1C", // Matte black
        primary: "#D3CEC4", // Subtle beige
        accent: "#8D70AE", // Could remain, but muted version
        bgContrast: "#2C2C2C", // Softer contrast
      },
    },
  },
  plugins: [],
};
