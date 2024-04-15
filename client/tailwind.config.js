/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        grandstander: ["Grandstander", "cursive"],
      },
      colors: {
        "app-bg": "#92AEC1",
        "app-bg-light": "#C3DCE8",
        "app-text": "#152E3E",
        "app-board-background": "#C0D2E4",
      },
    },
  },
  plugins: [],
};
