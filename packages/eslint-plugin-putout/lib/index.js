'use strict';

const wrap = require('./wrap');

const getRule = (a) => ({
    [a]: require(`./${a}/${a}`),
});

const getWrapRule = (a) => ({
    [a]: wrap(require(`./${a}/${a}`)),
});

module.exports.rules = {
    ...getRule('single-property-destructuring'),
    ...getWrapRule('multiple-properties-destructuring'),
    ...getWrapRule('for-of-multiple-properties-destructuring'),
    ...getWrapRule('long-properties-destructuring'),
    ...getWrapRule('destructuring-as-function-argument'),
    ...getWrapRule('align-spaces'),
    ...getWrapRule('keyword-spacing'),
    ...getWrapRule('new-line-function-call-arguments'),
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
