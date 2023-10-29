module.exports = {
  overrides: [
    // JavaScript config files like ".examplerc", ".examplerc.js" or "example.config.js"
    {
      env: { amd: true, commonjs: true, es2024: true, node: true, 'shared-node-browser': true },
      extends: ['eslint:recommended', 'plugin:perfectionist/recommended-alphabetical', 'plugin:prettier/recommended'],
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
      files: '*.json',
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-array-values': ['error', { order: { type: 'asc' }, pathPattern: '.*' }],
        'jsonc/sort-keys': ['error', { order: { type: 'asc' }, pathPattern: '.*' }],
      },
    },

    // TypeScript files like "example.ts"
    {
      excludedFiles: ['**/*.tsx', '{.,}*.test.ts{,x}'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:perfectionist/recommended-alphabetical',
        'plugin:prettier/recommended',
      ],
      files: '**/*.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: { project: true, tsconfigRootDir: __dirname },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_*', varsIgnorePattern: '_*' }],
      },
    },

    // TypeScript JSX files like "example.tsx"
    {
      excludedFiles: ['**/*.ts', '{.,}*.test.ts{x,}'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:perfectionist/recommended-alphabetical',
        'plugin:prettier/recommended',
      ],
      files: '**/*.tsx',
      parser: '@typescript-eslint/parser',
      parserOptions: { project: true, tsconfigRootDir: __dirname },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_*', varsIgnorePattern: '_*' }],
      },
    },

    // TypeScript test files like "example.test.ts"
    {
      env: { amd: true, commonjs: true, es2022: true, jest: true, node: true },
      excludedFiles: '**/*.ts{,x}',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:perfectionist/recommended-alphabetical',
        'plugin:prettier/recommended',
      ],
      files: '{.,}*.test.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: { project: true, tsconfigRootDir: __dirname },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_*', varsIgnorePattern: '_*' }],
      },
    },

    // TypeScript JSX test files like "example.test.tsx"
    {
      env: { amd: true, commonjs: true, es2022: true, jest: true, node: true },
      excludedFiles: '**/*.ts{,x}',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:perfectionist/recommended-alphabetical',
        'plugin:prettier/recommended',
      ],
      files: '{.,}*.test.tsx',
      parser: '@typescript-eslint/parser',
      parserOptions: { project: true, tsconfigRootDir: __dirname },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_*', varsIgnorePattern: '_*' }],
        'react/jsx-boolean-value': ['error', 'always'],
        'react/jsx-curly-brace-presence': ['error', 'always'],
      },
    },

    // Markdown files like "example.md"
    {
      extends: ['plugin:prettier/recommended', 'plugin:md/recommended'],
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
      rules: {
        'md/remark': ['error', { plugins: [['lint-maximum-line-length', false]] }],
        'prettier/prettier': ['error', { parser: 'markdown' }],
      },
    },
  ],
  root: true,
};
