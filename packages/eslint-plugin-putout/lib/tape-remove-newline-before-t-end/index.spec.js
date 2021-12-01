'use strict';

const {join} = require('path');

const {readFileSync} = require('fs');

const {RuleTester} = require('eslint');
const montag = require('montag');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

ruleTester.run('remove-newline-after-default-import', rule, {
    valid: [
        montag`
            test('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                t.end();
            });
        `, `
            test('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.end();
            });
        `,
    ],
    
    invalid: [{
        code: montag`
            test.only('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                
                t.end();
            });
        `,
        output: montag`
            test.only('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                t.end();
            });
        `,
        errors: [{
            message: 'Remove newline before t.end()',
            type: 'CallExpression',
        }],
    }, {
        code: readFixture('trimed'),
        output: readFixture('trimed-fix'),
        errors: [{
            message: 'Remove newline before t.end()',
            type: 'CallExpression',
        }],
    }],
});

