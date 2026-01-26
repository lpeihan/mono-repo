import type { Config } from 'stylelint';

const config: Config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue',
  ],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/public/**'],
  rules: {
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'custom-property-empty-line-before': null,
    'declaration-property-value-no-unknown': null,
    'custom-property-pattern': null,
    'at-rule-no-deprecated': null,
    'at-rule-no-unknown': null,
    'import-notation': null,
  },
};

export default config;
