import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0E1712",
          900: "#16241F",
          800: "#1F3129",
          700: "#2B4438",
          600: "#3D5C4C",
        },
        paper: {
          50: "#FBF9F3",
          100: "#F5F1E6",
          200: "#ECE4CE",
        },
        brass: {
          400: "#CFA24C",
          500: "#B8862B",
          600: "#9C701F",
        },
        oxblood: {
          600: "#7A2E2E",
          700: "#5E2222",
        },
        sage: {
          500: "#6B7A63",
          600: "#566150",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "brass-rule": "linear-gradient(90deg, transparent, #B8862B, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
