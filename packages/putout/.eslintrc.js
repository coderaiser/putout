'use strict';

module.exports = {
    parserOptions: {
        sourceType: 'module',
    },
    extends: [
        'plugin:putout/recommended',
        'plugin:node/recommended',
    ],
    rules: {
        'node/no-unsupported-features/node-builtins': 'off',
        'node/no-unsupported-features/es-builtins': 'off',
    },
    plugins: [
        'node',
        'putout',
        'markdown',
    ],
    overrides: [{
        files: ['bin/**/*.js'],
        rules: {
            'no-process-exit': 0,
            'no-console': 0,
        },
    }, {
        files: ['lib/**/*.spec.js', '.webpack/**/*.js'],
        rules: {
            'node/no-unpublished-require': 'off',
        },
    }, {
        files: ['*.md'],
        rules: {
            'node/no-extraneous-require': 'off',
            'putout/putout': ['error', {
                rules: {
                    'remove-unused-expressions': 'off',
                    'strict-mode': 'off',
                },
            }],
        },
    }],
};

