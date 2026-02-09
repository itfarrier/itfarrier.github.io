module.exports = {
  '*': ['eslint --debug --fix'],
  '*.{js,jsx,ts,tsx,mjs,cjs,json,json5,css,scss,less,html,md,mdx,yml,yaml,graphql,gql,vue,sh}': [
    'prettier --log-level debug --write',
  ],
};
