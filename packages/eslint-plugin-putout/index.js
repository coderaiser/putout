'use strict';

const getRule = (a) => ({
    [a]: require(`./rules/${a}`)
});

module.exports.rules = {
    ...getRule('single-property-destructuring'),
    ...getRule('multiple-properties-destructuring'),
    ...getRule('long-properties-destructuring'),
    ...getRule('destructuring-as-function-argument'),
    ...getRule('align-spaces'),
    ...getRule('new-line-function-call-arguments'),
};

const config = require('@putout/eslint-config');
const {rules} = config;

module.exports.configs = {
    recommended: {
        ...config,
        rules: {
            ...rules,
            'putout/single-property-destructuring': 'error',
            'putout/multiple-properties-destructuring': 'error',
            'putout/long-properties-destructuring': 'error',
            'putout/destructuring-as-function-argument': 'error',
            'putout/align-spaces': 'error',
            'putout/new-line-function-call-arguments': 'error',
        }
    }
};

