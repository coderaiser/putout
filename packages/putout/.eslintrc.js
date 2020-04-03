'use strict';

module.exports = {
    parserOptions: {
        sourceType: 'module',
    },
    extends: [
        'plugin:putout/recommended',
        'plugin:node/recommended',
    ],
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

