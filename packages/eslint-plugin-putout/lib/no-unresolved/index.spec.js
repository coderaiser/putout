'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

const message = 'Always add an extension to relative imports';

ruleTester.run('no-unresolved', rule, {
    valid: [
        `import hello from './hello.js'`,
        `import hello from 'hello'`,
        `export const fn = () => {}`,
    ],
    
    invalid: [{
        code: `import hello from './hello'`,
        output: `import hello from './hello.js'`,
        errors: [{
            message,
            type: 'ImportDeclaration',
        }],
    }, {
        code: `import('./dynamic')`,
        output: `import('./dynamic.js')`,
        errors: [{
            message,
            type: 'ImportExpression',
        }],
    }, {
        code: `export * from './hello'`,
        output: `export * from './hello.js'`,
        errors: [{
            message,
            type: 'ExportAllDeclaration',
        }],
    }, {
        code: `export {x} from './hello'`,
        output: `export {x} from './hello.js'`,
        errors: [{
            message,
            type: 'ExportNamedDeclaration',
        }],
    }],
});

