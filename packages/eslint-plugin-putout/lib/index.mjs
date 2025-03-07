import config from '@putout/eslint-config';
import nPlugin from 'eslint-plugin-n';
import markdown from './markdown.mjs';
import json from './json.mjs';
import html from './html.mjs';
import ts from './ts.mjs';
import jsxConfig, {jsx} from './jsx.mjs';
import * as putout from './plugin.mjs';

const n = nPlugin.configs['flat/mixed-esm-and-cjs'];

const putoutConfig = [{
    name: 'putout: js',
    plugins: {
        putout,
    },
    rules: {
        ...config.rules,
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
}];

export const recommended = [
    ...n,
    ...config,
    ...putoutConfig,
    ...markdown,
    ...html,
    ...ts,
    ...jsxConfig,
    ...json,
];

export const safeRules = {
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
    'remove-useless-push': 'off',
};

export const safe = [
    ...n,
    ...recommended, {
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
    }];

export const safeAlign = [
    ...n,
    ...safe, {
        rules: {
            ...safe.rules,
            'putout/align-spaces': 'error',
        },
    }];

export const esm = {
    ...n,
    ...safeAlign,
    rules: {
        ...safeAlign.rules,
        'putout/putout': ['error', {
            esm: true,
            rules: safeRules,
        }],
    },
};

export const configs = {
    recommended,
    jsx,
    safe,
    safeAlign,
    esm,
};

const {rules} = putout;

export {
    rules,
};
