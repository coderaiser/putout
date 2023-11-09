'use strict';

const montag = require('montag');
const {test, stub} = require('supertape');
const {
    parse,
    print,
    operator,
} = require('putout');

const {
    renameFile,
    removeFile,
    findFile,
    getFilename,
    init,
    deinit,
} = require('./filesystem');

const {traverseProperties} = operator;

const FS = '__putout_processor_filesystem';
const PRINTER = ['putout', {
    format: {
        quote: '"',
        endOfFile: '',
    },
    semantics: {
        trailingComma: false,
    },
}];

test('putout: operator: filesystem: renameFile', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/lib/lint/json.js",
            "files": []
        });
    `);
    
    const [filenamePath] = traverseProperties(ast, 'filename');
    const filePath = filenamePath.parentPath;
    
    renameFile(filePath, 'hello.js');
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}({
            "type": "directory",
            "filename": "/lib/lint/hello.js",
            "files": []
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: findFile', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello",
            "files": []
        });
    `);
    
    const [filePath] = findFile(ast, '/hello');
    renameFile(filePath, 'world');
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}({
            "type": "directory",
            "filename": "/world",
            "files": []
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: findFile: glob', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello.swp",
            "files": []
        });
    `);
    
    const [filePath] = findFile(ast, '*.swp');
    removeFile(filePath);
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}();
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: findFile: /', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello/world/abc",
            "files": []
        });
    `);
    
    const [filePath] = findFile(ast, 'abc');
    renameFile(filePath, 'hello');
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello/world/hello",
            "files": []
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: rename: maybeFS', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello/world/abc",
            "files": []
        });
    `);
    
    const maybeFS = {
        renameFile: stub(),
    };
    
    init(maybeFS);
    
    const [filePath] = findFile(ast, 'abc');
    renameFile(filePath, 'hello');
    
    deinit();
    
    const expected = [
        '/hello/world/abc',
        '/hello/world/hello',
    ];
    
    t.calledWith(maybeFS.renameFile, expected);
    t.end();
});

test('putout: operator: filesystem: removeFile', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/lib/lint/json.js",
            "files": []
        });
    `);
    
    const [filePath] = findFile(ast, 'json.js');
    removeFile(filePath);
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}();
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: getFilename', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello/world/abc",
            "files": []
        });
    `);
    
    const [filePath] = findFile(ast, 'abc');
    const name = getFilename(filePath);
    
    const expected = '/hello/world/abc';
    
    t.equal(name, expected);
    t.end();
});