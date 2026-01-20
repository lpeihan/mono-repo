import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
  },
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
  ],
  rules: {
    'pnpm/json-prefer-workspace-settings': 'off',
    'pnpm/yaml-enforce-settings': 'off',
  },
}, {
  files: ['**/vite.config.ts'],
  rules: {
    'node/prefer-global/process': 'off',
  },
})
