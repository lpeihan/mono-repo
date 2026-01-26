export default {
  '**/*.{js,jsx,ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '**/*.{less,css}': ['stylelint --fix', 'prettier --write'],
  '**/*.{json,md}': ['prettier --write'],
};
