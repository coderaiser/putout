'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');
const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));
const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
    },
});

ruleTester.run('array-element-newline', rule, {
    valid: [`const a = ['a', 'b', 'c', 'd'];`, `const a = ['a', 'b', 'c', 'd',,,];`, montag`
            ['a', 'b', 'c', 'd', 'e'].map();
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
                4,
            ];
        `, montag`
            export default {
                'wisdom': () => run(['lint:all', 'coverage']),
            }
        `, montag`
            export default {
                'test': () => [env, 'test:only'],
            }
        `, montag`
            const argv = [
                join(__dirname, 'fixture/parse-error.js'),
                '--raw',
                '--no-config',
                '--format',
                'none',
            ];
        `, montag`
            module.exports = {
                files: ['*.json', '*{json}'],
                rules: {
                    'quotes': ['error', 'double'],
                }
            }
        `, montag`
            for (const ext of ['js', 'mjs', 'cjs']) {}
        `, montag`
             const expected = [COMPUTED, 'debugger'];
        `, montag`
             const expected = [true, 'hello'];
        `, montag`
             const expected = ['Only one assertion per test allowed, looks like you have more', 'at'];
         `, montag`
             const statusMatrix = stub().returns([
                 ['packages/putout/lib/cli/index.js', 1, 2, 2],
                 ['packages/putout/lib/cli/staged.js', 1, 2, 3],
             ]);
        `, montag`
            putout('isFn(fn, "hello"); debugger', {
                plugins: [
                    ['remove-debugger', removeDebugger],
                    ['declare', declare],
                ],
            });
        `],
    invalid: [{
        code: montag`
            const a = [1, 2, 3, 4, 5];
        `,
        output: montag`
            const a = [
            1,
             2,
             3,
             4,
             5
            ];
        `,
        errors: [{
            message: 'Add newlines between array elements',
            type: 'ArrayExpression',
        }],
    }, {
        code: montag`
            const a = ['a', 'b', 'c', 'd', 'e'];
        `,
        output: `const a = [\n'a',\n 'b',\n 'c',\n 'd',\n 'e'\n];`,
        errors: [{
            message: 'Add newlines between array elements',
            type: 'ArrayExpression',
        }],
    }, {
        code: montag`
            const a = [a, b, c, d, e];
        `,
        output: `const a = [\na,\n b,\n c,\n d,\n e\n];`,
        errors: [{
            message: 'Add newlines between array elements',
            type: 'ArrayExpression',
        }],
    }, {
        code: montag`
         module.exports.include = () => ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'];
     `,
        output: `module.exports.include = () => [\n'FunctionDeclaration',\n 'FunctionExpression',\n 'ArrowFunctionExpression'\n];`,
        errors: [{
            message: 'Add newlines between array elements',
            type: 'ArrayExpression',
        }],
    }, {
        code: montag`
            const a = {
                "plugins": ["n", "putout"]
            };
     `,
        output: 'const a = {\n    "plugins": [\n"n",\n "putout"\n]\n};',
        errors: [{
            message: 'Add newlines between array elements',
            type: 'ArrayExpression',
        }],
    }],
});
