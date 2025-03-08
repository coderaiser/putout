'use strict';

const {defineConfig} = require('eslint/config');
const {safeAlign} = require('./lib/index.mjs');

module.exports = defineConfig([
    safeAlign, {
        rules: {
            'no-unreachable': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
]);
