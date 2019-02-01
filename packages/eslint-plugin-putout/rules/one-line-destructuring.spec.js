/**
 * @fileoverview keep curly bracesin in one line when property is single
 * @author coderaiser
 */
'use strict';

const rule = require('./one-line-destructuring');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    }
});

ruleTester.run('one-line-destructuring', rule, {
    valid: [
        `const {hello} = world;`,
        `const {hello} = get({
        });
        `
    ],
    
    invalid: [{
        code: `
                const {
                    hello
                } = world;
            `,
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'VariableDeclarator'
        }]
    }
    ]
});

