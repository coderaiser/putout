'use strict';

const test = require('supertape');
const {reRequire} = require('mock-require');

test('putout: supported files isSupported', (t) => {
    const {
        add,
        isSupported,
    } = reRequire('./supported-files');
    
    add(['*.tsx']);
    
    const result = isSupported('index.tsx');
    
    t.ok(result);
    t.end();
});

test('putout: supported files isSupported: dot', (t) => {
    const {
        add,
        isSupported,
    } = reRequire('./supported-files');
    
    add(['*.tsx']);
    
    const result = isSupported('.index.tsx');
    
    t.ok(result);
    t.end();
});

test('putout: supported files isSupported: dir', (t) => {
    const {
        add,
        isSupported,
    } = reRequire('./supported-files');
    
    add(['*.tsx']);
    
    const result = isSupported('/.index.tsx');
    
    t.ok(result);
    t.end();
});

test('putout: supported files isSupported: no', (t) => {
    const {
        add,
        isSupported,
    } = reRequire('./supported-files');
    
    add(['*.tsx']);
    
    const result = isSupported('index.js');
    
    t.notOk(result);
    t.end();
});

test('putout: supported files: getSupportedGlob: mjs, tsx', (t) => {
    const {
        add,
        getSupportedGlob,
    } = reRequire('./supported-files');
    
    const expected = 'get-files/**/{*.js,*.mjs,*.cjs,*.jsx,*.ts,*.tsx}';
    
    add([
        '*.js',
        '*.mjs',
        '*.cjs',
        '*.jsx',
        '*.ts',
        '*.tsx',
    ]);
    const result = getSupportedGlob('get-files');
    
    t.equal(result, expected);
    t.end();
});

test('putout: supported files: add: multiple', (t) => {
    const expected = [
        '*.xjs',
        '*.extjs',
    ];
    
    const {
        add,
        getPatterns,
    } = reRequire('./supported-files');
    
    add([
        '*.xjs',
        '*.extjs',
    ]);
    
    t.deepEqual(getPatterns(), expected);
    t.end();
});

test('putout: supported files: getSupportedGlob: path with slash', (t) => {
    const {
        add,
        getSupportedGlob,
    } = reRequire('./supported-files');
    
    const expected = 'get-files/**/{*.js,*.mjs,*.cjs,*.jsx,*.ts,*.tsx}';
    
    add([
        '*.js',
        '*.mjs',
        '*.cjs',
        '*.jsx',
        '*.ts',
        '*.tsx',
    ]);
    
    const result = getSupportedGlob('get-files/');
    
    t.equal(result, expected);
    t.end();
});
