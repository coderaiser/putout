'use strict';

const rule = require('./putout');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('putout', rule, {
    valid: [{
        options: [{
            rules: {
                'remove-unused-variables': false,
                'strict-mode': false,
            },
        }],
        code: `const t = 'hi';`,
    }],
    invalid: [{
        options: [{
            rules: {
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

