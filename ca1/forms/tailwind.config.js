/** @type {import('tailwindcss').Config} */
module.exports = {
    // modules that will use tailwindcss (.jsx or .tsx extensions)
    content: [
        "./src/pages/**/*.{jsx,tsx}",
        "./src/components/**/*.{jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
