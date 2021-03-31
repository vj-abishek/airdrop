/**  eslint disable */

module.exports = {
  purge: [
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Nunito', sans-serif"],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700',
        semibold: '600',
        extrabold: '800',
      },
      colors: {
        primary: '#061E23',
        secondary: '#004552',
        white: '#F4F4F9',
        accent: '#00B2D2',
        light: '#f1f1f2a1',
        dark: '#00313A',
      },
      screens: {
        light: { raw: '(prefers-color-scheme: light)' },
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
    },
  },
  variants: {},
  plugins: [
    ({ addBase, config }) => {
      addBase({
        body: {
          color: config('theme.colors.black'),
          backgroundColor: config('theme.colors.white'),
        },
        '@screen dark': {
          body: {
            color: config('theme.colors.white'),
            backgroundColor: config('theme.colors.primary'),
          },
        },
      });
    },
  ],
};
