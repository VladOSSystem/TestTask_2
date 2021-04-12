module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 'off',
    'padded-blocks': 'off',
    'eol-last': 'off',
    'brace-style': 'off',
    'indent': 'off',
    'no-trailing-spaces': 'off',
    'no-plusplus': 'off',
    'new-cap': 'off',
  },
};
