import type { Config } from "tailwindcss";
const sparkleColors = require("./style-dictionary/build/color.tailwind");

/// Semantics colors
const semanticsColors = {
  neutral: sparkleColors.gray,
  primary: sparkleColors['blue'],
  secondary: sparkleColors.gray,
  info: sparkleColors.blue,
  success: sparkleColors.green,
  warning: sparkleColors.yellow,
  negative: sparkleColors.red,
};

/// Components colors
const componentsColors = {
  divider: {
    low: semanticsColors.neutral[100],
    middle: semanticsColors.neutral[200],
    high: semanticsColors.neutral[300],
  },
  text: {
    disabled: semanticsColors.neutral[200],
    placeholder: semanticsColors.neutral[300],
    low: semanticsColors.neutral[500],
    middle: semanticsColors.neutral[700],
    high: semanticsColors.neutral[900],
  },
  skeleton: {
    fill: semanticsColors.neutral[200],
  }
}

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...sparkleColors,
        ...semanticsColors,
        ...componentsColors,
        // NOTE: 以下はSpakrleにないトークン定義
        base: sparkleColors.gray,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        divide: "var(--radius-none)",
        minimum: "var(--radius-xs)",
        notice: "var(--radius-sm)",
        action: "var(--radius-md)",
        halfModal: "var(--radius-lg)",
        modal: "var(--radius-xl)",
        round: "var(--radius-full)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    // NOTE: iconのクラスをPurgeCSSの対象外にする
    {
      pattern: /icon-\d+-fill-[01]/,
    },
    // NOTE: characterのクラスをPurgeCSSの対象外にする
    {
      pattern: /character-\d+-(?:regular|bold)-(?:pro|mono)/,
    }
  ],
} satisfies Config;

export default config;
