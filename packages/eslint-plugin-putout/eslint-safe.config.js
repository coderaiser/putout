'use strict';

const {createESLintConfig} = require('@putout/eslint-flat');
const {safeAlign} = require('./lib/index.mjs');

module.exports = createESLintConfig([
    safeAlign, {
        rules: {
            'no-unreachable': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
]);

