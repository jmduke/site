/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{njk,html}", "./posts/post/order-css-tailwind.md"],
  theme: {
    fontFamily: {
      sans: ["Hex Franklin", "sans-serif"],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            blockquote: {
              position: "relative",
              fontStyle: "normal",
              backgroundColor: theme("colors.gray.50"),
              margin: "1rem -3rem",
              padding: "1rem 3rem !important",
              borderTop: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
            },
            "blockquote p:first-of-type": {
              margin: "0 !important",
            },
            hr: {
              borderColor: theme("colors.gray.200"),
              width: "320px !important",
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
