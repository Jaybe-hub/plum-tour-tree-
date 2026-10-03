import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        // Brand — Purple & Gold (updated per client logo, Phase 8 pivot)
        purple: {
          900: "#2E0F36",
          700: "#4E1B5C",
          500: "#7A3D8C",
          300: "#A874B5"
        },
        gold: { DEFAULT: "#C9A227", hover: "#B08F1F", active: "#96791A", muted: "#E5DCC0" },
        beige: { DEFAULT: "#F6F1E4", dark: "#EDE4CE" },
        ink: { DEFAULT: "#241429", secondary: "#4A3B52", muted: "#7A6B3E" }
      },
      fontFamily: { sans: ["var(--font-jakarta)", "system-ui", "sans-serif"] },
      fontSize: {
        h1: ["2rem", { lineHeight: "1.25", fontWeight: "500" }],
        h2: ["1.5rem", { lineHeight: "1.3", fontWeight: "500" }],
        h3: ["1.125rem", { lineHeight: "1.4", fontWeight: "500" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em", fontWeight: "500" }]
      },
      borderRadius: { card: "16px", control: "8px" },
      boxShadow: { card: "0 1px 3px rgba(46,15,54,0.08)", "card-hover": "0 8px 24px rgba(46,15,54,0.14)" },
      keyframes: { "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } } },
      animation: { "fade-up": "fade-up 0.6s ease-out forwards" }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
