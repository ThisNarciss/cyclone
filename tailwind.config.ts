import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateRows: {
        "home-rows": "auto",
      },
      gridTemplateColumns: {
        "home-columns": "2fr 1fr",
      },
      colors: {
        gray: "rgb(147, 153, 162)",
        borderColor: "rgb(221, 224, 228)",
        btnColor: "rgb(68, 163, 255)",
      },
    },
  },
  plugins: [],
};
export default config;
