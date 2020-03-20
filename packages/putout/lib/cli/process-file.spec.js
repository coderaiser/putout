'use strict';

const fs = require('fs');
const {join} = require('path');

const test = require('supertape');
const mockRequire = require('mock-require');
const stub = require('@cloudcmd/stub');

const {reRequire, stopAll} = mockRequire;
const {cwd} = process;

test('putout: cli: process-file: get formatter', (t) => {
    const formatter = stub();
    mockRequire('putout-formatter-xxx', formatter);
    
    const {_getFormatter} = reRequire('./process-file');
    const result = _getFormatter('xxx', stub());
    
    stopAll();
    
    t.equal(result, formatter);
    t.end();
});

test('putout: cli: process-file: get formatter: exit', (t) => {
    const exit = stub();
    
    const {_getFormatter} = reRequire('./process-file');
    _getFormatter('xxx', exit);
    
    t.ok(exit.called);
    t.end();
});

test('putout: cli: process-file: eslint', (t) => {
    const eslint = stub().returns(['', []]);
    const {readFileSync} = fs;
    
    const code = 'log123("hello")';
    const fix = false;
    const name = 'example.js';
    const log = stub();
    const ruler = {};
    const write = stub();
    const fileCache = {
        canUseCache: stub().returns(false),
        setInfo: stub(),
    };
    
    mockRequire('../eslint', eslint);
    fs.readFileSync = (name, options) => {
        if (name === 'example.js')
            return code;
        
        return readFileSync(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.readFileSync = readFileSync;
    
    const expected = {
        code,
        fix,
        name,
    };
    
    t.ok(eslint.calledWith(expected), 'should call eslint');
    t.end();
});

test('putout: cli: process-file: fileCache.removeEntry', (t) => {
    const eslint = stub().returns(['', []]);
    const {
        readFileSync,
        writeFileSync,
    } = fs;
    
    const code = 'var x = 5';
    const fix = true;
    const name = 'example.js';
    const log = stub();
    const ruler = {};
    const write = stub();
    const fileCache = {
        canUseCache: stub().returns(false),
        removeEntry: stub(),
        setInfo: stub(),
    };
    
    mockRequire('../eslint', eslint);
    
    fs.writeFileSync = stub();
    fs.readFileSync = (name, options) => {
        if (name === 'example.js')
            return code;
        
        return readFileSync(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.readFileSync = readFileSync;
    fs.writeFileSync = writeFileSync;
    
    const expected = join(cwd(), name);
    
    t.ok(fileCache.removeEntry.calledWith(expected), 'should call fileCache.removeEntry');
    t.end();
});

test('putout: cli: process-file: writeFileSync', (t) => {
    const eslint = stub().returns(['', []]);
    const {
        readFileSync,
        writeFileSync,
    } = fs;
    
    const code = 'var x = 5';
    const fix = true;
    const name = 'example.js';
    const log = stub();
    const ruler = {};
    const write = stub();
    const writeFileSyncStub = stub();
    const fileCache = {
        canUseCache: stub().returns(false),
        removeEntry: stub(),
        setInfo: stub(),
    };
    
    mockRequire('../eslint', eslint);
    
    fs.writeFileSync = writeFileSyncStub;
    fs.readFileSync = (name, options) => {
        if (name === 'example.js')
            return code;
        
        return readFileSync(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.readFileSync = readFileSync;
    fs.writeFileSync = writeFileSync;
    
    const result = '';
    
    t.ok(writeFileSyncStub.calledWith(name, result), 'should call writeFileSync');
    t.end();
});

test('putout: cli: process-file: cache', (t) => {
    const eslint = stub().returns(['', []]);
    const {
        readFileSync,
        writeFileSync,
    } = fs;
    
    const code = 'var x = 5';
    const fix = true;
    const name = 'example.js';
    const log = stub();
    const ruler = {};
    const write = stub();
    const writeFileSyncStub = stub();
    const fileCache = {
        canUseCache: stub().returns(true),
        removeEntry: stub(),
        setInfo: stub(),
        getPlaces: stub().returns([]),
    };
    
    mockRequire('../eslint', eslint);
    
    fs.writeFileSync = writeFileSyncStub;
    fs.readFileSync = (name, options) => {
        if (name === 'example.js')
            return code;
        
        return readFileSync(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.readFileSync = readFileSync;
    fs.writeFileSync = writeFileSync;
    
    const expected = join(cwd(), name);
    
    t.ok(fileCache.getPlaces.calledWith(expected), 'should call fileCache.getPlaces');
    t.end();
});

