'use strict';

const test = require('supertape');

const putoutConfig = require('../putout.json');
const {keys} = Object;

test('putout: config: ignore: .yarn', (t) => {
    const {ignore} = putoutConfig;
    
    const result = ignore.includes('**/.yarn');
    
    t.ok(result);
    t.end();
});

test('putout: config: ignore: .pnp.*', (t) => {
    const {ignore} = putoutConfig;
    
    const result = ignore.includes('**/.pnp.*');
    
    t.ok(result);
    t.end();
});

test('putout: config: match: typescript', (t) => {
    const {match} = putoutConfig;
    const result = keys(match).includes('*.{ts,tsx,mts,cts,md{ts},md{tsx}}');
    
    t.ok(result);
    t.end();
});

test('putout: config: match: strict mode: disable', (t) => {
    const {match} = putoutConfig;
    const result = keys(match).includes('*.{mjs,ts,tsx,mts}');
    
    t.ok(result);
    t.end();
});

test('putout: config: match: svelte', (t) => {
    const {match} = putoutConfig;
    const result = match['*.svelte'];
    
    const expected = {
        'remove-unused-variables': 'off',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: config: match: create-react-app: setupTests', (t) => {
    const {match} = putoutConfig;
    const result = match['setupTests.*'];
    
    const expected = {
        'remove-empty/import': 'off',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: config: ignore: .idea', (t) => {
    const {ignore} = putoutConfig;
    const is = ignore.includes('**/.idea');
    
    t.ok(is);
    t.end();
});

test('putout: config: eslint', (t) => {
    const {match} = putoutConfig;
    const is = match['.eslintrc{*,.json}'];
    
    t.ok(is);
    t.end();
});

test('putout: config: markdown', (t) => {
    const {match} = putoutConfig;
    const result = match['*.md'];
    const expected = {
        'convert-quotes-to-backticks': 'off',
        'convert-comparison-to-boolean': 'off',
        'remove-unused-expressions': 'off',
        'remove-unused-variables': 'off',
        'remove-useless-escape': 'off',
        'remove-useless-variables': 'off',
        'remove-useless-return': 'off',
        'remove-empty': 'off',
        'remove-unused-for-of-variables': 'off',
        'remove-constant-conditions': 'off',
        'remove-console': 'off',
        'remove-unreachable-code': 'off',
        'declare-undefined-variables': 'off',
        'nodejs/declare': 'off',
        'typescript/remove-unused-types': 'off',
    };
    
    t.deepEqual(result, expected);
    t.end();
});
