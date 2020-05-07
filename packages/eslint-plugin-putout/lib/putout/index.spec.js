'use strict';

const rule = require('.');
const {RuleTester} = require('eslint');

const parseOptions = require('putout/lib/parse-options');
const options = parseOptions();
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
    }, {
        options: [{
            ignore: [
                '<input>',
            ],
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
    }, {
        code: `const t = 'hi'`,
        output: `'use strict';`,
        errors: [{
            message: '"use strict" directive should be on top of commonjs file (strict-mode/add)',
        }],
    }],
});

