'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

ruleTester.run('remove-newline-after-default-import', rule, {
    valid: [
        montag`
            test('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                t.end();
            });
        `,
    ],
    
    invalid: [{
        code: montag`
            test('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                
                t.end();
            });
        `,
        output: montag`
            test('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                t.end();
            });
        `,
        errors: [{
            message: 'Remove newline before t.end()',
            type: 'CallExpression',
        }],
    }],
});

