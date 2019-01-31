'use strict';

module.exports.rules = {
    'one-line-destructuring': require('./rules/one-line-destructuring'),
};

module.exports.configs = {
    recommended: {
        ...require('@putout/eslint-config'),
        rules: {
            'putout/one-line-destructuring': 'error',
        }
    }
};

