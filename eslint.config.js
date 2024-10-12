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
      parserOptions: { projectService: { allowDefaultProject: ['*.js', '*.ts'] }, tsconfigRootDir: __dirname },
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: { globals: { ...globals.browser, ...globals.builtin } },
    name: 'TypeScript',
    plugins: { perfectionist },
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
    languageOptions: { globals: { ...globals.builtin, ...globals.node } },
    name: 'JavaScript configs',
    rules: { '@typescript-eslint/no-require-imports': 'off', '@typescript-eslint/no-unsafe-assignment': 'off' },
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
