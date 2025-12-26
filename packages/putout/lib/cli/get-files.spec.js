'use strict';

const {join} = require('node:path');
const fs = require('node:fs/promises');

const {test, stub} = require('supertape');

const getFiles = require('./get-files');

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
    
    const fastGlob = stub().returns(['get-files.js', 'get-files.spec.js']);
    
    const options = {};
    const [, files] = await getFiles(['**/get-files*.js'], options, {
        fastGlob,
    });
    
    const result = files.map(rmStart);
    
    const expected = [
        'get-files.js',
        'get-files.spec.js',
    ];
    
    fs.lstat = lstat;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: normalize', async (t) => {
    const lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const fastGlob = stub().returns(['.//get-files.js', './/get-files.spec.js']);
    
    const options = {};
    const [, files] = await getFiles(['**/get-files*.js'], options, {
        fastGlob,
        lstat,
    });
    
    const result = files.map(rmStart);
    
    const expected = [
        'get-files.js',
        'get-files.spec.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: name', async (t) => {
    const lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const fastGlob = stub().returns(['get-files.js']);
    
    const options = {};
    const [, files] = await getFiles(['lib/get-files.js'], options, {
        fastGlob,
        lstat,
    });
    
    const result = files.map(rmStart);
    
    const expected = [
        'get-files.js',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: getFiles: dir', async (t) => {
    const lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const fastGlob = stub().returns(['bin/putout.js']);
    const options = {};
    
    const [, files] = await getFiles(['bin'], options, {
        fastGlob,
        lstat,
    });
    
    const result = files.map(rmStart);
    
    const expected = [
        'bin/putout.js',
    ];
    
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
    const getSupportedGlob = stub();
    const fastGlob = stub().returns(['get-files']);
    const lstat = stub().resolves({
        isDirectory: stub().returns(true),
    });
    
    const options = {};
    
    await getFiles(['**/get-files*.js'], options, {
        lstat,
        getSupportedGlob,
        fastGlob,
    });
    
    t.calledWith(getSupportedGlob, ['get-files']);
    t.end();
});

test('putout: getFiles: getSupportedGlob: result', async (t) => {
    const lstat = stub().resolves({
        isDirectory: stub().returns(true),
    });
    
    const getSupportedGlob = stub().returns('get-files/some-glob');
    const fastGlob = stub().resolves(['get-files']);
    
    const options = {};
    await getFiles(['**/get-files*.js'], options, {
        lstat,
        getSupportedGlob,
        fastGlob,
    });
    
    t.calledWith(fastGlob, ['get-files/some-glob', {
        unique: true,
        dot: true,
    }]);
    t.end();
});

test('putout: getFiles: options', async (t) => {
    const lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const fastGlob = stub().returns([]);
    
    const ignore = ['*.js'];
    const options = {
        ignore,
    };
    
    await getFiles(['lib/get-files.js'], options, {
        fastGlob,
        lstat,
    });
    
    const expected = ['lib/get-files.js', {
        dot: true,
        onlyFiles: false,
        unique: true,
        ignore,
    }];
    
    t.calledWith(fastGlob, expected);
    t.end();
});

test('putout: getFiles: windows', async (t) => {
    const lstat = stub().returns({
        isDirectory: stub().returns(false),
    });
    
    const fastGlob = stub().returns([]);
    
    const ignore = ['*.js'];
    const options = {
        ignore,
    };
    
    await getFiles(['lib\\get-files.js'], options, {
        fastGlob,
        lstat,
    });
    
    const expected = ['lib/get-files.js', {
        dot: true,
        onlyFiles: false,
        unique: true,
        ignore,
    }];
    
    t.calledWith(fastGlob, expected);
    t.end();
});
