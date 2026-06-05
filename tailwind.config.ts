import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent: orange (was gold/yellow)
        gold: {
          light: "#FF8C42",
          DEFAULT: "#FF6B00",
          dark: "#E55A00",
        },
        orange: "#FF6B00",
        brand: {
          black: "#0A0A0A",
          gray: "#F4F4F4",
        },
        border: "#E8E8E8",
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        muted: "#666666",
        ring: "#FF6B00",
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FF6B00 0%, #FF8C42 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in": "fade-in 0.5s ease",
      },
    },
  },
  plugins: [],
};
export default config;
