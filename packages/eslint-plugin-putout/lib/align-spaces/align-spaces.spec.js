'use strict';

const wrap = require('../wrap');
const {RuleTester} = require('eslint');
const rule = wrap(require('./align-spaces'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('align-spaces', rule, {
    valid: [
        ['function hello() {',
            '    const result = [];',
            '    ',
            '    return resutl;',
            '}'].join('\n'),
    ],
    invalid: [{
        code: [
            'function hello() {',
            '    const result = [];',
            '',
            '    return resutl;',
            '}',
        ].join('\n'),
        output: [
            'function hello() {',
            '    const result = [];',
            '    ',
            '    return resutl;',
            '}',
        ].join('\n'),
        errors: [{
            message: 'Spaces should be aligned on empty lines',
            type: 'Program',
        }],
    }],
});

