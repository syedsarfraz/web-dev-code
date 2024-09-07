
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/**/*.{ts,html}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}

