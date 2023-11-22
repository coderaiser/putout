'use strict';

const {test, stub} = require('supertape');
const {
    renameFile,
    removeFile,
    createDirectory,
    readFileContent,
    writeFileContent,
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
    
    const expected = ['/hello/world', {
        recursive: true,
    }];
    
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

test('putout: cli: filesystem: readFileContent', (t) => {
    const readFileSync = stub();
    
    readFileContent('/hello/world', {
        readFileSync,
    });
    
    const expected = [
        '/hello/world',
        'utf8',
    ];
    
    t.calledWith(readFileSync, expected);
    t.end();
});

test('putout: cli: filesystem: readFileContent: returns', (t) => {
    const readFileSync = stub().returns('hello');
    
    const result = readFileContent('/hello/world', {
        readFileSync,
    });
    
    t.equal(result, 'hello');
    t.end();
});

test('putout: cli: filesystem: writeFileContent', (t) => {
    const writeFileSync = stub();
    
    writeFileContent('/hello/world', 'hello', {
        writeFileSync,
    });
    
    const expected = [
        '/hello/world',
        'hello',
    ];
    
    t.calledWith(writeFileSync, expected);
    t.end();
});
