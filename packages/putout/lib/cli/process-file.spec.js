'use strict';

const test = require('supertape');
const mockRequire = require('mock-require');
const stub = require('@cloudcmd/stub');

const {reRequire, stopAll} = mockRequire;

test('putout: cli: process-file: eslint', async (t) => {
    const eslint = stub().returns(['', []]);
    
    const source = 'log123("hello")';
    const fix = false;
    const name = 'example.js';
    const log = stub();
    const write = stub();
    
    mockRequire('./eslint', eslint);
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = {
        code: source,
        fix,
        name,
    };
    
    t.ok(eslint.calledWith(expected), 'should call eslint');
    t.end();
});

test('putout: cli: process-file: ts from preProcessor', async (t) => {
    const eslint = stub().returns(['', []]);
    
    const source = 'const x: number = 3';
    const fix = false;
    const name = 'example.md{ts}';
    const log = stub();
    const write = stub();
    
    mockRequire('./eslint', eslint);
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = {
        code: source,
        fix,
        name,
    };
    
    t.ok(eslint.calledWith(expected), 'should call eslint');
    t.end();
});

