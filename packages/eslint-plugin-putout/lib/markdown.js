'use strict';

const parserOpts = require('@putout/engine-parser/babel/options');
const parserPlugins = require('@putout/engine-parser/babel/plugins');
const [ts, tsx] = require('./ts');
const {jsx} = require('./jsx');

const commonRules = {
    '@stylistic/js/eol-last': [
        'error',
        'never',
    ],
    'no-undef': 'off',
    'no-empty': 'off',
    'no-unreachable': 'off',
    'no-constant-condition': 'off',
    'n/no-extraneous-require': 'off',
    'n/no-extraneous-import': 'off',
    'n/no-unpublished-require': 'off',
    'n/no-unpublished-import': 'off',
    'n/no-missing-require': 'off',
    'n/no-missing-import': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
    'n/no-unsupported-features/n-builtins': 'off',
    'n/no-process-exit': 'off',
};

const parserOptions = {
    requireConfigFile: false,
    babelOptions: {
        sourceType: 'module',
        babelrc: false,
        configFile: false,
        parserOpts: {
            ...parserOpts,
            plugins: [
                'jsx',
                ...parserPlugins,
            ],
        },
    },
};

module.exports = [{
    files: ['*.md{js}'],
    rules: commonRules,
    parser: '@babel/eslint-parser/experimental-worker',
    parserOptions,
}, {
    files: ['*.md{jsx}'],
    rules: {
        ...commonRules,
        ...jsx.rules,
    },
    plugins: jsx.plugins,
    parser: '@babel/eslint-parser/experimental-worker',
    parserOptions,
}, {
    ...tsx,
    ...jsx,
    files: '*.md{tsx}',
    rules: {
        ...commonRules,
        ...ts.rules,
        ...jsx.rules,
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
    },
    plugins: [
        ...tsx.plugins,
        ...jsx.plugins,
    ],
}, {
    ...ts,
    files: '*.md{ts}',
    rules: {
        ...commonRules,
        ...ts.rules,
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
    },
}, {
    files: '*.md{json}',
    rules: {
        '@stylistic/js/eol-last': [
            'error',
            'never',
        ],
    },
}];
