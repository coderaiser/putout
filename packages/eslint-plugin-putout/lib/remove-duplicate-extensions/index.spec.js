import {RuleTester} from 'eslint';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
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
        }],
    }, {
        code: `import('./index.js.js')`,
        output: `import('./index.js')`,
        errors: [{
            message,
        }],
    }, {
        code: `export * from './index.js.js'`,
        output: `export * from './index.js'`,
        errors: [{
            message,
        }],
    }, {
        code: `export {x} from './index.js.js'`,
        output: `export {x} from './index.js'`,
        errors: [{
            message,
        }],
    }],
});
