const { defineConfig } = require('eslint/config')
const { importX } = require('eslint-plugin-import-x')
const globals = require('globals')

module.exports = defineConfig([
  {
    plugins: {
      'import-x': importX,
    },
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
      'import-x/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        named: {
          enabled: true,
          export: false,
          cjsExports: false,
        },
      },
    ],
    },
  },
])