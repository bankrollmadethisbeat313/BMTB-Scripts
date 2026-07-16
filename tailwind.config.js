/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bmtb: {
          bg: "#080808",
          card: "#0f0f0f",
          elevated: "#141414",
          line: "rgba(255,255,255,0.08)",
          muted: "#A0A0A0",
          accent: "#FACC15",
          "accent-soft": "rgba(250,204,21,0.14)",
          "accent-glow": "rgba(250,204,21,0.35)",
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
        display: ['"Syne"', '"Instrument Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(0,0,0,0.45)",
        lift: "0 24px 60px rgba(0,0,0,0.55)",
        accent: "0 0 0 1px rgba(250,204,21,0.35), 0 12px 40px rgba(250,204,21,0.18)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}
