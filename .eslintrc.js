module.exports = {
  overrides: [
    {
      env: { amd: true, commonjs: true, node: true },
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      files: ['*config.js'],
    },
    {
      extends: [
        'eslint:recommended',
        'plugin:jsonc/base',
        'plugin:jsonc/recommended-with-json',
        'plugin:prettier/recommended',
      ],
      files: ['*.json'],
    },
  ],
};
