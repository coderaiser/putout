'use strict';

const jsx = {
    rules: {
        'react/jsx-indent': 'error',
        'react/jsx-wrap-multilines': ['error', {
            arrow: 'ignore',
            return: 'parens-new-line',
            declaration: 'ignore',
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

