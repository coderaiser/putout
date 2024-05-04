'use strict';

const {join} = require('node:path');

const {readFileSync} = require('node:fs');

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
        },
    },
});

const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

ruleTester.run('add-newline-before-return', rule, {
    valid: [
        montag`
            test('hello: world', (t) => {
                const a = 5;
                return;
            });
        `,
        montag`
            test('hello: world', (t) => {
                return;
            });
        `,
        montag`
            test('hello: world', (t) => {
                const a = 5;
                const b = 4;
                
                return a + b;
            });
        `,
        montag`
            test('hello: world', (t) => {
                const a = 5;
                const b = 4;
                // hello world
                return a + b;
            });
        `,
        montag`
            test('hello: world', (t) => {
                const a = 5;
                const x = 6;
                
                fn();
                
                const b = 4;
                return a + b;
            });
        `,
        montag`
            function x() {
                const a = 5;
                const b = 6;
                
                if (a)
                    return;
            }
        `,
    ],
    
    invalid: [{
        code: readFixture('return'),
        output: readFixture('return-fix'),
        errors: [{
            message: `Add newline before 'return'`,
            type: 'ReturnStatement',
        }],
    }, {
        code: readFixture('assign'),
        output: readFixture('assign-fix'),
        errors: [{
            message: `Add newline before 'return'`,
            type: 'ReturnStatement',
        }],
    }],
});
