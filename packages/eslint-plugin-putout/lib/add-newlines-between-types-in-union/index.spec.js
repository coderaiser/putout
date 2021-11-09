'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser/experimental-worker'),
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: ['@babel/plugin-syntax-typescript'],
        },
    },
});

ruleTester.run('add-newlines-between-types-in-union', rule, {
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
            type a = string
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

