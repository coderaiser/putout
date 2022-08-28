'use strict';

const {RuleTester} = require('eslint');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('destructuring-as-function-argument', rule, {
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
        output: `
            function hello({user, password}) {};
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
        output: `
            const hello = ({user, password}) => {};
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
        output: `
            const hello = function({user}) {};
            `,
        errors: [{
            message: 'Keep curly braces on one line when you use destructuring as function argument',
            type: 'ObjectPattern',
        }],
    }],
});

