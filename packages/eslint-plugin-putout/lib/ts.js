'use strict';

const {rules} = require('@putout/eslint-config');
const {jsx} = require('./jsx');

const reEnable = (rule) => ({
    [`@stylistic/ts/${rule}`]: 'error',
});

const warnOnUnsupportedTypeScriptVersion = false;

const extensionRules = {
    'no-undef': 'off',
    'no-var': 'off',
    
    '@stylistic/ts/comma-spacing': 'error',
    
    '@stylistic/ts/indent': 'off', // broken
    '@stylistic/brace-style': 'off', // putout/object-property-newline instead
    '@stylistic/ts/lines-between-class-members': 'off',
    
    '@stylistic/js/padding-line-between-statements': 'off',
    '@stylistic/ts/padding-line-between-statements': convertPaddingLines(rules['@stylistic/js/padding-line-between-statements']),
    
    '@stylistic/js/object-curly-spacing': 'off',
    '@stylistic/ts/object-curly-spacing': rules['@stylistic/js/object-curly-spacing'],
    
    '@stylistic/js/semi': 'off',
    '@stylistic/ts/semi': rules['@stylistic/js/semi'],
    
    '@stylistic/js/space-before-function-paren': 'off',
    '@stylistic/ts/space-before-function-paren': rules['@stylistic/js/space-before-function-paren'],
    
    ...reEnable('object-curly-spacing'),
    ...reEnable('func-call-spacing'),
    '@typescript-eslint/no-array-constructor': 'off',
    '@typescript-eslint/dot-notation': 'off', // requires type information
    '@typescript-eslint/no-extra-parens': 'error',
    '@typescript-eslint/no-implied-eval': 'off',
    
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    
    '@typescript-eslint/require-await': 'off', // needs project information
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'off',
};

const ts = {
    files: '*.ts',
    parser: '@typescript-eslint/parser',
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion,
        ecmaFeatures: {
            jsx: false,
        },
    },
    plugins: ['@typescript-eslint', '@stylistic/ts'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        ...extensionRules,
        'putout/no-unresolved': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
    },
};

module.exports = [
    ts, {
        ...ts,
        ...jsx,
        rules: {
            ...ts.rules,
            ...jsx.rules,
        },
        plugins: [
            ...ts.plugins,
            ...jsx.plugins,
        ],
        files: '*.tsx',
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion,
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
];

function convertPaddingLines([state, ...lines]) {
    const newLines = [];
    
    for (const line of lines) {
        let {prev, next} = line;
        
        if (prev.includes('cjs-'))
            prev = prev.replace('cjs-', '');
        
        if (next.includes('cjs-'))
            next = next.replace('cjs-', '');
        
        newLines.push({
            ...line,
            prev,
            next,
        });
    }
    
    return [
        state,
        ...newLines,
    ];
}
