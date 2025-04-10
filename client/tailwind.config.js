// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A0DDEB', // Soft teal
          DEFAULT: '#34B3C1', // Calming blue-green
          dark: '#24818C',
        },
        neutral: {
          50: '#FAFAF6', // Soft off-white background
          900: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ["'Nunito'", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
