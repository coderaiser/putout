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

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
    },
});

const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

ruleTester.run('add-newline-before-return', rule, {
    valid: [
        montag`
            function parseIdentNode() {
                return parseIdentNode();
                const node = this.startNode();
                
                return node;
            }
        `,
        montag`
            test('hello: world', (t) => {
                const a = 5;
                return;
            });
        `,
        montag`
            test('hello: world', (t) => {
                return;
            });
        `,
        montag`
            test('hello: world', (t) => {
                const a = 5;
                const b = 4;
                
                return a + b;
            });
        `,
        montag`
            test('hello: world', (t) => {
                const a = 5;
                const b = 4;
                // hello world
                return a + b;
            });
        `,
        montag`
            test('hello: world', (t) => {
                const a = 5;
                const x = 6;
                
                fn();
                
                const b = 4;
                return a + b;
            });
        `,
        montag`
            function x() {
                const a = 5;
                const b = 6;
                
                if (a)
                    return;
            }
        `,
    ],
    
    invalid: [{
        code: readFixture('return'),
        output: readFixture('return-fix'),
        errors: [{
            message: `Add newline before 'return'`,
        }],
    }, {
        code: readFixture('assign'),
        output: readFixture('assign-fix'),
        errors: [{
            message: `Add newline before 'return'`,
        }],
    }],
});
