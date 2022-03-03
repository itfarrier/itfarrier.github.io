module.exports = {
  extends: ['.eslintrc.defaults.js', 'plugin:import/warnings'],
  overrides: [
    {
      extends: ['plugin:import/typescript', 'plugin:prettier/recommended'],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname },
      plugins: ['@typescript-eslint', 'prettier'],
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
  ],
  plugins: ['import', 'sort-destructure-keys'],
  rules: {
    'import/order': [
      'warn',
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
    'prettier/prettier': 'warn',
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-vars': 'warn',
  },
};
