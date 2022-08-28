'use strict';

const {RuleTester} = require('eslint');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

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
    `, `
        switch(x) {
        case 1:
            break;
        }
    `, `
        if (true) {}
    `, `
        for (i = 0; i < n; i++) {}
    `, `
        for (x of y) {}
    `, `
        const a = async () => {for await (x of y) {}}
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
    }, {
        code: `if(2 > 3) {}`,
        output: `if (2 > 3) {}`,
        errors: [{
            message: 'Use space after "if"',
        }],
    }, {
        code: `for(i = 0; i < n; i++) {}`,
        output: `for (i = 0; i < n; i++) {}`,
        errors: [{
            message: 'Use space after "for"',
        }],
    }, {
        code: `for(x of y) {}`,
        output: `for (x of y) {}`,
        errors: [{
            message: 'Use space after "for"',
        }],
    }, {
        code: `const a = async () => {for await(x of y) {}}`,
        output: `const a = async () => {for await (x of y) {}}`,
        errors: [{
            message: 'Use space after "for"',
        }],
    }],
});

