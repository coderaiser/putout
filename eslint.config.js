'use strict';

const {safeAlign} = require('eslint-plugin-putout/config');
const importPlugin = require('eslint-plugin-import');
const {matchToFlatDir} = require('./packages/eslint-flat');

module.exports = [
    ...safeAlign, {
        files: ['*.js'],
        rules: {
            'import/no-extraneous-dependencies': 'error',
            '@stylistic/js/semi': 'off',
        },
        plugins: {
            import: importPlugin,
        },
    },
    ...matchToFlatDir('./packages/putout'),
];
