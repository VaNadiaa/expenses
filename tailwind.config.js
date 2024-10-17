/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-color-purple": "#6b54ec",
        "my-color-blue": "#7d86ff",
        "my-color-orange": "#ffb456",
        "my-color-gray": "rgba(118, 122, 127, 0.8)",
        "my-color-light-purple": "rgb(231, 227, 252)"
      },
      keyframes: {
        wiggle: {
          "0%": {
            transform: "translateX(calc(-110% - 10px))"
          },
          "100%": {
            transform: "translateX(0)"
          },
        },
        dropdown: {
          "0%": {
            transform: "translateY(-20%)"
          },
          "100%": {
            transform: "translateY(0)"
          },
        },
        toLeft: {
          "0%": {
            transform: "translateX(-10%)"
          },
          "100%": {
            transform: "translateX(0)"
          },
        }
      },
    },
  },
  plugins: [],
};
