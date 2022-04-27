'use strict';

const {RuleTester} = require('eslint');

const wrap = require('../wrap');
const rule = wrap(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
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
    `],
    invalid: [{
        code: `const a = {b}`,
        output: `const a = {\n    b\n}`,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: 'const options = {img: {maxSize: 512}};',
        output: 'const options = {\n    img: {\n    maxSize: 512\n}\n};',
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: `module.exports = {start: () => 'react-scripts start'}`,
        output: `module.exports = {\n    start: () => 'react-scripts start'\n}`,
        errors: [{
            message,
            type: 'AssignmentExpression',
        }],
    }],
});

const babelParserTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser/experimental-worker'),
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: ['@babel/plugin-syntax-typescript'],
        },
    },
});

const tsParserTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
});

babelParserTester.run('object-property-newline: babel: ts', rule, {
    valid: [
        'type a = string | number',
        `type a = {
            b,
            c,
        };
    `],
    invalid: [{
        code: `type a = {b}`,
        output: `type a = {\n    b\n}`,
        errors: [{
            message,
            type: 'TSTypeAliasDeclaration',
        }],
    }, {
        code: `interface a {b}`,
        output: `interface a {\n    b\n}`,
        errors: [{
            message,
            type: 'TSInterfaceDeclaration',
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
    `],
    invalid: [{
        code: `type a = {b}`,
        output: `type a = {\n    b\n}`,
        errors: [{
            message,
            type: 'TSTypeAliasDeclaration',
        }],
    }, {
        code: `interface a {b}`,
        output: `interface a {\n    b\n}`,
        errors: [{
            message,
            type: 'TSInterfaceDeclaration',
        }],
    }],
});

