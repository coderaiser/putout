'use strict';

const {test, stub} = require('supertape');
const {
    renameFile,
    removeFile,
    createDirectory,
} = require('./filesystem');

test('putout: cli: filesystem: renameFile', (t) => {
    const renameSync = stub();
    
    renameFile('/hello/world', '/hello/hello', {
        renameSync,
    });
    
    const expected = [
        '/hello/world',
        '/hello/hello',
    ];
    
    t.calledWith(renameSync, expected);
    t.end();
});

test('putout: cli: filesystem: removeFile', (t) => {
    const rmSync = stub();
    
    removeFile('/hello/world', {
        rmSync,
    });
    
    const expected = [
        '/hello/world',
    ];
    
    t.calledWith(rmSync, expected);
    t.end();
});

test('putout: cli: filesystem: createDirectory', (t) => {
    const mkdirSync = stub();
    
    createDirectory('/hello/world', {
        mkdirSync,
    });
    
    const expected = [
        '/hello/world',
    ];
    
    t.calledWith(mkdirSync, expected);
    t.end();
});
