'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTesterBabel = new RuleTester({
    languageOptions: {
        parser: require('@babel/eslint-parser/experimental-worker'),
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
            type: 'TSUnionType',
        }],
    }],
});

const ruleTesterTypescript = new RuleTester({
    languageOptions: {
        parser: require('@typescript-eslint/parser'),
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
            type: 'TSUnionType',
        }],
    }],
});
