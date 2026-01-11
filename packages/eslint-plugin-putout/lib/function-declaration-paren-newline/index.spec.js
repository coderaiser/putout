import {readFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {RuleTester} from 'eslint';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');
const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
    },
});

ruleTester.run('keyword-spacing', rule, {
    valid: [
        `
        function hello({a, b, c}) {
        }
    `,
        `
        ({a, b, c}) => {
        }
    `,
        `
        ({a, b, c}) => {
            return x(
                a,
                b,
            );
        }
    `,
    ],
    
    invalid: [{
        code: `function hello(
            {a, b, c}
        ) {}`,
        output: `function hello({a, b, c}) {}`,
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }, {
        code: `(
            {a, b, c}
        ) => {}`,
        output: `({a, b, c}) => {}`,
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }, {
        code: `(
            {a, b, c},
        ) => {}`,
        output: `({a, b, c}) => {}`,
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }, {
        code: `
            regexpTree.traverse(ast, {
                RegExp(
                    {node},
                ) {
                    const {body} = node;
                }
            });
            `,
        output: `
            regexpTree.traverse(ast, {
                RegExp({node}) {
                    const {body} = node;
                }
            });
            `,
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }, {
        code: readFixture('fn'),
        output: readFixture('fn-fix'),
        errors: [{
            message: 'Unexpected new lines around arguments',
        }],
    }],
});
