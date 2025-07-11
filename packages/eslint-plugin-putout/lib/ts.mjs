import {rules} from '@putout/eslint-config';
import parser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import {jsx} from './jsx.mjs';
import * as plugin from './plugin.mjs';

const {assign} = Object;

const reEnable = (rule) => ({
    [`@stylistic/${rule}`]: 'error',
});

const warnOnUnsupportedTypeScriptVersion = false;

const noFix = {
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
};

const handled = {
    '@typescript-eslint/no-extra-non-null-assertion': 'off',
    '@stylistic/brace-style': 'off', // putout/object-property-newline instead
};

const slow = {
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/require-await': 'off',
};

const extensionRules = {
    ...noFix,
    ...handled,
    ...slow,
    'no-undef': 'off',
    'no-var': 'off',
    
    '@stylistic/comma-spacing': 'error',
    
    '@stylistic/lines-between-class-members': 'off',
    
    '@stylistic/operator-linebreak': getOperatorLinebreak(rules['@stylistic/operator-linebreak']),
    '@stylistic/padding-line-between-statements': convertPaddingLines(rules['@stylistic/padding-line-between-statements']),
    
    '@stylistic/object-curly-spacing': rules['@stylistic/object-curly-spacing'],
    
    '@stylistic/semi': rules['@stylistic/semi'],
    
    '@stylistic/no-extra-parens': rules['@stylistic/no-extra-parens'],
    
    '@stylistic/space-before-function-paren': rules['@stylistic/space-before-function-paren'],
    
    ...reEnable('object-curly-spacing'),
    ...reEnable('function-call-spacing'),
    '@typescript-eslint/no-array-constructor': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',
};

const getTSESLintConfigs = (configs) => {
    const result = {};
    
    for (const config of configs) {
        assign(result, config);
    }
    
    return result;
};

const ts = {
    name: 'putout: ts',
    files: ['**/*.ts'],
    languageOptions: {
        parser,
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion,
            ecmaFeatures: {
                jsx: false,
            },
        },
    },
    plugins: {
        '@typescript-eslint': tsPlugin,
        '@stylistic': stylistic,
        'putout': plugin,
    },
    rules: {
        ...getTSESLintConfigs(tseslint.configs.recommended).rules,
        ...extensionRules,
        'putout/no-unresolved': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@stylistic/type-annotation-spacing': 'error',
    },
};

export default [
    ts, {
        ...ts,
        ...jsx,
        name: 'putout: tsx',
        files: ['**/*.tsx'],
        rules: {
            ...jsx.rules,
            ...ts.rules,
        },
        plugins: {
            ...jsx.plugins,
            ...ts.plugins,
        },
        languageOptions: {
            parser,
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion,
                ecmaFeatures: {
                    jsx: true,
                },
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

function getOperatorLinebreak(options) {
    const [error, after, {overrides}] = options;
    const newOverrides = assign({}, overrides);
    
    delete newOverrides['='];
    
    return [
        error,
        after, {
            overrides: newOverrides,
        },
    ];
}
