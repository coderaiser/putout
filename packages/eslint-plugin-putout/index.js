'use strict';

module.exports.rules = {
    'one-line-destructuring': require('./rules/one-line-destructuring'),
};

const config = require('@putout/eslint-config');
const {rules} = config;

module.exports.configs = {
    recommended: {
        ...config,
        rules: {
            ...rules,
            'putout/one-line-destructuring': 'error',
        }
    }
};

