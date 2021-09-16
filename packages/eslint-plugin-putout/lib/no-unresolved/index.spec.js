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

const message = 'Always add an extension to relative imports';

ruleTester.run('no-unresolved', rule, {
    valid: [
        `import hello from './hello.js'`,
        `import hello from 'hello'`,
    ],
    
    invalid: [{
        code: `import hello from './hello'`,
        output: `import hello from './hello.js'`,
        errors: [{
            message,
            type: 'ImportDeclaration',
        }],
    }],
});

