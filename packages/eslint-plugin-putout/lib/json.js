'use strict';

module.exports = [{
    files: [
        '*.json',
        '*{json}',
    ],
    rules: {
        'no-undef': 'off',
        '@stylistic/js/quotes': [
            'error',
            'double',
        ],
        '@stylistic/js/quote-props': [
            'error',
            'always',
        ],
        '@stylistic/js/comma-dangle': [
            'error',
            'never',
        ],
        '@stylistic/js/comma-spacing': 'off',
        '@stylistic/js/function-paren-newline': 'off',
        '@stylistic/js/eol-last': [
            'error',
            'always',
        ],
        '@stylistic/js/no-multi-spaces': 'off',
    },
}, {
    files: 'package.json',
    rules: {
        '@stylistic/js/indent': [
            'error',
            2,
        ],
    },
}, {
    files: '*ignore{json}',
    rules: {
        '@stylistic/js/comma-dangle': 'off',
    },
}, {
    files: '*.yml{json}',
    rules: {
        '@stylistic/js/indent': 'off',
    },
}];
