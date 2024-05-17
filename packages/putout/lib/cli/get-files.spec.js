'use strict';

const {join} = require('node:path');
const fs = require('node:fs/promises');

const {test, stub} = require('supertape');
const mockRequire = require('mock-require');

const getFiles = require('./get-files');

const {reRequire, stopAll} = mockRequire;
const rmStart = (a) => a.replace('lib/', '');

test('putout: getFiles: error', async (t) => {
    const [e] = await getFiles(['*.xxx']);
    
    t.equal(e.message, `No files matching the pattern '*.xxx' were found`);
    t.end();
});

test('putout: getFiles: error: not first', async (t) => {
    const [e] = await getFiles(['**/*.js', '*.xxx']);
    
    t.equal(e.message, `No files matching the pattern '*.xxx' were found`);
    t.end();
});

test('putout: getFiles', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const glob = stub().returns(['get-files.js', 'get-files.spec.js']);
    
    mockRequire('glob', {
        glob,
    });
    
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

test('putout: getFiles: normalize', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const glob = stub().returns(['.//get-files.js', './/get-files.spec.js']);
    
    mockRequire('glob', {
        glob,
    });
    
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
    
    const glob = stub().returns(['get-files.js']);
    
    mockRequire('glob', {
        glob,
    });
    
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
    
    const glob = stub().returns(['bin/putout.js']);
    
    mockRequire('glob', {
        glob,
    });
    
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
    const dir = join(__dirname, '..', '..');
    
    const [, files] = await getFiles([`${dir}/.madrun.mjs`]);
    
    const result = files.map(rmStart);
    
    const expected = [
        join(dir, '.madrun.mjs'),
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: getSupportedGlob: call', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(true),
    });
    
    const getSupportedGlob = stub();
    
    const glob = stub().returns(['get-files']);
    
    mockRequire('./supported-files', {
        getSupportedGlob,
    });
    
    mockRequire('glob', {
        glob,
    });
    
    const getFiles = reRequire('./get-files');
    await getFiles(['**/get-files*.js']);
    
    fs.lstat = lstat;
    stopAll();
    reRequire('./get-files');
    
    t.calledWith(getSupportedGlob, ['get-files']);
    t.end();
});

test('putout: getFiles: getSupportedGlob: result', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(true),
    });
    
    const getSupportedGlob = stub().returns('get-files/some-glob');
    const glob = stub().returns(['get-files']);
    
    mockRequire('./supported-files', {
        getSupportedGlob,
    });
    
    mockRequire('glob', {
        glob,
    });
    
    const getFiles = reRequire('./get-files');
    await getFiles(['**/get-files*.js']);
    
    fs.lstat = lstat;
    stopAll();
    
    t.calledWith(glob, ['get-files/some-glob', {
        dot: true,
        nodir: true,
    }]);
    t.end();
});

test('putout: getFiles: options', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const glob = stub().returns([]);
    
    mockRequire('glob', {
        glob,
    });
    
    const ignore = ['*.js'];
    const getFiles = reRequire('./get-files');
    
    await getFiles(['lib/get-files.js'], {
        ignore,
    });
    
    const expected = ['lib/get-files.js', {
        dot: true,
        nodir: true,
        ignore,
    }];
    
    fs.lstat = lstat;
    stopAll();
    reRequire('./get-files');
    
    t.calledWith(glob, expected);
    t.end();
});

test('putout: getFiles: windows', async (t) => {
    const {lstat} = fs;
    
    fs.lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const glob = stub().returns([]);
    
    mockRequire('glob', {
        glob,
    });
    
    const ignore = ['*.js'];
    const getFiles = reRequire('./get-files');
    
    await getFiles(['lib\\get-files.js'], {
        ignore,
    });
    
    const expected = ['lib/get-files.js', {
        dot: true,
        nodir: true,
        ignore,
    }];
    
    fs.lstat = lstat;
    stopAll();
    reRequire('./get-files');
    
    t.calledWith(glob, expected);
    t.end();
});
