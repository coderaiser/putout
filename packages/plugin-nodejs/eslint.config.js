'use strict';

const {
    matchToFlat,
    createESLintConfig,
} = require('@putout/eslint-flat');

const {safeAlign} = require('eslint-plugin-putout/config');

const match = {
    '*.md{js}': {
        'n/no-deprecated-api': 'off',
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

module.exports = createESLintConfig([
    matchToFlat(match),
    safeAlign, {
        rules: {
            'no-useless-return': 'off',
        },
    }]);

module.exports.match = match;
