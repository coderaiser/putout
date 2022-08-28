'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
});

ruleTester.run('remove-newline-after-default-import', rule, {
    valid: [
        montag`
            import x, {
                y
            } from 'z'
        `,
    ],
    
    invalid: [{
        code: montag`
            import x,
            {
                y
            } from 'z'
        `,
        output: montag`
            import x, {
                y
            } from 'z'
        `,
        errors: [{
            message: 'Keep opening curly brace on one line with default import',
            type: 'ImportDeclaration',
        }],
    }],
});

