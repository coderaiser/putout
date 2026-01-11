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

ruleTester.run('remove-newline-after-default-import', rule, {
    valid: [
        montag`
            import x, {
                y
            } from 'z'
        `,
    ],
    
    invalid: [{
        code: montag`
            import x,
            {
                y
            } from 'z'
        `,
        output: montag`
            import x, {
                y
            } from 'z'
        `,
        errors: [{
            message: 'Keep opening curly brace on one line with default import',
        }],
    }],
});
