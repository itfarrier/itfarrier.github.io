module.exports = {
  overrides: [
    {
      env: { amd: true, commonjs: true, es2022: true, node: true },
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      files: ['**/*.config.js', '**/{,.}*rc*.js'],
      plugins: ['import', 'sort-keys-fix', 'sort-destructure-keys'],
      rules: {
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
        'sort-destructure-keys/sort-destructure-keys': 2,
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: true,
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        'sort-keys': ['error', 'asc', { caseSensitive: true, minKeys: 2, natural: false }],
        'sort-keys-fix/sort-keys-fix': 'error',
        'sort-vars': 'error',
      },
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
