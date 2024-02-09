/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{njk,md,html}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
