'use strict';

const rule = require('./long-properties-destructuring');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

const message = 'Keep each property on separate lines when destructuring long properties';

ruleTester.run('long-properties-destructuring', rule, {
    valid: [
        `const {
            isIdentifier,
        } = world;`,
        `const {a} = world`,
    ],
    
    invalid: [{
        code: `const {isIdentifier, a} = world;`,
        output: `const {\nisIdentifier,\n a\n} = world;`,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }],
});

