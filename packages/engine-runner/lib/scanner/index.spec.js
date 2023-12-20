'use strict';

const {once} = require('events');

const test = require('supertape');
const montag = require('montag');
const putout = require('putout');
const {createProgress} = require('../progress');

const {__filesystem_name} = require('@putout/operator-json');
const {findFile, createFile} = require('@putout/operator-filesystem');

const {runPlugins} = require('..');

test('putout: runner: scanner', (t) => {
    const addFile = {
        report: () => 'Add file',
        fix: (rootPath) => {
            createFile(rootPath, 'hello', 'world');
        },
        scan: (rootPath, {push}) => {
            const files = findFile(rootPath, 'hello');
            
            if (files.length)
                return;
            
            push(rootPath);
        },
    };
    
    const source = montag`
        ${__filesystem_name}({
            "type": "directory",
            "filename": "/",
            "files": [
            ]
        });
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [{
            'add-file': addFile,
        }],
    });
    
    const expected = montag`
        ${__filesystem_name}({
            "type": "directory",
            "filename": "/",
            "files": [{
                "type": "file",
                "filename": "/hello",
                "content": "d29ybGQ="
            }]
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: scanner: options', (t) => {
    const addFile = {
        report: () => 'Add file',
        fix: (rootPath) => {
            createFile(rootPath, 'hello.txt', 'world');
        },
        scan: (rootPath, {push, options}) => {
            const {name} = options;
            const [filePath] = findFile(rootPath, name);
            
            if (filePath)
                return;
            
            push(rootPath);
        },
    };
    
    const source = montag`
        ${__filesystem_name}({
            "type": "directory",
            "filename": "/",
            "files": [
            ]
        });
    `;
    
    const {code} = putout(source, {
        runPlugins,
        rules: {
            'add-file': ['on', {
                name: 'world.txt',
            }],
        },
        plugins: [
            ['add-file', addFile],
        ],
    });
    
    const expected = montag`
        ${__filesystem_name}({
            "type": "directory",
            "filename": "/",
            "files": [{
                "type": "file",
                "filename": "/hello.txt",
                "content": "d29ybGQ="
            }]
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: scanner: pathOptions', (t) => {
    const addFile = {
        report: (rootPath, {name}) => `Add file ${name}`,
        fix: (rootPath, {name}) => {
            createFile(rootPath, name, 'world');
        },
        scan: (rootPath, {push, options}) => {
            const {name} = options;
            const [filePath] = findFile(rootPath, name);
            
            if (filePath)
                return;
            
            push(rootPath, {
                name,
            });
        },
    };
    
    const source = montag`
        ${__filesystem_name}({
            "type": "directory",
            "filename": "/",
            "files": [
            ]
        });
    `;
    
    const {places} = putout(source, {
        runPlugins,
        rules: {
            'add-file': ['on', {
                name: 'world.txt',
            }],
        },
        plugins: [
            ['add-file', addFile],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: runner: scanner: simple', (t) => {
    const addFile = {
        report: () => 'Add file',
        fix: (rootPath) => {
            createFile(rootPath, 'hello', 'world');
        },
        scan: (rootPath, {push}) => {
            const files = findFile(rootPath, 'hello');
            
            if (files.length)
                return;
            
            push(rootPath);
        },
    };
    
    const source = montag`
        ${__filesystem_name}([
            "/"
        ]);
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [{
            'add-file': addFile,
        }],
    });
    
    const expected = montag`
        ${__filesystem_name}(["/", [
            "/hello",
            "d29ybGQ="
        ]]);\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: scanner: progress', async (t) => {
    const addFile = {
        report: () => 'Add file',
        fix: (rootPath) => {
            createFile(rootPath, 'hello', 'world');
        },
        scan: (rootPath, {push, progress}) => {
            const files = findFile(rootPath, 'hello');
            
            if (files.length)
                return;
            
            progress({
                i: 0,
                n: 1,
            });
            
            push(rootPath);
        },
    };
    
    const source = montag`
        ${__filesystem_name}([
            "/"
        ]);
    `;
    
    const progress = createProgress();
    
    const [[result]] = await Promise.all([
        once(progress, 'file'),
        putout(source, {
            runPlugins,
            progress,
            plugins: [{
                'add-file': addFile,
            }],
        }),
    ]);
    
    const expected = {
        i: 0,
        n: 1,
        rule: 'add-file',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: scanner: trailing slash', (t) => {
    const addFile = {
        report: () => 'Add file',
        fix: (rootPath) => {
            createFile(rootPath, 'hello', 'world');
        },
        scan: (rootPath, {push}) => {
            const files = findFile(rootPath, 'hello');
            
            if (files.length)
                return;
            
            push(rootPath);
        },
    };
    
    const source = montag`
        ${__filesystem_name}([
            '/',
            '/hello.txt',
            [
                '/world.txt',
                'hello world',
            ],
            '/abc/',
        ]);
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [{
            'add-file': addFile,
        }],
    });
    
    const expected = montag`
        ${__filesystem_name}([
            "/",
            "/hello.txt",
            [
                "/world.txt",
                "hello world"
            ],
            "/abc/",
            [
                "/hello",
                "d29ybGQ="
            ]
        ]);\n
    `;
    
    t.equal(code, expected);
    t.end();
});
