'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('./single-property-destructuring'));

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
    }, {
        code: `const {\n    hello: h\n} = world`,
        output: 'const {hello: h} = world',
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'VariableDeclarator',
        }],
    }],
});

