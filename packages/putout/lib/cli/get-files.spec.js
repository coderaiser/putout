'use strict';

const {join} = require('path');

const test = require('supertape');
const mockRequire = require('mock-require');
const stub = require('@cloudcmd/stub');

const getFiles = require('./get-files');

const {reRequire, stopAll} = mockRequire;

const rmStart = (a) => a.replace('lib/', '');

test('putout: getFiles: error', async (t) => {
    const [e] = await getFiles(['*.xxx']);
    
    t.equal(e.message, 'No files matching the pattern "*.xxx" were found');
    t.end();
});

test('putout: getFiles: error: not first', async (t) => {
    const [e] = await getFiles(['**/*.js', '*.xxx']);
    
    t.equal(e.message, 'No files matching the pattern "*.xxx" were found');
    t.end();
});

test('putout: getFiles', async (t) => {
    const fastGlob = stub().returns([
        'get-files.js',
        'get-files.spec.js',
    ]);
    
    mockRequire('fast-glob', fastGlob);
    
    const getFiles = reRequire('./get-files');
    
    const [, files] = await getFiles(['**/get-files*.js']);
    const result = files.map(rmStart);
    const expected = [
        'get-files.js',
        'get-files.spec.js',
    ];
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: name', async (t) => {
    const fastGlob = stub().returns([
        'get-files.js',
    ]);
    
    mockRequire('fast-glob', fastGlob);
    
    const getFiles = reRequire('./get-files');
    
    const [, files] = await getFiles(['lib/get-files.js']);
    const result = files.map(rmStart);
    const expected = [
        'get-files.js',
    ];
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: dir', async (t) => {
    const fastGlob = stub().returns([
        'bin/putout.js',
    ]);
    
    mockRequire('fast-glob', fastGlob);
    
    const getFiles = reRequire('./get-files');
    const [, files] = await getFiles(['bin']);
    const result = files.map(rmStart);
    const expected = [
        'bin/putout.js',
    ];
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: glob', async (t) => {
    const dir = join(__dirname, '..', '..');
    
    const getFiles = reRequire('./get-files');
    const [, files] = await getFiles([`${dir}/{bin,.madrun.js}`]);
    const result = files.map(rmStart);
    const expected = [
        join(dir, '.madrun.js'),
        join(dir, 'bin/putout.js'),
    ];
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

