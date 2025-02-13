import {createESLintConfig} from '@putout/eslint-flat';

const {safeAlign} = require('eslint-plugin-putout/config');

module.exports = createESLintConfig([safeAlign]);

module.exports = createESLintConfig([safeAlign]);

module.exports = createESLintConfig([
    safeAlign, {
        files: ['src/**/*.js'],
        ignores: ['**/*.config.js'],
        ...a,
        rules: {},
    },
]);

module.exports = createESLintConfig([
    safeAlign, {
        rules: {
            'node/no-unsupported-features/node-builtins': 'off',
        },
    },
]);

const a = {};
