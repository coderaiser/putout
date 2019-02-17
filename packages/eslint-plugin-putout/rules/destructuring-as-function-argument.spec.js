'use strict';

const rule = require('./destructuring-as-function-argument');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('one-line-destructuring', rule, {
    valid: [
        `function set({user, password}) {}`,
    ],
    
    invalid: [{
        code: `
            function hello({
                user,
                password,
            }) {};
            `,
        errors: [{
            message: 'Keep curly braces on one line when you use destructuring as function argument',
            type: 'ObjectPattern',
        }],
    }, {
        code: `
            const hello = ({
                user,
                password,
            }) => {};
            `,
        errors: [{
            message: 'Keep curly braces on one line when you use destructuring as function argument',
            type: 'ObjectPattern',
        }],
    }, {
        code: `
            const hello = function({
                user,
            }) {};
            `,
        errors: [{
            message: 'Keep curly braces on one line when you use destructuring as function argument',
            type: 'ObjectPattern',
        }],
    }],
});

