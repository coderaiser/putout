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

ruleTester.run('remove-empty-newline-after-last-specifier', rule, {
    valid: [
        montag`
            import {
                y
            } from 'z'
        `,
        montag`
            import {y} from 'z';
        `,
        montag`
            const ruleTester = new RuleTester({
                parserOptions: {
                }
            });
            
            push({
                a,
                b,
            });
        `,
    ],
    
    invalid: [{
        code: montag`
            import {
                y,
            
            } from 'z'
        `,
        output: montag`
            import {
                y,
            } from 'z'
        `,
        errors: [{
            message: 'Remove newline after last specifier',
        }],
    }, {
        code: montag`
            push({
                a,
                b,
            
            });
        `,
        output: montag`
            push({
                a,
                b,
            });
        `,
        errors: [{
            message: 'Remove newline after last specifier',
        }],
    }],
});
