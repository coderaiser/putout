'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
    },
});

const message = 'Keep braces on the same line with brackets';

ruleTester.run('objects-braces-inside-array', rule, {
    valid: [`
        const expected = [{
            hello: 'world',
        }];
    `, `
        const expected = [
            [__filename], {
                ignore,
            },
        ];
    `],
    
    invalid: [{
        code: montag`
            const expected = [{
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
            }, {
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
    }, {
        code: montag`
        ({
            places: [        {
                rule: 'remove-unused-variables',
                message: '"hi" is defined but never used',
                position: {line: 3, column: 10},
            },
            ],
        });
        `,
        output: montag`
        ({
            places: [{
                rule: 'remove-unused-variables',
                message: '"hi" is defined but never used',
                position: {line: 3, column: 10},
            }],
        });
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
            },
            {
                a: 'b',
            }
        ];
        `,
        output: montag`
            const expected = [{
                hello: 'world',
            }, {
                hi: 'there',
            }, {
                a: 'b',
            }];
        `,
        errors: [{
            message,
            type: 'ArrayExpression',
        }],
    }, {
        code: montag`
            const expected = [{
                hello: 'world',
            },
            {
                hi: 'there',
            }, {
                a: 'b',
            }];
        `,
        output: montag`
            const expected = [{
                hello: 'world',
            }, {
                hi: 'there',
            }, {
                a: 'b',
            }];
        `,
        errors: [{
            message,
            type: 'ArrayExpression',
        }],
    }, {
        code: montag`
            const fn = () => {
                const expected = [{
                    hello: 'world',
                },
                {
                    hi: 'there',
                }, {
                    a: 'b',
                }];
            };
        `,
        output: montag`
            const fn = () => {
                const expected = [{
                    hello: 'world',
                }, {
                    hi: 'there',
                }, {
                    a: 'b',
                }];
            };
        `,
        errors: [{
            message,
            type: 'ArrayExpression',
        }],
    }],
});

