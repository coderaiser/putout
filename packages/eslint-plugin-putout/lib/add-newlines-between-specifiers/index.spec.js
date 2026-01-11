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

ruleTester.run('add-newlines-between-specifiers', rule, {
    valid: [
        montag`
            let a, b, c;
            export {a, b, c}
        `,
        montag`
            let a, b, c, d;
            export {
                a,
                b,
                c,
                d,
            }
        `,
    ],
    
    invalid: [{
        code: montag`
            let a, b, c, d;
            export {a, b, c, d}
        `,
        output: montag`
            let a, b, c, d;
            export {
            a,
                b,
                c,
                d
            }
        `,
        
        errors: [{
            message: 'Add newlines between specifiers',
        }],
    }, {
        code: montag`
            let a, b, c, d;
            export {
                a, b, c, d
            }
        `,
        output: montag`
            let a, b, c, d;
            export {
                a,
                b,
                c,
                d
            }
        `,
        
        errors: [{
            message: 'Add newlines between specifiers',
        }],
    }],
});
