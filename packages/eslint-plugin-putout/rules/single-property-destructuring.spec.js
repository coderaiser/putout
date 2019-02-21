'use strict';

const rule = require('./single-property-destructuring');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('single-property-destructuring', rule, {
    valid: [
        `const {hello} = world;`,
        `const {hello} = get({});`,
        `const {
            hello = true
        } = world;`,
    ],
    
    invalid: [{
        code: `const {\n    hello\n} = world`,
        output: 'const {hello} = world',
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'VariableDeclarator',
        }],
    }],
});

