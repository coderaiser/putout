'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const rule = require('.');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
    },
});

ruleTester.run('putout', rule, {
    valid: [
        `const bar = foo?.bar;`,
        `
        function foo({ bar }) {
          return { bar };
        }
        
        foo({ bar: 123 });`,
        'fn(/(?<foo>a)/)', {
            options: [{
                rules: {
                    'remove-unused-variables': 'off',
                },
            }],
            code: `const t = 'hi';`,
        }, {
            options: [{
                ignore: [
                    '<input>',
                ],
            }],
            code: `const t = 'hi';`,
        }],
    invalid: [{
        code: `const m = 'hi'`,
        output: '',
        errors: [{
            message: '"m" is defined but never used (remove-unused-variables)',
        }],
    }, {
        code: `const t = 'hi'`,
        options: [{
            rules: {
                'strict-mode': 'on',
            },
        }],
        output: `'use strict';`,
        errors: [{
            message: '"use strict" directive should be on top of commonjs file (strict-mode/add)',
        }, {
            message: '"t" is defined but never used (remove-unused-variables)',
        }],
    }, {
        options: [{
            rules: {
                'strict-mode': 'off',
            },
        }],
        code: montag`
            // hello
            const m = 'hi';
            const t = 'world';
            log(t);
        `,
        output: montag`
            // hello
            const t = 'world';
            log(t);
        `,
        errors: [{
            line: 2,
            column: 7,
            message: '"m" is defined but never used (remove-unused-variables)',
        }],
    }],
});

const parserTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: ['@babel/plugin-syntax-typescript'],
        },
    },
});

parserTester.run('putout', rule, {
    valid: [``, {
        options: [{
            rules: {
                'remove-unused-variables': 'off',
            },
        }],
        code: `
            const x: X[] = [];
        `,
    }],
    invalid: [{
        options: [{
            rules: {
                'convert-generic-to-shorthand': 'on',
            },
        }],
        code: montag`
            interface A {
                x: Array<X>;
            }
        `,
        output: '',
        errors: [{
            line: 1,
            column: 1,
            message: '"A" is defined but never used (remove-unused-variables)',
        }, {
            line: 2,
            column: 8,
            message: 'Shorthand [] should be used instead of Array (convert-generic-to-shorthand)',
        }],
    }],
});

