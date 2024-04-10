'use strict';

const {safeAlign} = require('eslint-plugin-putout/config');
const config = [{
    files: ['bin/putout.mjs'],
    rules: {
        'n/hashbang': 'off',
    },
}, {
    files: ['**/register.mjs'],
    rules: {
        'n/no-unsupported-features/node-builtins': 'off',
    },
}];

module.exports = [
    ...safeAlign,
    ...config,
];

