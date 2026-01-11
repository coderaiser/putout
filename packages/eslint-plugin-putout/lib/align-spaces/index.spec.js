import {createPlugin} from '@putout/eslint/create-plugin';
import {RuleTester} from 'eslint';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
    },
});

ruleTester.run('align-spaces', rule, {
    valid: [
        [
            'function hello() {',
            '    const result = [];',
            '    ',
            '    return result;',
            '}',
        ].join('\n'),
    ],
    invalid: [{
        code: [
            'function hello() {',
            '    const result = [];',
            '',
            '    return result;',
            '}',
        ].join('\n'),
        output: [
            'function hello() {',
            '    const result = [];',
            '    ',
            '    return result;',
            '}',
        ].join('\n'),
        errors: [{
            message: 'Keep whitespaces in blank lines',
        }],
    }],
});
