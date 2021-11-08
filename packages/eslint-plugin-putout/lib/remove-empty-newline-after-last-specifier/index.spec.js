'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
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
    }],
});

