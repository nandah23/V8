import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        calibri: ['Calibri', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;