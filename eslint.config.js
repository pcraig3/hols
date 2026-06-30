const { defineConfig } = require('eslint/config')
const globals = require('globals')

module.exports = defineConfig([
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral *'] }],
      'linebreak-style': 'off',
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'never'],
      'no-console': 'error',
    },
  },
])