/** @type { import('eslint').Linter.Config }  */
module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['prettier'],
  rules: {
    indent: 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'spaced-comment': ['error', 'always'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.tsx'] }],
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/self-closing-comp': ['error', { component: true, html: false }],
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'no-unused-vars': [
      'error',
      { destructuredArrayIgnorePattern: '^_', argsIgnorePattern: '^_' }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  }
};
