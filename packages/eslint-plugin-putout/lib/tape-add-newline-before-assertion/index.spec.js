import {RuleTester} from 'eslint';
import montag from 'montag';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
    },
});

ruleTester.run('remove-newline-after-default-import', rule, {
    valid: [
        montag`
            test('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                t.end();
            });
        `,
        montag`
            test('lint: some check', (t) => {
                t.equal(result, 3);
            });
        `,
        montag`
            test('lint: some check', (t) => {
                t.equal(result, 3);
                t.equal(result, 2);
                t.end();
            });
        `,
        montag`
            test('lint: some check', ({comparePlaces}) => {
                comparePlaces();
            });
        `,
    ],
    
    invalid: [{
        code: [
            `test('lint: some check', (t) => {`,
            `    const result = 1 + 2;`,
            `    t.equal(result, 3);`,
            `    t.end();`,
            `});`,
        ].join('\n'),
        output: [
            `test('lint: some check', (t) => {`,
            `    const result = 1 + 2;`,
            `   `,
            ` t.equal(result, 3);`,
            `    t.end();`,
            `});`,
        ].join('\n'),
        errors: [{
            message: 'Add newline before assertion',
        }],
    }],
});
