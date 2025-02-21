'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const rule = require('.');

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
    },
});

ruleTester.run('remove-empty-newline-between-declarations', rule, {
    valid: [
        montag`
            const {a} = b;
            const {c} = a;
        `,
        montag`
            const {m} = b;
            
            const {c} = a;
        `,
        montag`
            const m = 'hello';
            
            const {c} = a;
        `,
        montag`
            const {
                operator,
                types,
            } = require('putout');
            
            const {replaceWith} = operator;
        `,
    ],
    
    invalid: [{
        code: montag`
            const {a} = b;
            
            const {c} = a;
        `,
        output: montag`
            const {a} = b;
            const {c} = a;
        `,
        errors: [{
            message: 'Remove empty newline between declarations',
            type: 'VariableDeclaration',
        }],
    }],
});
