'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

ruleTester.run('add-newline-after-function-call', rule, {
    valid: [
        montag`
            test('hello: world', (t) => {
                twoStatements();
                const a = 5;
            });
        `,
        montag`
            test('hello: world', (t) => {
                oneStatement();
            });
        `,
        montag`
            test('hello: world', (t) => {
                newlineAfterCall();
                
                const a = 5;
                const b = 4;
            });
        `, montag`
            test('hello: world', (t) => {
                newlineAfterCall();
                ;
                const a = 5;
                const b = 4;
            });
        `, montag`
            test('hello: world', (t) => {
                newlineAfterCall();
                // returns
                [];
                
                const a = 5;
            });
        `, montag`
            test('before return', (t) => {
                if (a.test(b)) {
                    const a = 5;
                    beforeReturn();
                    return;
                }
            });
        `, montag`
            {
                mockRequire('./ruler-processor', rullerProcessor);
                const cli = reRequire('.');
                
                await tryToCatch(runCli);
            }
        `, montag`
            test('hello: world', (t) => {
                fn1(b);
                fn2(b);
                fn3(b);
            });
        `,
        '{\n    hello();\n\n    const a = 5;\n    const b = 4;\n\n}',
    ],
    
    invalid: [{
        code: montag`
            test('hello: world', (t) => {
                hello();
                const a = 5;
                const b = 4;
            });
        `,
        output:
            `test('hello: world', (t) => {\n` +
            '    hello();\n' +
            ';\n' +
            '    const a = 5;\n' +
            '    const b = 4;\n' +
            '});',
        
        errors: [{
            message: 'Add newline after function call',
            type: 'CallExpression',
        }],
    }, {
        code: montag`
            test('hello: world', (t) => {
                if (m) {
                    hello();
                    const a = 5;
                    const b = 4;
                }
            });
        `,
        output:
            `test('hello: world', (t) => {\n` +
            '    if (m) {\n' +
            '        hello();\n' +
            ';\n' +
            '        const a = 5;\n' +
            '        const b = 4;\n' +
            '    }\n' +
            '});',
        errors: [{
            message: 'Add newline after function call',
            type: 'CallExpression',
        }],
    }, {
        code: montag`
            test('hello: world', (t) => {
                hello();
                const a = {
                    hello: world,
                };
                
                return;
            });
        `,
        output:
            `test('hello: world', (t) => {\n` +
            '    hello();\n' +
            ';\n' +
            '    const a = {\n' +
            '        hello: world,\n' +
            '    };\n' +
            '    \n' +
            '    return;\n' +
            '});',
        errors: [{
            message: 'Add newline after function call',
            type: 'CallExpression',
        }],
    }, {
        code: montag`
            test('hello: world', (t) => {
                hello();
                const a = [
                    "world",
                ];
                
                return;
            });
        `,
        output:
            `test('hello: world', (t) => {\n` +
            '    hello();\n' +
            ';\n' +
            '    const a = [\n' +
            '        "world",\n' +
            '    ];\n' +
            '    \n' +
            '    return;\n' +
            '});',
        errors: [{
            message: 'Add newline after function call',
            type: 'CallExpression',
        }],
    }],
});

