import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        "primary-light": "#DBEAFE",
        "primary-dark": "#1E40AF",
        secondary: "#8B5CF6",
        "secondary-light": "#EDE9FE",
        "secondary-dark": "#5B21B6",
        success: "#10B981",
        "success-light": "#D1FAE5",
        "success-dark": "#047857",
        warning: "#F59E0B",
        "warning-light": "#FEF3C7",
        "warning-dark": "#D97706",
        danger: "#EF4444",
        "danger-light": "#FEE2E2",
        "danger-dark": "#DC2626",
        info: "#06B6D4",
        "info-light": "#CFFAFE",
        "info-dark": "#0891B2",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-in": "slideIn 0.3s ease-out",
        "spin-slow": "spinSlow 12s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        "lg-soft": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
