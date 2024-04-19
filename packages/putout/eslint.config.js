'use strict';

const {matchToFlat} = require('../eslint-flat');
const {safeAlign} = require('eslint-plugin-putout/config');

const match = {
    'bin/putout.mjs': {
        'n/hashbang': 'off',
    },
    '**/register.mjs': {
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

module.exports = [
    ...safeAlign,
    ...matchToFlat(match),
];

module.exports.match = match;
