'use strict';

module.exports.rules = {
    'one-line-destructuring': require('./rules/one-line-destructuring'),
    'destructuring-as-function-argument': require('./rules/destructuring-as-function-argument'),
};

const config = require('@putout/eslint-config');
const {rules} = config;

module.exports.configs = {
    recommended: {
        ...config,
        rules: {
            ...rules,
            'putout/one-line-destructuring': 'error',
            'putout/destructuring-as-function-argument': 'error',
        }
    }
};

