'use strict';

const parserOpts = require('@putout/engine-parser/babel/options');
const parserPlugins = require('@putout/engine-parser/babel/plugins');
const [ts, tsx] = require('./ts');

const commonRules = {
    'no-undef': 'off',
    'no-empty': 'off',
    'eol-last': 'off',
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
        parserOpts: {
            ...parserOpts,
            plugins: [
                'jsx',
                ...parserPlugins,
            ],
        },
        plugins: [
            '@babel/plugin-syntax-class-properties',
        ],
    },
};

module.exports = [{
    files: ['*.md{js}', '*.md{jsx}'],
    rules: commonRules,
    parser: '@babel/eslint-parser/experimental-worker',
    parserOptions,
}, {
    ...tsx,
    files: '*.md{tsx}',
    rules: {
        ...commonRules,
        ...ts.rules,
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
    },
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
}];

