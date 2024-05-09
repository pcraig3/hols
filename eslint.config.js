const globals = require('globals')

module.exports = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: { ...globals.node },
  },
  plugins: {
    jest: {
      globals: true,
    },
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral *'] }],
    'linebreak-style': 'off', // Changed from 0 to 'off' to use string values
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'never'],
    'no-console': 'error',
  },
}
