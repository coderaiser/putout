'use strict';

const {keys} = Object;

const test = require('supertape');
const putoutConfig = require('../putout.json');

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

