/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d32f2f", // اللون الأحمر (للتجاوز)
        success: "#388e3c", // اللون الأخضر (للفائض)
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  darkMode: "class", // أو "media" حسب تفضيلك
  plugins: [],
};

