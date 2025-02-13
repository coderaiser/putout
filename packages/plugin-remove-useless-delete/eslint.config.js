'use strict';

const {createESLintConfig} = require('@putout/eslint-flat');
const {safeAlign} = require('eslint-plugin-putout/config');

module.exports = createESLintConfig([
    safeAlign, {
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
]);
