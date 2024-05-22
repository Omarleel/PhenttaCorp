const plugin = require('tailwindcss/plugin');
const { colors, colorNegro, colorBlanco } = require('./src/constants/colors');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      boxShadow: {
        'top-md': '0 -4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.bg-primary-light': {
          backgroundColor: colors.primaryLight,
        },
        '.bg-primary-dark': {
          backgroundColor: colors.primaryDark,
        },
        '.bg-secondary-light': {
          backgroundColor: colors.secondaryLight,
        },
        '.bg-secondary-dark': {
          backgroundColor: colors.secondaryDark,
        },
        '.bg-selector-light': {
          backgroundColor: colors.selectorLight,
        },
        '.bg-hover-selector-light': {
          backgroundColor: colors.hoverSelectorLight,
        },
        '.bg-selector-dark': {
          backgroundColor: colors.selectorDark,
        },
        '.bg-hover-selector-dark': {
          backgroundColor: colors.hoverSelectorDark,
        },
        '.text-color-hover': {
          color: colors.hoverSelectorLight,
        },
        '.text-color-hover-dark': {
          color: colors.hoverSelectorDark,
        },
        '.border-light': {
          borderColor: colorNegro,
        },
        '.border-dark': {
          borderColor: colorBlanco,
        },
      };
      addUtilities(newUtilities, ['dark']);
    }),
  ],
};
