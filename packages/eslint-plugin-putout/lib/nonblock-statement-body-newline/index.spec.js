'use strict';

const montag = require('montag');

const {RuleTester} = require('eslint');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
    },
});

ruleTester.run('nonblock-statement-body-newline', rule, {
    valid: [`
        if (a)
            b();
    `, `
        if (a) {
        }
    `, `
        for (a of b) {
            a();
        }
    `],
    
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

