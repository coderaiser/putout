'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
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
        `,
        montag`
            test('lint: some check', (t) => {
                t.equal(result, 3);
            });
        `,
        montag`
            test('lint: some check', (t) => {
                t.equal(result, 3);
                t.equal(result, 2);
                t.end();
            });
        `,
        montag`
            test('lint: some check', ({comparePlaces}) => {
                comparePlaces();
            });
        `,
    ],
    
    invalid: [{
        code: [
            `test('lint: some check', (t) => {`,
            `    const result = 1 + 2;`,
            `    t.equal(result, 3);`,
            `    t.end();`,
            `});`,
        ].join('\n'),
        output: [
            `test('lint: some check', (t) => {`,
            `    const result = 1 + 2;`,
            `   `,
            ` t.equal(result, 3);`,
            `    t.end();`,
            `});`,
        ].join('\n'),
        errors: [{
            message: 'Add new line before assertion',
            type: 'CallExpression',
        }],
    }],
});

