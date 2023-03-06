'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {
    createPlugin,
} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
});

ruleTester.run('single-property-destructuring', rule, {
    valid: [
        `const {hello} = world;`,
        `const {hello} = get({});`,
        `const {
            hello = true
        } = world;`,
        `import {x} from 'y';`,
        montag`
            import {
                helloWorld as simpleHello,
            } from './user.js';
        `,
        montag`
                const {
            //  parentPath,
                node,
            } = path;
        `, montag`
            const noop = () => {};
            
            const {
                c4 = {
                    init: noop,
                },
            } = options;
        `,
    ],
    
    invalid: [{
        code: `const {\n    hello\n} = world`,
        output: 'const {hello} = world',
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'VariableDeclarator',
        }],
    }, {
        code: `const {\n    hello: h\n} = world`,
        output: 'const {hello: h} = world',
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'VariableDeclarator',
        }],
    }, {
        code: `const {\n    ...tap\n} = require('./tap')`,
        output: `const {...tap} = require('./tap')`,
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'VariableDeclarator',
        }],
    }, {
        code: montag`
            import {
                x
            } from './tap'
        `,
        output: `import {x} from './tap'`,
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'ImportDeclaration',
        }],
    }, {
        code: montag`
            import {
                x,
            } from './tap'
        `,
        output: `import {x} from './tap'`,
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'ImportDeclaration',
        }],
    }, {
        code: montag`
            import {
                run,
            } from 'madrun';
            
            export default {
                'test': () => "tape 'lib/*.spec",
            }
        `,
        output: montag`
            import {run} from 'madrun';
            
            export default {
                'test': () => "tape 'lib/*.spec",
            }
        `,
        errors: [{
            message: 'Keep curly braces on one line when you have one destructuring property',
            type: 'ImportDeclaration',
        }],
    }],
});

