module.exports = {
  overrides: [
    // JavaScript config files like ".examplerc", ".examplerc.js" or "example.config.js"
    {
      env: { amd: true, commonjs: true, es2024: true, node: true, 'shared-node-browser': true },
      excludedFiles: '.lintstagedrc',
      extends: [
        'eslint:recommended',
        'plugin:perfectionist/recommended-alphabetical',
        'plugin:prettier/recommended',
      ],
      files: ['**/*.config.js', '**/.*rc{,.js}'],
      plugins: ['perfectionist'],
    },

    // JSON files like "example.json"
    {
      extends: [
        'eslint:recommended',
        'plugin:json-schema-validator/recommended',
        'plugin:jsonc/base',
        'plugin:jsonc/prettier',
        'plugin:jsonc/recommended-with-json',
        'plugin:prettier/recommended',
      ],
      files: ['*.json', '.lintstagedrc'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-array-values': ['error', { order: { type: 'asc' }, pathPattern: '.*' }],
        'jsonc/sort-keys': ['error', { order: { type: 'asc' }, pathPattern: '.*' }],
      },
    },

    // TypeScript files like "example.ts" or "example.tsx"
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:perfectionist/recommended-alphabetical',
        'plugin:prettier/recommended',
      ],
      files: ['**/*.ts{,x}'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: true, tsconfigRootDir: __dirname },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '_*', varsIgnorePattern: '_*' },
        ],
        'react/jsx-boolean-value': ['error', 'always'],
        'react/jsx-curly-brace-presence': ['error', 'always'],
      },
    },
  ],
  root: true,
};
