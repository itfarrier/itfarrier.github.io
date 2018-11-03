const cssDeclarationSorter = require('css-declaration-sorter');
const cssNano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      stage: 0,
    }),
    cssDeclarationSorter({ order: 'smacss' }),
    cssNano({
      discardComments: {
        removeAll: true,
      },
      preset: 'advanced',
    }),
  ],
});
