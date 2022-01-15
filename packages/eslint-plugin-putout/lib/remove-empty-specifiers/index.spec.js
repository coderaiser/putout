'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

ruleTester.run('remove-empty-empty-specifiers', rule, {
    valid: [
        montag`
            import putout, {transform} from 'putout';
        `,
        montag`
            import putout from 'putout';
        `,
        montag`
            import putout, {/* hello */} from 'putout';
        `,
    ],
    
    invalid: [{
        code: montag`
            import putout, {} from 'putout';
        `,
        output: montag`
            import putout from 'putout';
        `,
        errors: [{
            message: 'Remove empty import specifiers',
            type: 'ImportDeclaration',
        }],
    }, {
        code: montag`
            import {} from 'putout';
        `,
        output: montag`
            import 'putout';
        `,
        errors: [{
            message: 'Remove empty import specifiers',
            type: 'ImportDeclaration',
        }],
    }],
});

