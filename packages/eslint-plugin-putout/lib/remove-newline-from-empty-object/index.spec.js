'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
});

ruleTester.run('remove-empty-newline-from-empty-object', rule, {
    valid: [
        montag`
            const a = {};
        `,
        montag`
            const a = {
                // hello
            };
        `,
        montag`
            const a = {
                hello,
                world,
            };
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
            const a = {
            };
        `,
        output: montag`
            const a = {};
        `,
        errors: [{
            message: 'Remove newline from empty object',
            type: 'ObjectExpression',
        }],
    }],
});

