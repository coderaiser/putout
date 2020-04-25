'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

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
        
        `
        const {a} = world
        `,
        
        `
        const {
            ...a
        } = b
        `,
        
        `
        for (const {Hello, HelloWorld} of Words) {}
        `,
        
        `
        const {a, b, c, d} = e;
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

