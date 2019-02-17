'use strict';

const getRule = (a) => ({
    [a]: require(`./rules/${a}`)
});

module.exports.rules = {
    ...getRule('one-line-destructuring'),
    ...getRule('destructuring-as-function-argument'),
    ...getRule('align-spaces'),
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
            'putout/align-spaces': 'error',
        }
    }
};

