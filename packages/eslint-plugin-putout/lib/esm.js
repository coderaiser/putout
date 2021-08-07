'use strict';

module.exports = [{
    files: '*.mjs',
    rules: {
        'node/no-unsupported-features/es-syntax': 'off',
    },
    plugins: [
        'node',
    ],
    parser: '@babel/eslint-parser/experimental-worker',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            sourceType: 'module',
        },
    },
}];

