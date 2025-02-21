'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2024,
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
            type: 'ExportNamedDeclaration',
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
            type: 'ExportNamedDeclaration',
        }],
    }],
});
