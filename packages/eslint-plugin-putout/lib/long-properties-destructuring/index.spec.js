'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const {createPlugin} = require('@putout/eslint/create-plugin');
const rule = createPlugin(require('.'));

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2024,
        },
    },
});

const message = 'Keep each property on separate lines when destructuring long properties';

ruleTester.run('long-properties-destructuring', rule, {
    valid: [
        `const {
            isIdentifier,
        } = world;`,
        `
        const {a} = world
        `,
        `
        const {
            ...a
        } = b
        `,
        `
        for (const {Hello, HelloWorld} of Words) {}
        `,
        `
        const {a, b, c, d} = e;
        `, {
            code: montag`
                import {isCorrectPlugin, getIsCorrectPluginMessage} from './is-correct-plugin.js';
            `,
            options: [{
                maxLength: 30,
            }],
        }, `import process, {hrtime} from 'node:process';`,
    ],
    
    invalid: [{
        code: `const {isValidIdentifier, a} = world;`,
        output: montag`
            const {
                isValidIdentifier,
                a
            } = world;
        `,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: `const {a, ...isMagicIdentifier} = b;`,
        output: montag`
            const {
                a,
                ...isMagicIdentifier
            } = b;
        `,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: montag`
            const {ignoreSomething, processors} = getOptions({
                rulesdir,
                noConfig,
                transform,
                plugins,
            });
        `,
        output: montag`
            const {
                ignoreSomething,
                processors
            } = getOptions({
                rulesdir,
                noConfig,
                transform,
                plugins,
            });
        `,
        errors: [{
            message,
            type: 'VariableDeclarator',
        }],
    }, {
        code: montag`
            import {isCorrectPlugin, getIsCorrectPluginMessage} from './is-correct-plugin.js';
        `,
        output: montag`
            import {
                isCorrectPlugin,
                getIsCorrectPluginMessage
            } from './is-correct-plugin.js';
        `,
        errors: [{
            message,
            type: 'ImportDeclaration',
        }],
    }],
});
