'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('./for-of-multiple-properties-destructuring'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

const message = 'Keep all properties in one line when using destructuring in for-of';

ruleTester.run('multiple-properties-destructuring', rule, {
    valid: [
        `for (const {a, b, c, d} of items) {
        }`,
    ],
    
    invalid: [{
        code: `for (const {\nx,\ny\n} of screen){}`,
        output: `for (const {x, y} of screen){}`,
        options: [{maxProperties: 3}],
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: `for (const { \nx,\ny\n } of screen){}`,
        output: `for (const {x, y} of screen){}`,
        options: [{maxProperties: 3}],
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }],
});

