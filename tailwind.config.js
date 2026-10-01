/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./.components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./tools/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ⭐ Custom classes for Sensor Devices page
      spacing: {
        "page-padding": "2rem",
      },
      maxWidth: {
        "page-width": "900px",
        "sensor-img": "400px",
      },
      borderRadius: {
        "sensor-img": "8px",
      },
      lineHeight: {
        "paragraph": "1.6",
      },
      fontSize: {
        "page-title": "2rem",
      },
    },
  },
  plugins: [],
};
