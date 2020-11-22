'use strict';

module.exports = [{
    files: ['*.json', '*.*{json}'],
    rules: {
        'quotes': ['error', 'double'],
        'quote-props': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'function-paren-newline': 'off',
        'no-undef': 'off',
        'eol-last': 'off',
        'no-multi-spaces': 'off',
    },
}, {
    files: 'package.json',
    rules: {
        indent: ['error', 2],
    },
}];

