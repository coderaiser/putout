'use strict';

const putout = require('putout');

module.exports = {
    rules: {
        'putout/putout': ['error', putout.getOptions()],
    },
    extends: [
        'plugin:putout/recommended',
        'plugin:node/recommended',
    ],
    plugins: [
        'node',
        'putout',
    ],
};
