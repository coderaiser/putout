'use strict';

const {RuleTester} = require('eslint');

const montag = require('montag');
const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
    },
});

ruleTester.run('array-element-newline', rule, {
    valid: [`
            const a = ['a', 'b', 'c'];
        `, montag`
            ['a', 'b', 'c', 'd'].map();
        `, montag`
            const a = [{
                hello: 'world',
            }, {
                word: 'hello',
            }];
        `, montag`
            const a = [
                1,
                2,
                3,
            ];
        `, montag`
            const a = [{a: 1}, {b: 2}, {c: 3}, {
                b: [1, 2, 3, 4, 5]
            }];
        `],
    
    invalid: [{
        code: montag`
            const a = [1, 2, 3, 4];
        `,
        
        output: montag`
            const a = [
            1,
             2,
             3,
             4
            ];
        `,
        
        errors: [{
            message: 'Add newlines between array elements',
            type: 'ArrayExpression',
        }],
    }, {
        code: montag`
            const a = ['a', 'b', 'c', 'd'];
        `,
        
        output: `const a = [\n'a',\n 'b',\n 'c',\n 'd'\n];`,
        
        errors: [{
            message: 'Add newlines between array elements',
            type: 'ArrayExpression',
        }],
    }],
});

