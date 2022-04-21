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

const message = 'Avoid duplicate extensions in relative imports';

ruleTester.run('remove-duplicate-extension', rule, {
    valid: [
        `import hello from './hello.js'`,
        `import hello from 'hello'`,
        `export const fn = () => {}`,
    ],
    
    invalid: [{
        code: `import hello from './index.js.js'`,
        output: `import hello from './index.js'`,
        errors: [{
            message,
            type: 'ImportDeclaration',
        }],
    }, {
        code: `import('./index.js.js')`,
        output: `import('./index.js')`,
        errors: [{
            message,
            type: 'ImportExpression',
        }],
    }, {
        code: `export * from './index.js.js'`,
        output: `export * from './index.js'`,
        errors: [{
            message,
            type: 'ExportAllDeclaration',
        }],
    }, {
        code: `export {x} from './index.js.js'`,
        output: `export {x} from './index.js'`,
        errors: [{
            message,
            type: 'ExportNamedDeclaration',
        }],
    }],
});
