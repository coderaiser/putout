import {RuleTester} from 'eslint';
import {createPlugin} from '@putout/eslint/create-plugin';
import * as _rule from './index.js';

const rule = createPlugin(_rule);

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
    },
});

const message = 'Keep each property on separate lines when using multiple destructuring properties';

ruleTester.run('multiple-properties-destructuring', rule, {
    valid: [
        `import test, {stub} from 'supertape';`,
        `import x, {m, z} from 'y';`,
        `const {
            a,
            b,
            c,
        } = world;`,
        `const {
            a,
            // hello
            b,
            // world
            c,
        } = world;
        `,
        `
        for (const {a, b, c, d} of items) {
        }
        `,
        `
        import x, {
            m as b,
            z
        } from 'y';
    `,
    ],
    invalid: [{
        code: `const {x, y} = screen;`,
        output: `const {\nx,\n y\n} = screen;`,
        options: [{
            minProperties: 1,
        }],
        errors: [{
            message,
        }],
    }, {
        code: `const {a, b, c} = world;`,
        output: `const {\na,\n b,\n c\n} = world;`,
        errors: [{
            message,
        }],
    }, {
        code: `
            const {
                _filename, _story,
                getValue,
                setValue,
                getCursor,
                moveCursorTo,
                sha
            } = this;
        `,
        output: `
            const {
                _filename,\n _story,
                getValue,
                setValue,
                getCursor,
                moveCursorTo,
                sha\n} = this;
        `,
        errors: [{
            message,
        }],
    }, {
        code: `import {a, b, c} from 'world';`,
        output: `import {\na,\n b,\n c\n} from 'world';`,
        errors: [{
            message,
        }],
    }, {
        code: `import x, {m as b, z, d} from 'y';`,
        output: `import x,\n {\nm as b,\n z,\n d\n} from 'y';`,
        errors: [{
            message,
        }],
    }],
});
