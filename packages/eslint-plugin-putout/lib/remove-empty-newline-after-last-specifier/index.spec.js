'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

ruleTester.run('remove-empty-newline-after-last-specifier', rule, {
    valid: [
        montag`
            import {
                y
            } from 'z'
        `, montag`
            import {y} from 'z';
        `,
        montag`
            const ruleTester = new RuleTester({
                parserOptions: {
                }
            });
            
            push({
                a,
                b,
            });
        `,
    ],
    
    invalid: [{
        code: montag`
            import {
                y,
            
            } from 'z'
        `,
        output: montag`
            import {
                y,
            } from 'z'
        `,
        errors: [{
            message: 'Remove newline after last specifier',
            type: 'ImportDeclaration',
        }],
    }, {
        code: montag`
            push({
                a,
                b,
            
            });
        `,
        output: montag`
            push({
                a,
                b,
            });
        `,
        errors: [{
            message: 'Remove newline after last specifier',
            type: 'ObjectExpression',
        }],
    }],
});

