const eslint = require('@eslint/js');
const perfectionist = require('eslint-plugin-perfectionist');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const jsoncParser = require('jsonc-eslint-parser');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['*.js'] },
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.builtin },
    },
    name: 'TypeScript',
    rules: {
      // Off until context.parserOptions is reliably set by the parser (projectService)
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/no-deprecated': 'off',
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['**/*.js'],
    ignores: ['**/*.config.js'],
    name: 'JavaScript',
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['**/*.config.js'],
    languageOptions: {
      globals: { ...globals.builtin, ...globals.node },
      parserOptions: { program: null, project: false, projectService: false },
    },
    name: 'JavaScript configs',
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    ...tseslint.configs.disableTypeChecked,
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
    name: 'JSON',
  },
  perfectionist.configs['recommended-natural'],
  eslintPluginPrettierRecommended,
);
