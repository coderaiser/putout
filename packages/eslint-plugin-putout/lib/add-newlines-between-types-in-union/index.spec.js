import {RuleTester} from 'eslint';
import montag from 'montag';
import {createPlugin} from '@putout/eslint/create-plugin';
import babelParser from '#babel/eslint-parser/experimental-worker';
import tsParser from '#typescript-eslint/parser';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTesterBabel = new RuleTester({
    languageOptions: {
        parser: babelParser,
        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                plugins: ['@babel/plugin-syntax-typescript'],
            },
        },
    },
});

ruleTesterBabel.run('add-newlines-between-types-in-union', rule, {
    valid: [
        montag`
            type a = {
                x: string | boolean | number | object
            }
        `,
        montag`
            type a = string | boolean | number;
        `,
        montag`
            type a = string
                | boolean
                | boolean[];
        `,
        montag`
            const rules = {
                'find/push': ['off', {
                }],
            }
        `,
    ],
    
    invalid: [{
        code: montag`
            type a = string | boolean | number | object;
        `,
        output: montag`
            type a = 
                | string
                | boolean
                | number
                | object;
        `,
        errors: [{
            message: 'Add newlines between types in union',
        }],
    }],
});

const ruleTesterTypescript = new RuleTester({
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
            ecmaFeatures: {
                jsx: false,
            },
        },
    },
});

ruleTesterTypescript.run('add-newlines-between-types-in-union: typescript-eslint', rule, {
    valid: [
        montag`
            type a = {
                x: string | boolean | number | object
            }
        `,
        montag`
            type a =
                | string
                | boolean
                | object
                | number;
        `,
    ],
    invalid: [{
        code: montag`
            type a = string | boolean | number | object;
        `,
        output: montag`
            type a = 
                | string
                | boolean
                | number
                | object;
        `,
        errors: [{
            message: 'Add newlines between types in union',
        }],
    }],
});
