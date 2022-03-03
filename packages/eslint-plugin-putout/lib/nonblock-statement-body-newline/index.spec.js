'use strict';

const montag = require('montag');

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

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
            message: 'Remove newline',
        }],
    }],
});

