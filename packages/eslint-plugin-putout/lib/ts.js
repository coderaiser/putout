'use strict';

const extensionRules = {
    'no-undef': 'off',
    'no-var': 'off',
    
    'semi': 'off',
    '@typescript-eslint/semi': 'error',
    
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error'],
    
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
    }],
    
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': 'error',
    
    // requires type information
    '@typescript-eslint/dot-notation': 'off',
    
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'error',
    
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 4],
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

