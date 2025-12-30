'use strict';

const test = require('supertape');

const {
    add,
    clear,
    isSupported,
    getSupportedGlob,
    getPatterns,
} = require('./supported-files');

test('putout: supported files isSupported', (t) => {
    add(['*.tsx']);
    
    const result = isSupported('index.tsx');
    
    t.ok(result);
    t.end();
});

test('putout: supported files: clear', (t) => {
    clear();
    const result = isSupported('index.tsx');
    
    t.notOk(result);
    t.end();
});

test('putout: supported files isSupported: dot', (t) => {
    add(['*.tsx']);
    
    const result = isSupported('.index.tsx');
    clear();
    
    t.ok(result);
    t.end();
});

test('putout: supported files isSupported: dir', (t) => {
    add(['*.tsx']);
    
    const result = isSupported('/.index.tsx');
    clear();
    
    t.ok(result);
    t.end();
});

test('putout: supported files isSupported: no', (t) => {
    add(['*.tsx']);
    
    const result = isSupported('index.js');
    clear();
    
    t.notOk(result);
    t.end();
});

test('putout: supported files: getSupportedGlob: mjs, tsx', (t) => {
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
    
    clear();
    
    t.equal(result, expected);
    t.end();
});

test('putout: supported files: add: multiple', (t) => {
    const expected = [
        '*.xjs',
        '*.extjs',
    ];
    
    add(['*.xjs', '*.extjs']);
    const result = getPatterns();
    
    clear();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: supported files: getSupportedGlob: path with slash', (t) => {
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
    clear();
    
    t.equal(result, expected);
    t.end();
});
