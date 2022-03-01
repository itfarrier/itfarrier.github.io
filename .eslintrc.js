module.exports = {
  overrides: [
    {
      env: { amd: true, commonjs: true, node: true },
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      files: ['**/*.config.js', '**/{,.}*rc*.js'],
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
    {
      extends: [
        'eslint:recommended',
        'plugin:yml/standard',
        'plugin:yml/prettier',
        'plugin:prettier/recommended',
      ],
      files: ['*.yaml', '*.yml'],
    },
    {
      extends: ['plugin:prettier/recommended', 'plugin:md/recommended'],
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
      rules: { 'prettier/prettier': ['error', { parser: 'markdown' }] },
    },
  ],
  root: true,
};
