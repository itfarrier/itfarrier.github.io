module.exports = {
  '*.{css,js,json,jsx,markdown,md,scss,ts,tsx}': ['prettier --write'],
  '*.{js,jsx,ts,tsx}': ['eslint -c ./.eslintrc.autoFixes.js --fix --no-eslintrc'],
};
