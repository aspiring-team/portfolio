/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      wordmark: "#6090FA",
      transparent: "transparent",
      black: "#000000",
      white: "#FFFFFF",
      gray: {
        DEFAULT: "#475467",
        25: "#FCFCFD",
        50: "#F9FAFB",
        100: "#F2F4F7",
        200: "#EAECF0",
        300: "#D0D5DD",
        400: "#98A2B3",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        800: "#1D2939",
        900: "#101828",
      },
      primary: {
        DEFAULT: "#2563EB",
        25: "#F5F8FF",
        50: "#F0F5FF",
        100: "#E3EBFC",
        200: "#C6D8FF",
        300: "#8FB0FA",
        400: "#6591F3",
        500: "#4472D6",
        600: "#2563EB",
        700: "#0649DC",
        800: "#0036AB",
        900: "#002983",
      },
      secondary: {
        DEFAULT: "#7F56D9",
        25: "#FCFAFF",
        50: "#F9F5FF",
        100: "#F4EBFF",
        200: "#E9D7FE",
        300: "#D6BBFB",
        400: "#B692F6",
        500: "#9E77ED",
        600: "#7F56D9",
        700: "#6941C6",
        800: "#53389E",
        900: "#42307D",
      },
      error: {
        DEFAULT: "#D92D20",
        25: "#FFFBFA",
        50: "#FEF3F2",
        100: "#FEE4E2",
        200: "#FECDCA",
        300: "#FDA29B",
        400: "#F97066",
        500: "#F04438",
        600: "#D92D20",
        700: "#B42318",
        800: "#912018",
        900: "#7A271A",
      },
      warning: {
        DEFAULT: "#DC6803",
        25: "#FFFCF5",
        50: "#FFFAEB",
        100: "#FEF0C7",
        200: "#FEDF89",
        300: "#FEC84B",
        400: "#FDB022",
        500: "#F79009",
        600: "#DC6803",
        700: "#B54708",
        800: "#93370D",
        900: "#7A2E0E",
      },
      success: {
        DEFAULT: "#039855",
        25: "#F6FEF9",
        50: "#ECFDF3",
        100: "#D1FADF",
        200: "#A6F4C5",
        300: "#6CE9A6",
        400: "#32D583",
        500: "#12B76A",
        600: "#039855",
        700: "#027A48",
        800: "#05603A",
        900: "#054F31",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-space-grotesk)",
          ...fontFamily.sans,
        ],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        "space-grotesk": ["var(--font-space-grotesk)", ...fontFamily.sans],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      boxShadow: {
        xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        "hover-card":
          "hsl(206 22% 7% / 35%) 0px 10px 38px -10px,hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
    ({ addComponents }) => {
      addComponents({
        ".h1": {
          "@apply text-6xl leading-tight tracking-tight md:text-7xl": {},
        },
        ".h2": {
          "@apply text-5xl leading-tight tracking-tight md:text-6xl": {},
        },
        ".h3": {
          "@apply text-4xl leading-tight tracking-tight md:text-5xl": {},
        },
        ".h4": {
          "@apply text-3xl leading-tight tracking-tight md:text-4xl": {},
        },
        ".h5": {
          "@apply text-2xl leading-tight tracking-tight md:text-3xl": {},
        },
        ".h6": {
          "@apply text-xl leading-normal md:text-2xl md:leading-snug": {},
        },
        ".p1": {
          "@apply text-lg leading-normal md:text-xl": {},
        },
        ".p2": {
          "@apply text-base leading-normal md:text-lg": {},
        },
        ".p3": {
          "@apply text-sm leading-normal md:text-base": {},
        },
        ".p4": {
          "@apply text-xs leading-normal md:text-sm": {},
        },
        ".p5": {
          "@apply text-2xs leading-normal md:text-xs": {},
        },
      });
    },
  ],
};
