'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('./keyword-spacing'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2019,
    },
});

ruleTester.run('keyword-spacing', rule, {
    valid: [`
        try {
        } catch {
        }`, `
        try {
        } catch(e) {
        }
    `,`
        switch(x) {
        case 1:
            break;
        }
    `],
    
    invalid: [{
        code: `try {}catch{}`,
        output: `try {} catch {}`,
        errors: [{
            message: 'Use spaces around "catch"',
        }],
    }, {
        code: `
            try {
            }catch (e) {
            }`,
        output: `
            try {
            } catch(e) {
            }`,
        errors: [{
            message: 'Use spaces around "catch"',
        }],
    }, {
        code: `
            switch (x) {
            case 1:
                break;
            }`,
        output: `
            switch(x) {
            case 1:
                break;
            }`,
        errors: [{
            message: 'Avoid space after "switch"',
        }],
    }],
});

