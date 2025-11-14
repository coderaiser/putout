'use strict';

const montag = require('montag');
const babel = require('#babel/eslint-parser/experimental-worker');
const typescript = require('#typescript-eslint/parser');

const {RuleTester} = require('eslint');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
        sourceType: 'module',
    },
});

const message = 'Keep each property on separate line';

ruleTester.run('object-property-newline', rule, {
    valid: [
        `const a = {
            b,
            c,
        } = world;`,
        `const b = {
            value,
        };
    `,
    ],
    invalid: [{
        code: `const a = {b}`,
        output: `const a = {\n    b\n}`,
        errors: [{
            message,
        }],
    }, {
        code: 'const options = {img: {maxSize: 512}};',
        output: 'const options = {\n    img: {\n    maxSize: 512\n}\n};',
        errors: [{
            message,
        }],
    }, {
        code: `module.exports = {start: () => 'react-scripts start'}`,
        output: `module.exports = {\n    start: () => 'react-scripts start'\n}`,
        errors: [{
            message,
        }],
    }],
});

const babelParserTester = new RuleTester({
    languageOptions: {
        parser: babel,
        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                plugins: ['@babel/plugin-syntax-typescript'],
            },
        },
    },
});

const tsParserTester = new RuleTester({
    languageOptions: {
        parser: typescript,
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
});

babelParserTester.run('object-property-newline: babel: ts', rule, {
    valid: [
        'type a = string | number',
        `type a = {
            b,
            c,
        };
    `,
    ],
    invalid: [{
        code: `type a = {b}`,
        output: `type a = {\n    b\n}`,
        errors: [{
            message,
        }],
    }, {
        code: montag`
            type a = {
                b, c,
                d: any,
            }
        `,
        output: 'type a = {\n    b,\n    c,\n    d: any,\n}',
        errors: [{
            message,
        }],
    }, {
        code: `interface a {b}`,
        output: `interface a {\n    b\n}`,
        errors: [{
            message,
        }],
    }],
});

tsParserTester.run('object-property-newline: typescript', rule, {
    valid: [
        'type a = string | number',
        `type a = {
            b,
            c,
        };
    `,
    ],
    invalid: [{
        code: `type a = {b}`,
        output: `type a = {\n    b\n}`,
        errors: [{
            message,
        }],
    }, {
        code: `interface a {b}`,
        output: `interface a {\n    b\n}`,
        errors: [{
            message,
        }],
    }],
});
