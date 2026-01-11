import {join, dirname} from 'node:path';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {RuleTester} from 'eslint';
import montag from 'montag';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rule = createPlugin(_rule);

const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

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
        `
            test('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.end();
            });
        `,
    ],
    
    invalid: [{
        code: montag`
            test.only('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                
                t.end();
            });
        `,
        output: montag`
            test.only('lint: some check', (t) => {
                const result = 1 + 2;
                
                t.equal(result, 3);
                t.end();
            });
        `,
        errors: [{
            message: 'Remove newline before t.end()',
        }],
    }, {
        code: readFixture('trimmed'),
        output: readFixture('trimmed-fix'),
        errors: [{
            message: 'Remove newline before t.end()',
        }],
    }],
});
