'use strict';

const rule = require('./multiple-properties-destructuring');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('multiple-properties-destructuring', rule, {
    valid: [
        `const {
            a,
            b,
        } = world;`,
    ],
    
    invalid: [{
        code: `const {a, b} = world;`,
        output: `const {\na,\n b\n} = world;`,
        errors: [{
            message: 'Keep each property on separate lines when using multiple destructuring properties',
            type: 'VariableDeclarator',
        }],
    }],
});

