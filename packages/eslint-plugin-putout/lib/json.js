'use strict';

module.exports = [{
    files: ['*.json', '*{json}'],
    rules: {
        'quotes': ['error', 'double'],
        'quote-props': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': 'off',
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
}, {
    files: '*ignore{json}',
    rules: {
        'comma-dangle': 'off',
    },
}, {
    files: '*.yml{json}',
    rules: {
        indent: 'off',
    },
}];

