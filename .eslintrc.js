module.exports = {
  extends: [
    '.eslintrc.defaults.js',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  overrides: [
    {
      excludedFiles: ['*.test.ts', '*.test.tsx'],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jsx-a11y/strict',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
      ],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname },
      plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'prettier'],
      rules: {
        'react/prop-types': 0,
      },
      settings: {
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/resolver': { typescript: { alwaysTryTypes: true } },
      },
    },
    {
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:prettier/recommended',
      ],
      files: ['*.test.ts', '*.test.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname },
      plugins: ['@typescript-eslint', 'jest', 'prettier'],
      settings: {
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/resolver': { typescript: { alwaysTryTypes: true } },
      },
    },
    {
      extends: ['plugin:prettier/recommended'],
      files: ['*.js', '*.jsx'],
      parser: 'espree',
      plugins: ['prettier'],
    },
    {
      extends: ['plugin:eslint-plugin-json-es/recommended', 'plugin:prettier/recommended'],
      files: ['*.json'],
      parser: 'eslint-plugin-json-es',
      plugins: ['prettier'],
    },
  ],
  plugins: ['import', 'sort-destructure-keys'],
  rules: {
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'unknown',
        ],
        'newlines-between': 'always',
        pathGroups: [{ group: 'builtin', pattern: 'react', position: 'before' }],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'prettier/prettier': 'error',
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-vars': 'error',
  },
};
