'use strict';

module.exports = [{
    files: '*.mjs',
    rules: {
        'node/no-unsupported-features/es-syntax': 'off',
    },
    plugins: [
        'node'
    ],
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

