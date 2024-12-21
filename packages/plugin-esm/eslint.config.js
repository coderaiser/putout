'use strict';

const {matchToFlat} = require('@putout/eslint-flat');
const {safeAlign} = require('eslint-plugin-putout/config');

const match = {
    '*.md{js}': {
        'n/no-deprecated-api': 'off',
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

module.exports = [
    ...safeAlign, {
        rules: {
            'no-useless-return': 'off',
        },
    },
    ...matchToFlat(match),
];

module.exports.match = match;
