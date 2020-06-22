'use strict';

const {join} = require('path');
const fs = require('fs').promises;

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
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
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
    fs.lstat = lstat;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: name', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
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
    
    fs.lstat = lstat;
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: dir', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
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
    fs.lstat = lstat;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: glob', async (t) => {
    const {lstat} = fs;
    
    let is = true;
    fs.lstat = stub().returns({
        isDirectory: () => is = !is,
    });
    
    const dir = join(__dirname, '..', '..');
    
    const getFiles = reRequire('./get-files');
    const [, files] = await getFiles([`${dir}/{bin,.madrun.js}`]);
    const result = files.map(rmStart);
    const expected = [
        join(dir, '.madrun.js'),
        join(dir, 'bin/putout.js'),
    ];
    
    fs.lstat = lstat;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: getJSGlob: call', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(true),
    });
    
    const getJSGlob = stub();
    const fastGlob = stub().returns([
        'get-files',
    ]);
    
    mockRequire('./supported-files', {
        getJSGlob,
    });
    
    mockRequire('fast-glob', fastGlob);
    
    const getFiles = reRequire('./get-files');
    await getFiles(['**/get-files*.js']);
    
    fs.lstat = lstat;
    stopAll();
    
    t.ok(getJSGlob.calledWith('get-files'));
    t.end();
});

test('putout: getFiles: getJSGlob: result', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(true),
    });
    
    const getJSGlob = stub().returns('get-files/some-glob');
    const fastGlob = stub().returns([
        'get-files',
    ]);
    
    mockRequire('./supported-files', {
        getJSGlob,
    });
    
    mockRequire('fast-glob', fastGlob);
    
    const getFiles = reRequire('./get-files');
    await getFiles(['**/get-files*.js']);
    
    fs.lstat = lstat;
    stopAll();
    
    t.ok(fastGlob.calledWith('get-files/some-glob', {
        unique: true,
        dot: true,
    }));
    t.end();
});

