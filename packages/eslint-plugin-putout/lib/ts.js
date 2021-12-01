'use strict';

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
        'no-undef': 'off',
        'no-var': 'off',
        'putout/no-unresolved': 'off',
        'semi': 'off',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/array-type': 'error',
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
        }],
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

