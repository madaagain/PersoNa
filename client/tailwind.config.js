/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts,svg}"],
  theme: {
    extend: {
      colors: {
        "sisley-white": "#F8F5ED",
        "sisley-grey": "#8D8B8B",
        "sisley-purple": "#6119AD",
        "sisley-dark": "#313131"
      },
      spacing: {
        '128': '32rem'
      }
    },
    fontFamily: {
      "sans": ["Roboto"]
    }
  },
  plugins: [],
  darkMode: 'class',
};
