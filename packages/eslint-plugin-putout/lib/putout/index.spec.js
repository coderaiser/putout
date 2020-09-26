'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const parseOptions = require('putout/lib/parse-options');

const rule = require('.');

const options = parseOptions();
const {rules} = options;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
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
        code: `const m = 'hi'`,
        output: '',
        errors: [{
            message: '"m" is defined but never used (remove-unused-variables)',
        }],
    }, {
        code: `const t = 'hi'`,
        output: `'use strict';`,
        errors: [{
            message: '"use strict" directive should be on top of commonjs file (strict-mode/add)',
        }, {
            message: '"t" is defined but never used (remove-unused-variables)',
        }],
    }, {
        options: [{
            ...options,
            rules: {
                ...rules,
                'strict-mode': false,
            },
        }],
        code: montag`
            // hello
            const m = 'hi';
            const t = 'world';
            log(t);
        `,
        output: montag`
            // hello
            const t = 'world';
            log(t);
        `,
        errors: [{
            line: 2,
            column: 7,
            message: '"m" is defined but never used (remove-unused-variables)',
        }],
    }],
});

