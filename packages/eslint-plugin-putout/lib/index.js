'use strict';

const wrap = require('./wrap');
const markdown = require('./markdown');
const json = require('./json');
const yaml = require('./yaml');
const html = require('./html');
const ts = require('./ts');

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

const getWrapRule = (a) => ({
    [a]: wrap(require(`./${a}`)),
});

module.exports.rules = {
    ...getWrapRule('single-property-destructuring'),
    ...getWrapRule('multiple-properties-destructuring'),
    ...getWrapRule('for-of-multiple-properties-destructuring'),
    ...getWrapRule('long-properties-destructuring'),
    ...getWrapRule('destructuring-as-function-argument'),
    ...getWrapRule('align-spaces'),
    ...getWrapRule('keyword-spacing'),
    ...getWrapRule('newline-function-call-arguments'),
    ...getWrapRule('function-declaration-paren-newline'),
    ...getWrapRule('remove-newline-after-default-import'),
    ...getWrapRule('objects-braces-inside-array'),
    ...getWrapRule('object-init'),
    ...getRule('putout'),
};

const config = require('@putout/eslint-config');
const {rules} = config;

const recommended = {
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
        'putout/newline-function-call-arguments': 'error',
        'putout/function-declaration-paren-newline': 'error',
        'putout/remove-newline-after-default-import': 'error',
        'putout/objects-braces-inside-array': 'error',
        'putout/object-init': 'error',
        'putout/putout': 'error',
        
        'node/no-unsupported-features/es-syntax': 'off',
    },
    overrides: [
        ...markdown,
        ...json,
        ...yaml,
        ...html,
        ...ts,
    ],
    plugins: [
        'node',
    ],
};

const safe = {
    ...recommended,
    rules: {
        ...recommended.rules,
        'putout/align-spaces': 'off',
        'putout/putout': ['error', {
            rules: {
                'remove-empty': 'off',
                'remove-unused-variables': 'off',
                'remove-unused-expressions': 'off',
                'remove-unused-for-of-variables': 'off',
                'remove-skip': 'off',
                'remove-only': 'off',
                'remove-console': 'off',
                'remove-debugger': 'off',
                'convert-for-to-for-of': 'off',
            },
        }],
    },
};

module.exports.configs = {
    recommended,
    safe,
};

