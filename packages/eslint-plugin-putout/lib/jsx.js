'use strict';

const jsx = {
    rules: {
        '@stylistic/js/no-extra-parens': 'off',
        '@stylistic/jsx/jsx-indent': 'error',
        '@stylistic/jsx/jsx-wrap-multilines': ['error', {
            arrow: 'parens-new-line',
            return: 'parens-new-line',
            declaration: 'parens-new-line',
        }],
    },
    plugins: ['react', '@stylistic/jsx'],
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
