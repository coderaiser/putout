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
    }],
});

