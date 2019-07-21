'use strict';

const putout = require('.');

module.exports = {
    extends: [
        'plugin:putout/recommended',
        'plugin:node/recommended',
    ],
    plugins: [
        'node',
        'putout',
    ],
    rules: {
        'putout/putout': ['error', putout.getOptions()],
    },
    overrides: [{
        files: ['bin/**/*.js'],
        rules: {
            'no-process-exit': 0,
            'no-console': 0,
        },
    }],
};

