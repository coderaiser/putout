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

const message = 'Keep each property on separate lines when using multiple destructuring properties';

ruleTester.run('multiple-properties-destructuring', rule, {
    valid: [
        `const {
            a,
            b,
            c,
        } = world;`,
        `const {
            a,
            // hello
            b,
            // world
            c,
        } = world;`,
        `for (const {a, b, c, d} of items) {
        }`,
    ],
    
    invalid: [{
        code: `const {x, y} = screen;`,
        output: `const {\nx,\n y\n} = screen;`,
        options: [{minProperties: 1}],
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: `const {a, b, c} = world;`,
        output: `const {\na,\n b,\n c\n} = world;`,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: `
            const {
                _filename, _story,
                getValue,
                setValue,
                getCursor,
                moveCursorTo,
                sha
            } = this;
        `,
        output: `
            const {
                _filename,\n _story,
                getValue,
                setValue,
                getCursor,
                moveCursorTo,
                sha\n} = this;
        `,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: `import {a, b, c} from 'world';`,
        output: `import {\na,\n b,\n c\n} from 'world';`,
        errors: [{
            message,
            type: 'ImportDeclaration',
        }],
    }],
});

