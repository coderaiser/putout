'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
});

const message = 'Keep each property on separate line';

ruleTester.run('variable-init-with-object', rule, {
    valid: [
        `const a = {
            b,
            c,
        } = world;`,
        `const b = {
            value,
        };
    `],
    invalid: [{
        code: `const a = {b}`,
        output: `const a = {\nb\n}`,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: 'const options = {img: {maxSize: 512}};',
        output: 'const options = {\nimg: {\nmaxSize: 512\n}\n};',
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }],
});

