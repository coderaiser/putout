import {RuleTester} from 'eslint';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
    },
});

const message = 'Keep all properties in one line when using destructuring in for-of';

ruleTester.run('multiple-properties-destructuring', rule, {
    valid: [
        `for (const {a, b, c, d} of items) {
        }`,
        `
        const {
            a,
            b,
        } = c`,
    ],
    
    invalid: [{
        code: `for (const {\nx,\ny\n} of screen){}`,
        output: `for (const {x, y} of screen){}`,
        options: [{
            maxProperties: 3,
        }],
        errors: [{
            message,
        }],
    }, {
        code: `for (const { \nx,\ny\n } of screen){}`,
        output: `for (const {x, y} of screen){}`,
        options: [{
            maxProperties: 3,
        }],
        errors: [{
            message,
        }],
    }],
});
