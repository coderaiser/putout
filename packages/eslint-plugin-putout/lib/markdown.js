import * as parserOpts from '@putout/engine-parser/babel/options';
import parserPlugins from '@putout/engine-parser/babel/plugins';
import babel from '@babel/eslint-parser';
import tsConfig from './ts.js';
import {jsx} from './jsx.js';

const [ts, tsx] = tsConfig;

const commonRules = {
    '@stylistic/eol-last': [
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

const mdTsCommonRules = {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
};

export default [{
    name: 'putout: md: js',
    files: ['**/*.md{js}'],
    rules: commonRules,
    languageOptions: {
        parser: babel,
        parserOptions,
    },
}, {
    name: 'putout: md: jsx',
    files: ['**/*.md{jsx}'],
    rules: {
        ...commonRules,
        ...jsx.rules,
    },
    plugins: jsx.plugins,
    languageOptions: {
        parser: babel,
        parserOptions,
    },
}, {
    ...tsx,
    ...jsx,
    name: 'putout: md: tsx',
    files: ['**/*.md{tsx}'],
    rules: {
        ...commonRules,
        ...ts.rules,
        ...jsx.rules,
        ...mdTsCommonRules,
    },
    plugins: {
        ...tsx.plugins,
        ...jsx.plugins,
    },
}, {
    ...ts,
    name: 'putout: md: ts',
    files: ['**/*.md{ts}'],
    rules: {
        ...commonRules,
        ...ts.rules,
        ...mdTsCommonRules,
    },
}, {
    name: 'putout: md: json',
    files: ['**/*.md{json}'],
    rules: {
        '@stylistic/eol-last': [
            'error',
            'never',
        ],
    },
}];
