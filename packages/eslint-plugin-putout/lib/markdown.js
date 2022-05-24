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
    'node/no-extraneous-require': 'off',
    'node/no-extraneous-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-missing-require': 'off',
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unsupported-features/node-builtins': 'off',
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
        '@typescript-eslint/array-type': 'off',
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
        '@typescript-eslint/array-type': 'off',
    },
}];

