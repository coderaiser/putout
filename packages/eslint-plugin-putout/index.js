'use strict';

const getRule = (a) => ({
    [a]: require(`./rules/${a}/${a}`),
});

module.exports.rules = {
    ...getRule('single-property-destructuring'),
    ...getRule('multiple-properties-destructuring'),
    ...getRule('for-of-multiple-properties-destructuring'),
    ...getRule('long-properties-destructuring'),
    ...getRule('destructuring-as-function-argument'),
    ...getRule('align-spaces'),
    ...getRule('keyword-spacing'),
    ...getRule('new-line-function-call-arguments'),
    ...getRule('putout'),
};

const config = require('@putout/eslint-config');
const {rules} = config;

module.exports.configs = {
    recommended: {
        ...config,
        rules: {
            ...rules,
            'no-debugger': 'off',
            'no-unused-vars': 'off',
            'putout/single-property-destructuring': 'error',
            'putout/multiple-properties-destructuring': 'error',
            'putout/for-of-multiple-properties-destructuring': 'error',
            'putout/long-properties-destructuring': 'error',
            'putout/destructuring-as-function-argument': 'error',
            'putout/align-spaces': 'error',
            'putout/keyword-spacing': 'error',
            'putout/new-line-function-call-arguments': 'error',
            'putout/putout': 'error',
        },
    },
};
