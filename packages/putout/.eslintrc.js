'use strict';

module.exports = {
    parserOptions: {
        sourceType: 'module',
    },
    extends: [
        'plugin:node/recommended',
        'plugin:putout/recommended',
    ],
    rules: {
        'node/no-unsupported-features/node-builtins': 'off',
        'node/no-unsupported-features/es-builtins': 'off',
    },
    plugins: [
        'node',
        'putout',
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
    }],
};

