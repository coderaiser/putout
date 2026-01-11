import {RuleTester} from 'eslint';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
    },
});

ruleTester.run('destructuring-as-function-argument', rule, {
    valid: [`function set({user, password}) {}`],
    
    invalid: [{
        code: `
            function hello({
                user,
                password,
            }) {};
            `,
        output: `
            function hello({user, password}) {};
            `,
        errors: [{
            message: 'Keep curly braces on one line when you use destructuring as function argument',
        }],
    }, {
        code: `
            const hello = ({
                user,
                password,
            }) => {};
            `,
        output: `
            const hello = ({user, password}) => {};
            `,
        errors: [{
            message: 'Keep curly braces on one line when you use destructuring as function argument',
        }],
    }, {
        code: `
            const hello = function({
                user,
            }) {};
            `,
        output: `
            const hello = function({user}) {};
            `,
        errors: [{
            message: 'Keep curly braces on one line when you use destructuring as function argument',
        }],
    }],
});
