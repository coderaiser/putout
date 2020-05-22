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

test('putout: cli: process-file: eslint', async (t) => {
    const eslint = stub().returns(['', []]);
    const {readFile} = fs.promises;
    
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
    
    mockRequire('./eslint', eslint);
    fs.promises.readFile = async (name, options) => {
        if (name === 'example.js')
            return code;
        
        return await readFile(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    await fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.promises.readFile = readFile;
    
    const expected = {
        code,
        fix,
        name,
    };
    
    t.ok(eslint.calledWith(expected), 'should call eslint');
    t.end();
});

test('putout: cli: process-file: fileCache.removeEntry', async (t) => {
    const eslint = stub().returns(['', []]);
    const {
        readFile,
        writeFile,
    } = fs.promises;
    
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
    
    mockRequire('./eslint', eslint);
    
    fs.promises.writeFile = stub();
    fs.promises.readFile = async (name, options) => {
        if (name === 'example.js')
            return code;
        
        return await readFile(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    await fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.promises.readFile = readFile;
    fs.promises.writeFile = writeFile;
    
    const expected = join(cwd(), name);
    
    t.ok(fileCache.removeEntry.calledWith(expected), 'should call fileCache.removeEntry');
    t.end();
});

test('putout: cli: process-file: writeFile', async (t) => {
    const eslint = stub().returns(['', []]);
    const {
        readFile,
        writeFile,
    } = fs.promises;
    
    const code = 'var x = 5';
    const fix = true;
    const name = 'example.js';
    const log = stub();
    const ruler = {};
    const write = stub();
    const writeFileStub = stub();
    const fileCache = {
        canUseCache: stub().returns(false),
        removeEntry: stub(),
        setInfo: stub(),
    };
    
    mockRequire('./eslint', eslint);
    
    fs.promises.writeFile = writeFileStub;
    fs.promises.readFile = async (name, options) => {
        if (name === 'example.js')
            return code;
        
        return await readFile(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    await fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.promises.readFile = readFile;
    fs.promises.writeFile = writeFile;
    
    const result = '';
    
    t.ok(writeFileStub.calledWith(name, result), 'should call writeFile');
    t.end();
});

test('putout: cli: process-file: cache', async (t) => {
    const eslint = stub().returns(['', []]);
    const {
        readFile,
        writeFile,
    } = fs.promises;
    
    const code = 'var x = 5';
    const fix = true;
    const name = 'example.js';
    const log = stub();
    const ruler = {};
    const write = stub();
    const writeFileStub = stub();
    const fileCache = {
        canUseCache: stub().returns(true),
        removeEntry: stub(),
        setInfo: stub(),
        getPlaces: stub().returns([]),
    };
    
    mockRequire('./eslint', eslint);
    
    fs.promises.writeFile = writeFileStub;
    fs.promises.readFile = async (name, options) => {
        if (name === 'example.js')
            return code;
        
        return await readFile(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    await fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.promises.readFile = readFile;
    fs.promises.writeFile = writeFile;
    
    const expected = join(cwd(), name);
    
    t.ok(fileCache.getPlaces.calledWith(expected), 'should call fileCache.getPlaces');
    t.end();
});

test('putout: cli: process-file: parse error', async (t) => {
    const {readFile} = fs.promises;
    
    const code = 'var x = 5;';
    const fix = false;
    const name = 'example.js';
    const log = stub();
    const ruler = {};
    const write = stub();
    const exit = stub();
    const fileCache = {
        canUseCache: stub().returns(false),
        removeEntry: stub(),
        setInfo: stub(),
        getPlaces: stub().returns([]),
    };
    
    const formatter = stub();
    const putout = () => {
        throw Error('hi');
    };
    
    putout.ignores = stub();
    
    mockRequire('@putout/formatter-dump', formatter);
    mockRequire('../putout', putout);
    
    fs.promises.readFile = async (name, options) => {
        if (name === 'example.js')
            return code;
        
        return await readFile(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
        formatter,
        exit,
    });
    
    await fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.readFile = readFile;
    
    const expected = {
        count: 1,
        errorsCount: 1,
        filesCount: 1,
        index: 0,
        name: join(cwd(), name),
        places: [{
            message: 'hi',
            position: {
                column: 15,
                line: 263,
            },
            rule: 'crash/parser',
        },
        ],
        source: 'var x = 5;',
    };
    
    t.ok(formatter.calledWith(expected), 'should call formatter');
    t.end();
});

test('putout: cli: process-file: parser error: eslint', async (t) => {
    const eslint = stub().returns(['', [{
        rule: 'eslint/null',
        message: 'Parsing error: Unexpected token ?',
        position: {line: 331, column: 34},
    }]]);
    
    const {
        readFile,
        writeFile,
    } = fs.promises;
    
    const code = 'var x = 5';
    const fix = true;
    const log = stub();
    const ruler = {};
    const write = stub();
    const writeFileStub = stub();
    const fileCache = {
        canUseCache: stub().returns(false),
        removeEntry: stub(),
        setInfo: stub(),
        getPlaces: stub().returns([]),
    };
    
    mockRequire('./eslint', eslint);
    
    fs.promises.writeFile = writeFileStub;
    fs.promises.readFile = async (name, options) => {
        if (name === 'example.js')
            return code;
        
        return await readFile(name, options);
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        ruler,
        write,
        fileCache,
    });
    
    await fn('example.js', 0, {
        length: 1,
    });
    
    stopAll();
    fs.promises.readFile = readFile;
    fs.promises.writeFile = writeFile;
    
    t.notOk(fileCache.setInfo.called, 'should not call fileCache.setInfo');
    t.end();
});
