'use strict';

const {join} = require('path');

const test = require('supertape');
const mockRequire = require('mock-require');
const stub = require('@cloudcmd/stub');

const getFiles = require('./get-files');

const {reRequire, stopAll} = mockRequire;

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
    const sync = stub().returns([
        'get-files.js',
        'get-files.spec.js',
    ]);
    
    mockRequire('glob', {
        sync,
    });
    
    const getFiles = reRequire('./get-files');
    
    const [, files] = getFiles(['**/get-files*.js']);
    const result = files.map(rmStart);
    const expected = [
        'get-files.js',
        'get-files.spec.js',
    ];
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: name', (t) => {
    const sync = stub().returns([
        'get-files.js',
    ]);
    
    mockRequire('glob', {
        sync,
    });
    
    const getFiles = reRequire('./get-files');
    
    const [, files] = getFiles(['lib/get-files.js']);
    const result = files.map(rmStart);
    const expected = [
        'get-files.js',
    ];
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: dir', (t) => {
    const sync = stub().returns([
        'bin/putout.js',
    ]);
    
    mockRequire('glob', {
        sync,
    });
    
    const getFiles = reRequire('./get-files');
    const [, files] = getFiles(['bin']);
    const result = files.map(rmStart);
    const expected = [
        'bin/putout.js',
    ];
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: glob', (t) => {
    const dir = join(__dirname, '..');
    
    const getFiles = reRequire('./get-files');
    const [, files] = getFiles([`${dir}/{bin,.madrun.js}`]);
    const result = files.map(rmStart);
    const expected = [
        join(dir, '.madrun.js'),
        join(dir, 'bin/putout.js'),
    ];
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

