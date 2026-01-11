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

ruleTester.run('remove-empty-newline-after-last-element', rule, {
    valid: [
        montag`
            const a = [
                1,
                2,
            ];
        `,
    ],
    
    invalid: [{
        code: montag`
            push([
                a,
                b,
            
            ]);
        `,
        output: montag`
            push([
                a,
                b,
            ]);
        `,
        errors: [{
            message: 'Remove newline after last element',
        }],
    }],
});
