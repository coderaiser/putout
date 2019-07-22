'use strict';

const rule = require('./putout');
const {RuleTester} = require('eslint');

const putout = require('putout');
const options = putout.parseOptions();
const {rules} = options;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('putout', rule, {
    valid: [{
        options: [{
            ...options,
            rules: {
                ...rules,
                'remove-unused-variables': false,
                'strict-mode': false,
            },
        }],
        code: `const t = 'hi';`,
    }],
    invalid: [{
        options: [{
            ...options,
            rules: {
                ...rules,
                'strict-mode': false,
            },
        }],
        code: `const t = 'hi'`,
        output: '',
        errors: [{
            message: '"t" is defined but never used (remove-unused-variables)',
        }],
    }],
});

