'use strict';

const {constants} = require('fs');
const {test, stub} = require('supertape');
const {
    renameFile,
    removeFile,
    createDirectory,
    readFileContent,
    readFileOptions,
    writeFileContent,
    copyFile,
} = require('./filesystem');

const {COPYFILE_FICLONE} = constants;

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

test('putout: cli: filesystem: copyFile', (t) => {
    const copyFileSync = stub();
    
    copyFile('/hello/world', '/hello/hello', {
        copyFileSync,
    });
    
    const expected = [
        '/hello/world',
        '/hello/hello',
        COPYFILE_FICLONE,
    ];
    
    t.calledWith(copyFileSync, expected);
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
    
    const expected = ['/hello/world', {
        recursive: true,
    }];
    
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
    const mkdirSync = stub();
    
    writeFileContent('/hello/world', 'hello', {
        writeFileSync,
        mkdirSync,
    });
    
    const expected = [
        '/hello/world',
        'hello',
    ];
    
    t.calledWith(writeFileSync, expected);
    t.end();
});

test('putout: cli: filesystem: writeFileContent: mkdirSync', (t) => {
    const writeFileSync = stub();
    const mkdirSync = stub();
    
    writeFileContent('/hello/world', 'hello', {
        writeFileSync,
        mkdirSync,
    });
    
    const expected = ['/hello', {
        recursive: true,
    }];
    
    t.calledWith(mkdirSync, expected);
    t.end();
});

test('putout: cli: filesystem: readFileOptions', (t) => {
    const parseOptions = stub();
    const options = {};
    
    readFileOptions('/hello.js', options, {
        parseOptions,
    });
    
    const expected = [{
        name: '/hello.js',
        options: {},
    }];
    
    t.calledWith(parseOptions, expected);
    t.end();
});
