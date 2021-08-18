'use strict';

module.exports = [{
    //files: '*{.ts,.dts}',
    files: '*.ts',
    parser: '@babel/eslint-parser/experimental-worker',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: ['@babel/plugin-syntax-typescript'],
        },
    },
    rules: {
        'no-undef': 'off',
    },
}];

