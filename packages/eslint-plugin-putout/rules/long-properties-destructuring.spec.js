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
        `
        const {
            ...a
        } = b
        `,
    ],
    
    invalid: [{
        code: `const {isIdentifier, a} = world;`,
        output: `const {\nisIdentifier,\n a\n} = world;`,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: `const {a, ...isIdentifier} = b;`,
        output: `const {\na,\n ...isIdentifier\n} = b;`,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }],
});

