'use strict';

const {createESLintConfig} = require('@putout/eslint-flat');
const {recommended} = require('eslint-plugin-putout/config');

module.exports = createESLintConfig([
    recommended, {
        ignores: ['**/fixture'],
    },
]);
