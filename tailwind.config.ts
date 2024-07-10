// tailwind.config.ts
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#13da87',
        'customGreen-light': '#7ae0b4',
        'green': '#86d7cc',
      },
    },
  },
  plugins: [],
};
