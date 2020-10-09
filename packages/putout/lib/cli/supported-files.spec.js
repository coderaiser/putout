'use strict';

const mockRequire = require('mock-require');
const test = require('supertape');

const {
    isSupported,
    getSupportedGlob,
} = require('./supported-files');

const {reRequire} = mockRequire;

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
    const result = getSupportedGlob('get-files');
    const expected = 'get-files/**/*.{js,mjs,cjs,jsx,ts,tsx}';
    
    t.equal(result, expected);
    t.end();
});

test('putout: supported files: add', (t) => {
    const extensions = [];
    const expected = ['xjs'];
    
    mockRequire('../../extensions.json', extensions);
    const {add} = reRequire('./supported-files');
    add('.xjs');
    
    t.deepEqual(extensions, expected);
    t.end();
});

test('putout: supported files: add: multiple', (t) => {
    const extensions = [];
    const expected = ['xjs', 'extjs'];
    
    mockRequire('../../extensions.json', extensions);
    const {add} = reRequire('./supported-files');
    add(['.xjs', '.extjs']);
    
    t.deepEqual(extensions, expected);
    t.end();
});

