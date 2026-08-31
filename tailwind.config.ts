import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#03030A",
          900: "#060612",
          850: "#09091A",
          800: "#0d0d1f",
        },
        violet: {
          deep: "#071B55",
          electric: "#3023AE",
          bright: "#6C3BFF",
        },
        magenta: {
          DEFAULT: "#D728A9",
          soft: "#9328D6",
        },
        muted: "#9898A8",
      },
      fontFamily: {
        display: ['"Clash Display"', '"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"General Sans"', '"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(120deg, #071B55 0%, #3023AE 32%, #6C3BFF 58%, #9328D6 78%, #D728A9 100%)",
        "brand-radial":
          "radial-gradient(60% 60% at 50% 40%, rgba(108,59,255,0.35) 0%, rgba(215,40,169,0.12) 45%, rgba(3,3,10,0) 78%)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-x-rev": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        marquee: "marquee-x 32s linear infinite",
        "marquee-rev": "marquee-x-rev 32s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
