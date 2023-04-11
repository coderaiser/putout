'use strict';

const jsx = {
    rules: {
        'no-extra-parens': 'off',
        'react/jsx-indent': 'error',
        'react/jsx-wrap-multilines': ['error', {
            arrow: 'parens-new-line',
            return: 'parens-new-line',
            declaration: 'parens-new-line',
        }],
    },
    plugins: ['react'],
    settings: {
        react: {
            version: 'latest',
        },
    },
};

module.exports = [{
    files: ['*.jsx'],
    ...jsx,
}];

module.exports.jsx = jsx;

