'use strict';

const {safeAlign} = require('eslint-plugin-putout/config');

module.exports = [
    ...safeAlign, {
        files: ['*.md{js}'],
        languageOptions: {
            ecmaVersion: 3,
            sourceType: 'script',
            parserOptions: {
                babelOptions: {
                    sourceType: 'script',
                },
            },
        },
    },
];
