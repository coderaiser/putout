'use strict';

const {safeAlign} = require('eslint-plugin-putout/config');

module.exports = [
    ...safeAlign, {
        files: ['bin/putout.mjs'],
        rules: {
            'n/hashbang': 'off',
        },
    }, {
        files: ['**/register.mjs'],
        rules: {
            'n/no-unsupported-features/node-builtins': 'off',
        },
    },
];
