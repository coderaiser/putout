'use strict';

const {RuleTester} = require('eslint');
const montag = require('montag');

const rule = require('.');

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

ruleTester.run('remove-empty-newline-after-import', rule, {
    valid: [
        montag`
            import fs from 'fs';
            import index1 from './index.js';
        `, montag`
            import fs from 'fs';
            import {promisify} from 'util';
            
            import index1 from './index.js';
        `, montag`
            import fs from 'fs';
            import {promisify} from 'util';
            
            import chalk from 'chalk';
        `, montag`
            import abc from './abc.js';
            
            import _createTest, {
                createTest,
            } from './test.mjs';
            
            import cjsTest from './test.js';
        `, montag`
            import {
                readFile,
                writeFile,
            } from 'fs/promises';
            
            import {promisify} from 'util';
        `,
    ],
    
    invalid: [{
        code: montag`
            import fs from 'fs';
            
            import {promisify} from 'util';
            
            import index1 from './index.js';
        `,
        output: montag`
            import fs from 'fs';
            import {promisify} from 'util';
            
            import index1 from './index.js';
        `,
        errors: [{
            message: 'Remove empty newline after import',
            type: 'ImportDeclaration',
        }],
    }, {
        code: montag`
            import index1 from './index.js';
            
            import index3 from './index.js';
        `,
        output: montag`
            import index1 from './index.js';
            import index3 from './index.js';
        `,
        errors: [{
            message: 'Remove empty newline after import',
            type: 'ImportDeclaration',
        }],
    }, {
        code: montag`
            import fs from 'fs';
            
            import index3 from './index.js';
        `,
        output: montag`
            import fs from 'fs';
            import index3 from './index.js';
        `,
        errors: [{
            message: 'Remove empty newline after import',
            type: 'ImportDeclaration',
        }],
    }],
});

