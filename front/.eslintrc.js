/* eslint-disable quote-props */
module.exports = {
    'env': {
        "browser": true,
        "es2021": true,
    },
    "extends": "plugin:react/recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    "plugins": [
        "react",
    ],
    "rules": {
        'quotes': 'off',
        'no-underscore-dangle': 'off',
        'default-case': 'off',
        'import/prefer-default-export': 'off',
        'react/react-in-jsx-scope': 'off',
        'arrow-body-style': 'off',
        'react/prop-types': 'off', 

    },
}; 
