export default {
  plugins: {
    autoprefixer: {},
    '@tailwindcss/postcss': {},
    'postcss-mobile-forever': {
      appSelector: '#app',
      viewportWidth: 375,
      maxDisplayWidth: 600,
      border: true,
      rootContainingBlockSelectorList: [
        '.van-tabbar',
        '.van-popup',
        '.van-popup--bottom',
        '.van-popup--top',
        '.van-popup--left',
        '.van-popup--right',
      ],
    },
  },
};
