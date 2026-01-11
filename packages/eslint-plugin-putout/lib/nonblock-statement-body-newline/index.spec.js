import montag from 'montag';
import {RuleTester} from 'eslint';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
    },
});

ruleTester.run('nonblock-statement-body-newline', rule, {
    valid: [
        `
        if (a)
            b();
    `,
        `
        if (a) {
        }
    `,
        `
        for (a of b) {
            a();
        }
    `,
    ],
    
    invalid: [{
        code: montag`
            if (a)
                
                b();
        `,
        output: montag`
            if (a)
                b();
        `,
        errors: [{
            message: 'Remove useless newline',
        }],
    }, {
        code: montag`
            for(a of b)
                
                a();
        `,
        output: montag`
            for(a of b)
                a();
        `,
        errors: [{
            message: 'Remove useless newline',
        }],
    }, {
        code: montag`
            for(;;)
                
                a();
        `,
        output: montag`
            for(;;)
                a();
        `,
        errors: [{
            message: 'Remove useless newline',
        }],
    }, {
        code: montag`
            while(a)
                
                a();
        `,
        output: montag`
            while(a)
                a();
        `,
        errors: [{
            message: 'Remove useless newline',
        }],
    }],
});
