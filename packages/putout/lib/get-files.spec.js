'use strict';

const test = require('supertape');
const getFiles = require('./get-files');

const rmStart = (a) => a.replace('lib/', '');

test('putout: getFiles: error', (t) => {
    const [e] = getFiles(['*.xxx']);
    
    t.equal(e.message, 'No files matching the pattern "*.xxx" were found');
    t.end();
});

test('putout: getFiles: error: not first', (t) => {
    const [e] = getFiles(['**/*.js', '*.xxx']);
    
    t.equal(e.message, 'No files matching the pattern "*.xxx" were found');
    t.end();
});

test('putout: getFiles', (t) => {
    const [, files] = getFiles(['**/get-files*.js']);
    const result = files.map(rmStart);
    const expected = [
        'get-files.js',
        'get-files.spec.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: name', (t) => {
    const [, files] = getFiles(['lib/get-files.js']);
    const result = files.map(rmStart);
    const expected = [
        'get-files.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: dir', (t) => {
    const [, files] = getFiles(['bin']);
    const result = files.map(rmStart);
    const expected = [
        'bin/putout.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

