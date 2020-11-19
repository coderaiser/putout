'use strict';

const test = require('supertape');

const {isSupported} = require('./supported-files');

const {reRequire} = require('mock-require');

test('putout: supported files isSupported: tsx', (t) => {
    const result = isSupported('index.tsx');
    
    t.ok(result);
    t.end();
});

test('putout: supported files: isSupported: mjs', (t) => {
    const result = isSupported('index.mjs');
    
    t.ok(result);
    t.end();
});

test('putout: supported files: isSupported: cjs', (t) => {
    const result = isSupported('index.cjs');
    
    t.ok(result);
    t.end();
});

test('putout: supported files: getSupportedGlob: mjs, tsx', (t) => {
    const {
        add,
        getSupportedGlob,
    } = reRequire('./supported-files');
    const expected = 'get-files/**/*.{js,mjs,cjs,jsx,ts,tsx}';
    
    add(['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx']);
    const result = getSupportedGlob('get-files');
    
    t.equal(result, expected);
    t.end();
});

test('putout: supported files: add', (t) => {
    const expected = ['xjs'];
    
    const {add, getExtensions} = reRequire('./supported-files');
    add('xjs');
    
    t.deepEqual(expected, getExtensions());
    t.end();
});

test('putout: supported files: add: multiple', (t) => {
    const expected = ['xjs', 'extjs'];
    
    const {add, getExtensions} = reRequire('./supported-files');
    add(['.xjs', '.extjs']);
    
    t.deepEqual(expected, getExtensions());
    t.end();
});

