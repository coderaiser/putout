'use strict';

const parserOpts = require('@putout/engine-parser/babel/options');

module.exports = [{
    files: '*.ts',
    parser: '@babel/eslint-parser/experimental-worker',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            parserOpts,
            plugins: ['@babel/plugin-syntax-typescript'],
        },
    },
    rules: {
        'no-undef': 'off',
        'no-var': 'off',
        'putout/no-unresolved': 'off',
    },
}];

