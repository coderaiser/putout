'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
    },
});

ruleTester.run('remove-empty-newline-after-last-element', rule, {
    valid: [
        montag`
            const a = [
                1,
                2,
            ];
        `,
    ],
    
    invalid: [{
        code: montag`
            push([
                a,
                b,
            
            ]);
        `,
        output: montag`
            push([
                a,
                b,
            ]);
        `,
        errors: [{
            message: 'Remove newline after last element',
            type: 'ArrayExpression',
        }],
    }],
});
