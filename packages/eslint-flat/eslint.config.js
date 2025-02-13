'use strict';

const {createESLintConfig} = require('@putout/eslint-flat');
const {safeAlign} = require('eslint-plugin-putout/config');

module.exports = createESLintConfig([
    safeAlign, {
        ignores: ['**/fixture'],
    },
]);
