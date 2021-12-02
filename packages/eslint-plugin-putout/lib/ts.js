'use strict';

const {rules} = require('@putout/eslint-config');

const extensionRules = {
    'no-undef': 'off',
    'no-var': 'off',
    
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error'],
    
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': rules['comma-dangle'],
    
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': 'error',
    
    // requires type information
    '@typescript-eslint/dot-notation': 'off',
    
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'error',
    
    // broken
    '@typescript-eslint/indent': 'off',
    
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 'error',
    
    '@typescript-eslint/no-array-constructor': 'off',
    
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': 'error',
    
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    
    '@typescript-eslint/no-implied-eval': 'off',
    
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': 'error',
    
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': rules['padding-line-between-statements'],
    
    'quotes': 'off',
    '@typescript-eslint/quotes': rules.quotes,
    
    '@typescript-eslint/require-await': 'off',
    
    'semi': 'off',
    '@typescript-eslint/semi': rules.semi,
    
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': rules['space-before-function-paren'],
    
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': rules[ 'space-infix-ops'],
};

const ts = {
    files: '*.ts',
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: false,
        },
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        ...extensionRules,
        'putout/no-unresolved': 'off',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
    },
};

module.exports = [
    ts, {
        ...ts,
        files: '*.tsx',
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
];

