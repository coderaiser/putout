'use strict';

module.exports = [{
    files: ['*.json', '*.md{json}'],
    rules: {
        'quotes': ['error', 'double'],
        'quote-props': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'function-paren-newline': 'off',
        'no-undef': 'off',
        'eol-last': 'off',
    },
}, {
    files: 'package.json',
    rules: {
        indent: ['error', 2],
    },
}];

