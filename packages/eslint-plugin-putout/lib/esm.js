'use strict';

module.exports = [{
    files: '*.mjs',
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            sourceType: 'module',
            plugins: [
                '@babel/plugin-syntax-top-level-await',
            ],
        },
    },
}];

