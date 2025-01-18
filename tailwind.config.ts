import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0E100E",
        primary: "#E2FDE6",
      },
      fontFamily: {
        'anonymous': ['Anonymous Pro', 'sans-serif'],
        'dm-mono': ['DM Mono', 'sans-serif'],
        'ibm-plex': ['IBM Plex Mono', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
