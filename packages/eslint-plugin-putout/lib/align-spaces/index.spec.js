'use strict';

const {createPlugin} = require('@putout/eslint/create-plugin');
const {RuleTester} = require('eslint');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2024,
        },
    },
});

ruleTester.run('align-spaces', rule, {
    valid: [
        [
            'function hello() {',
            '    const result = [];',
            '    ',
            '    return result;',
            '}',
        ].join('\n'),
    ],
    invalid: [{
        code: [
            'function hello() {',
            '    const result = [];',
            '',
            '    return result;',
            '}',
        ].join('\n'),
        output: [
            'function hello() {',
            '    const result = [];',
            '    ',
            '    return result;',
            '}',
        ].join('\n'),
        errors: [{
            message: 'Keep whitespaces in blank lines',
            type: 'Program',
        }],
    }],
});
