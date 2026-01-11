import {RuleTester} from 'eslint';
import montag from 'montag';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
    },
});

ruleTester.run('remove-empty-newline-from-empty-object', rule, {
    valid: [
        montag`
            const a = {};
        `,
        montag`
            const a = {
                // hello
            };
        `,
        montag`
            const a = {
                hello,
                world,
            };
        `,
        montag`
            const rules = {
                'find/push': ['off', {
                }],
            }
        `,
    ],
    
    invalid: [{
        code: montag`
            const a = {
            };
        `,
        output: montag`
            const a = {};
        `,
        errors: [{
            message: 'Remove newline from empty object',
        }],
    }],
});
