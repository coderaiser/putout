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

const message = 'Add new lines beetween braces';

ruleTester.run('objects-braces-inside-object', rule, {
    valid: [`
        const expected = {
            hello: {
                world: 'x'
            }
        };
    `],
    
    invalid: [{
        code: montag`
            const expected = {
                hello: {world: 'x'}
            };
        `,
        output: montag`
            const expected = {
                hello: {
                    world: 'x'
                }
            };
        `,
        errors: [{
            message,
            type: 'ObjectExpression',
        }],
    }],
});

