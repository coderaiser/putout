'use strict';

module.exports = [{
    files: '*.{ts,tsx,d.ts}',
    rules: {
        'node/no-unsupported-features/es-syntax': 'off',
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'node',
    ],
}];

