/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",,
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary :"#08D9D6",
        secondry:"#35c0be"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(),require('daisyui')],
};
