'use strict';

const {safeAlign} = require('eslint-plugin-putout/config');

module.exports = [
    ...safeAlign, {
        rules: {
            'no-useless-return': 'off',
        },
    },
];
