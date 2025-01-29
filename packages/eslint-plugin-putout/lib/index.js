'use strict';

const {createPlugin} = require('@putout/eslint/create-plugin');

const config = require('@putout/eslint-config');
const markdown = require('./markdown');
const json = require('./json');
const yaml = require('./yaml');
const html = require('./html');
const ts = require('./ts');
const jsx = require('./jsx');

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

const getWrapRule = (a) => ({
    [a]: createPlugin(require(`./${a}`)),
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
    ...getWrapRule('add-newline-before-return'),
    ...getWrapRule('add-newline-before-function-call'),
    ...getWrapRule('add-newline-after-function-call'),
    ...getWrapRule('remove-newline-after-default-import'),
    ...getWrapRule('remove-newline-from-empty-object'),
    ...getWrapRule('remove-empty-newline-before-first-specifier'),
    ...getWrapRule('remove-empty-newline-after-last-specifier'),
    ...getWrapRule('remove-empty-newline-after-last-element'),
    ...getWrapRule('remove-empty-specifiers'),
    ...getWrapRule('objects-braces-inside-array'),
    ...getWrapRule('object-property-newline'),
    ...getWrapRule('no-unresolved'),
    ...getWrapRule('remove-duplicate-extensions'),
    ...getWrapRule('evaluate'),
    ...getWrapRule('tape-add-newline-before-assertion'),
    ...getWrapRule('tape-add-newline-between-tests'),
    ...getWrapRule('tape-remove-newline-before-t-end'),
    ...getWrapRule('nonblock-statement-body-newline'),
    ...getRule('putout'),
    ...getRule('remove-empty-newline-after-import'),
    ...getRule('remove-empty-newline-between-declarations'),
};

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
        'putout/add-newline-before-return': 'error',
        'putout/add-newline-before-function-call': 'error',
        'putout/add-newline-after-function-call': 'error',
        'putout/remove-newline-after-default-import': 'error',
        'putout/remove-newline-from-empty-object': 'error',
        'putout/remove-empty-newline-before-first-specifier': 'error',
        'putout/remove-empty-newline-after-last-specifier': 'error',
        'putout/remove-empty-newline-after-last-element': 'error',
        'putout/remove-empty-newline-after-import': 'error',
        'putout/remove-empty-newline-between-declarations': 'error',
        'putout/remove-empty-specifiers': 'error',
        'putout/objects-braces-inside-array': 'error',
        'putout/object-property-newline': 'error',
        'putout/no-unresolved': 'error',
        'putout/remove-duplicate-extensions': 'error',
        'putout/evaluate': 'error',
        'putout/tape-add-newline-before-assertion': 'error',
        'putout/tape-add-newline-between-tests': 'error',
        'putout/tape-remove-newline-before-t-end': 'error',
        'putout/nonblock-statement-body-newline': 'error',
        'putout/putout': 'error',
        'n/no-unsupported-features/es-syntax': 'off',
        'n/no-missing-import': 'off',
        'n/no-missing-require': 'off',
        'n/no-process-exit': 'off',
    },
    overrides: [
        ...markdown,
        ...json,
        ...yaml,
        ...html,
        ...ts,
        ...jsx,
    ],
};

const safeRules = {
    'apply-template-literals': 'off',
    'remove-empty': 'off',
    'merge-duplicate-functions': 'off',
    'nodejs/remove-process-exit': 'off',
    'typescript/remove-unused-types': 'off',
    'remove-unused-variables': 'off',
    'remove-unused-expressions': 'off',
    'remove-unreachable-code': 'off',
    'remove-useless-arguments': 'off',
    'remove-useless-variables': 'off',
    'return/remove-useless': 'off',
    'remove-useless-spread': 'off',
    'remove-unreferenced-variables': 'off',
    'tape/remove-skip': 'off',
    'tape/remove-only': 'off',
    'remove-console': 'off',
    'remove-debugger': 'off',
    'for-of/for': 'off',
    'for-of/remove-unused-variables': 'off',
    'for-of/remove-useless': 'off',
    'maybe/noop': 'off',
};

module.exports.safeRules = safeRules;

const safe = {
    ...recommended,
    rules: {
        ...recommended.rules,
        'no-implicit-coercion': 'off',
        'no-useless-return': 'off',
        'putout/align-spaces': 'off',
        'putout/remove-newline-from-empty-object': 'off',
        'putout/putout': ['error', {
            esm: false,
            rules: safeRules,
        }],
    },
};

const safeAlign = {
    ...safe,
    rules: {
        ...safe.rules,
        'putout/align-spaces': 'error',
    },
};

const esm = {
    ...safeAlign,
    rules: {
        ...safeAlign.rules,
        'putout/putout': ['error', {
            esm: true,
            rules: safeRules,
        }],
    },
};

module.exports.configs = {
    recommended,
    'jsx': jsx.jsx,
    safe,
    'safe+align': safeAlign,
    esm,
};
