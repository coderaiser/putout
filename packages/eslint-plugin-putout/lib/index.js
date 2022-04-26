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
    ...getWrapRule('array-element-newline'),
    ...getWrapRule('single-property-destructuring'),
    ...getWrapRule('multiple-properties-destructuring'),
    ...getWrapRule('for-of-multiple-properties-destructuring'),
    ...getWrapRule('long-properties-destructuring'),
    ...getWrapRule('destructuring-as-function-argument'),
    ...getWrapRule('align-spaces'),
    ...getWrapRule('keyword-spacing'),
    ...getWrapRule('newline-function-call-arguments'),
    ...getWrapRule('function-declaration-paren-newline'),
    ...getWrapRule('add-newlines-between-types-in-union'),
    ...getWrapRule('add-newlines-between-specifiers'),
    ...getWrapRule('add-newline-before-function-call'),
    ...getWrapRule('add-newline-after-function-call'),
    ...getWrapRule('remove-newline-after-default-import'),
    ...getWrapRule('remove-newline-from-empty-object'),
    ...getWrapRule('remove-empty-newline-before-first-specifier'),
    ...getWrapRule('remove-empty-newline-after-last-specifier'),
    ...getWrapRule('remove-empty-newline-after-last-element'),
    ...getWrapRule('remove-empty-specifiers'),
    ...getWrapRule('objects-braces-inside-array'),
    ...getWrapRule('object-init'),
    ...getWrapRule('no-unresolved'),
    ...getWrapRule('remove-duplicate-extensions'),
    ...getWrapRule('evaluate'),
    ...getWrapRule('tape-add-newline-before-assertion'),
    ...getWrapRule('tape-add-newline-between-tests'),
    ...getWrapRule('tape-remove-newline-before-t-end'),
    ...getWrapRule('nonblock-statement-body-newline'),
    ...getRule('putout'),
    ...getRule('remove-empty-newline-after-import'),
};

const config = require('@putout/eslint-config');
const {rules} = config;

const recommended = {
    ...config,
    rules: {
        ...rules,
        'no-debugger': 'off',
        'no-unused-vars': 'off',
        
        'putout/array-element-newline': 'error',
        'putout/single-property-destructuring': 'error',
        'putout/multiple-properties-destructuring': 'error',
        'putout/for-of-multiple-properties-destructuring': 'error',
        'putout/long-properties-destructuring': 'error',
        'putout/destructuring-as-function-argument': 'error',
        'putout/align-spaces': 'error',
        'putout/keyword-spacing': 'error',
        'putout/newline-function-call-arguments': 'error',
        'putout/function-declaration-paren-newline': 'error',
        'putout/add-newlines-between-types-in-union': 'error',
        'putout/add-newlines-between-specifiers': 'error',
        'putout/add-newline-before-function-call': 'error',
        'putout/add-newline-after-function-call': 'error',
        'putout/remove-newline-after-default-import': 'error',
        'putout/remove-newline-from-empty-object': 'error',
        'putout/remove-empty-newline-before-first-specifier': 'error',
        'putout/remove-empty-newline-after-last-specifier': 'error',
        'putout/remove-empty-newline-after-last-element': 'error',
        'putout/remove-empty-newline-after-import': 'error',
        'putout/remove-empty-specifiers': 'error',
        'putout/objects-braces-inside-array': 'error',
        'putout/object-init': 'error',
        'putout/no-unresolved': 'error',
        'putout/remove-duplicate-extensions': 'error',
        'putout/evaluate': 'error',
        'putout/tape-add-newline-before-assertion': 'error',
        'putout/tape-add-newline-between-tests': 'error',
        'putout/tape-remove-newline-before-t-end': 'error',
        'putout/nonblock-statement-body-newline': 'error',
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
        'no-useless-return': 'off',
        'putout/align-spaces': 'off',
        'putout/remove-newline-from-empty-object': 'off',
        'putout/putout': ['error', {
            rules: {
                'remove-empty': 'off',
                'nodejs/remove-process-exit': 'off',
                'typescript/remove-unused-types': 'off',
                'remove-unused-variables': 'off',
                'remove-unused-expressions': 'off',
                'remove-unused-for-of-variables': 'off',
                'remove-unreachable-code': 'off',
                'remove-useless-for-of': 'off',
                'remove-useless-arguments': 'off',
                'remove-useless-variables/rename': 'off',
                'remove-useless-return': 'off',
                'remove-useless-spread': 'off',
                'remove-unreferenced-variables': 'off',
                'tape/remove-skip': 'off',
                'tape/remove-only': 'off',
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
    'safe+align': {
        ...safe,
        rules: {
            ...safe.rules,
            'putout/align-spaces': 'error',
        },
    },
};

