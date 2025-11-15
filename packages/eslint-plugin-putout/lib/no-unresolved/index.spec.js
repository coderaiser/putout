'use strict';

const {RuleTester} = require('eslint');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
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
        code: `import * as strictMode from '..';`,
        output: `import * as strictMode from '../index.js';`,
        errors: [{
            message,
        }],
    }, {
        code: `import hello from './hello'`,
        output: `import hello from './hello.js'`,
        errors: [{
            message,
        }],
    }, {
        code: `import('./dynamic')`,
        output: `import('./dynamic.js')`,
        errors: [{
            message,
        }],
    }, {
        code: `export * from './hello'`,
        output: `export * from './hello.js'`,
        errors: [{
            message,
        }],
    }, {
        code: `export {x} from './hello'`,
        output: `export {x} from './hello.js'`,
        errors: [{
            message,
        }],
    }],
});
