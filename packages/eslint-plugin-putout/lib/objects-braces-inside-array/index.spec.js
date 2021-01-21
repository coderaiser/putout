'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
    },
});

const message = 'Keep braces on the same line with brackets';

ruleTester.run('format-object-expressions', rule, {
    valid: [`
        const expected = [{
            hello: 'world',
        }];
    `],
    
    invalid: [{
        code: montag`
            const expected = [
            {
                hello: 'world',
            }
        ];
        `,
        output: montag`
            const expected = [{
                hello: 'world',
            }];
        `,
        errors: [{
            message,
            type: 'ArrayExpression',
        }],
    }, {
        code: montag`
            const expected = [
            {
                hello: 'world',
            },
            {
                hi: 'there',
            }
        ];
        `,
        output: montag`
            const expected = [{
                hello: 'world',
            }, {
                hi: 'there',
            }];
        `,
        errors: [{
            message,
            type: 'ArrayExpression',
        }],
    }],
});

