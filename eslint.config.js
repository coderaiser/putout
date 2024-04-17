'use strict';

const {safeAlign} = require('eslint-plugin-putout/config');

const importPlugin = require('eslint-plugin-import');

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
];
