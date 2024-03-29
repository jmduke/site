/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{njk,md,html}"],
  theme: {
    fontFamily: {
      sans: ["Hex Franklin", "sans-serif"],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            blockquote: {
              borderLeftWidth: "0.5rem",
              padding: "1rem",
              position: "relative",
              fontStyle: "normal",
              backgroundColor: theme("colors.gray.50"),
            },
            "blockquote p": {
              margin: "0",
            },
            hr: {
              borderColor: theme("colors.gray.200"),
              width: "300px !important",
              margin: "2rem auto",
            },
            p: {
              fontSize: "18px",
              lineHeight: "1.7",
              color: "black",
            },
            li: {
              fontSize: "18px",
              lineHeight: "1.7",
              color: "black",
            },
            h1: {
              color: "black",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
