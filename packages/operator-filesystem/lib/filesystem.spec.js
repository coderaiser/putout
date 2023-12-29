'use strict';

const tryCatch = require('try-catch');
const montag = require('montag');
const {stub} = require('supertape');
const {__filesystem_name} = require('@putout/operator-json');
const maybeFS = require('./maybe-fs');

const {
    parse,
    print,
    operator,
} = require('putout');

const {
    renameFile,
    removeFile,
    copyFile,
    moveFile,
    findFile,
    getFilename,
    getFileType,
    getFileContent,
    createFile,
    createDirectory,
    getParentDirectory,
    readFileContent,
    readFileOptions,
    writeFileContent,
    init,
    deinit,
    start,
    pause,
} = require('./filesystem');

const {
    test,
    printFilesystem,
    parseFilesystem,
    formatFilesystem,
} = require('./extend.test');

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
        ${__filesystem_name}({
            "type": "directory",
            "filename": "/lib/lint/hello.js",
            "files": []
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: renameFile: slash', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/lib/lint/json.js",
            "files": []
        });
    `);
    
    const [filenamePath] = traverseProperties(ast, 'filename');
    const filePath = filenamePath.parentPath;
    
    renameFile(filePath, '/hello/world/abc/hello.js');
    
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

test('putout: operator: filesystem: findFile: no names', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello",
            "files": []
        });
    `);
    
    const [error] = tryCatch(findFile, ast);
    
    t.equal(error.message, `☝️ Looks like you forget to pass the 'name' of a file to 'findFile(filePath: Path|FilePath, name: string | string[]): FilePath'`);
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

test('putout: operator: filesystem: getFileType', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello/world/abc",
            "files": []
        });
    `);
    
    const [filePath] = findFile(ast, 'abc');
    const type = getFileType(filePath);
    
    const expected = 'directory';
    
    t.equal(type, expected);
    t.end();
});

test('putout: operator: filesystem: getFileContent', (t) => {
    const ast = parseFilesystem(['/', [
        '/hello.txt',
        'hello world',
    ]]);
    
    const [filePath] = findFile(ast, 'hello.txt');
    const content = getFileContent(filePath);
    const expected = [true, 'hello world'];
    
    t.deepEqual(content, expected);
    t.end();
});

test('putout: operator: filesystem: moveFile', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [{
                type: 'file',
                filename: '/hello/world/abc/xyz/README.md',
            }],
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    const [dirPath] = findFile(ast, 'abc');
    
    moveFile(filePath, dirPath);
    
    const result = printFilesystem(ast);
    const expected = formatFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [],
        }, {
            type: 'file',
            filename: '/hello/world/abc/README.md',
        }],
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: moveFile: overwrite', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'file',
            filename: '/hello/world/abc/README.md',
        }, {
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [{
                type: 'file',
                filename: '/hello/world/abc/xyz/README.md',
                content: 'hello world',
            }],
        }],
    });
    
    const [, filePath] = findFile(ast, 'README.md');
    const [dirPath] = findFile(ast, 'abc');
    
    moveFile(filePath, dirPath);
    
    const result = printFilesystem(ast);
    const expected = formatFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [],
        }, {
            type: 'file',
            filename: '/hello/world/abc/README.md',
            content: 'hello world',
        }],
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: copyFile', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [{
                type: 'file',
                filename: '/hello/world/abc/xyz/README.md',
                content: 'hello world',
            }],
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    const [dirPath] = findFile(ast, 'abc');
    
    copyFile(filePath, dirPath);
    
    const result = printFilesystem(ast);
    const expected = formatFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [{
                type: 'file',
                filename: '/hello/world/abc/xyz/README.md',
                content: 'hello world',
            }],
        }, {
            type: 'file',
            filename: '/hello/world/abc/README.md',
            content: 'hello world',
        }],
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: copyFile: overwrite', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [{
                type: 'file',
                filename: '/hello/world/abc/xyz/README.md',
                content: 'hello world',
            }],
        }, {
            type: 'file',
            filename: '/hello/world/abc/README.md',
            content: 'hello world',
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    const [dirPath] = findFile(ast, 'abc');
    
    copyFile(filePath, dirPath);
    
    const result = printFilesystem(ast);
    const expected = formatFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [{
                type: 'file',
                filename: '/hello/world/abc/xyz/README.md',
                content: 'hello world',
            }],
        }, {
            type: 'file',
            filename: '/hello/world/abc/README.md',
            content: 'hello world',
        }],
    });
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: moveFile: update filename', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [{
                type: 'file',
                filename: '/hello/world/abc/xyz/README.md',
            }],
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    const [dirPath] = findFile(ast, 'abc');
    
    moveFile(filePath, dirPath);
    
    const expected = {
        type: 'directory',
        filename: '/hello/world/abc',
        files: [{
            type: 'directory',
            filename: '/hello/world/abc/xyz',
            files: [],
        }, {
            type: 'file',
            filename: '/hello/world/abc/README.md',
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: createDirectory', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [],
    });
    
    const [dirPath] = findFile(ast, 'world');
    createDirectory(dirPath, 'xyz');
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'directory',
            filename: '/hello/world/xyz',
            files: [],
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: createDirectory: returns', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [],
    });
    
    const [dirPath] = findFile(ast, 'world');
    const newdirPath = createDirectory(dirPath, 'xyz');
    const filename = getFilename(newdirPath);
    
    t.equal(filename, '/hello/world/xyz');
    t.end();
});

test('putout: operator: filesystem: createDirectory: maybeFileSystem', (t) => {
    const maybeFS = {
        createDirectory: stub(),
    };
    
    init(maybeFS);
    
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [],
    });
    
    const [dirPath] = findFile(ast, 'world');
    
    createDirectory(dirPath, 'xyz');
    deinit();
    
    t.calledWith(maybeFS.createDirectory, ['/hello/world/xyz']);
    t.end();
});

test('putout: operator: filesystem: getParentDirectory: no parent', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [],
    });
    
    const [dirPath] = findFile(ast, 'world');
    const result = getParentDirectory(dirPath, 'xyz');
    
    t.notOk(result);
    t.end();
});

test('putout: operator: filesystem: getParentDirectory', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    const [dirPath] = findFile(ast, 'README.md');
    const parentdirPath = getParentDirectory(dirPath, 'xyz');
    const filename = getFilename(parentdirPath);
    
    t.equal(filename, '/hello/world');
    t.end();
});

test('putout: operator: filesystem: readFileContent: directory', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: 'hello',
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    const content = readFileContent(filePath);
    
    t.equal(content, 'hello');
    t.end();
});

test('putout: operator: filesystem: readFileContent', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [],
    });
    
    const [filePath] = findFile(ast, '/hello/world');
    readFileContent(filePath);
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: readFileContent: encoded', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: btoa('hello'),
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    const content = readFileContent(filePath);
    
    t.equal(content, 'hello');
    t.end();
});

test('putout: operator: filesystem: readFileContent: no content', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    const content = readFileContent(filePath);
    
    t.equal(content, '');
    t.end();
});

test('putout: operator: filesystem: readFileOptions', (t) => {
    const ast = parseFilesystem(['/', '/hello.js']);
    const [filePath] = findFile(ast, '/hello.js');
    const options = readFileOptions(filePath);
    const {__putout_file_options} = filePath;
    
    t.deepEqual(options, __putout_file_options);
    t.end();
});

test('putout: operator: filesystem: readFileOptions: options exists', (t) => {
    const ast = parseFilesystem(['/', '/hello.js']);
    const [filePath] = findFile(ast, '/hello.js');
    
    readFileOptions(filePath);
    const options = readFileOptions(filePath);
    const {__putout_file_options} = filePath;
    
    t.deepEqual(options, __putout_file_options);
    t.end();
});

test('putout: operator: filesystem: readFileOptions: overrides', (t) => {
    const ast = parseFilesystem(['/', '/hello.js']);
    
    const [filePath] = findFile(ast, '/hello.js');
    const options = readFileOptions(filePath, {
        ignore: [],
    });
    
    const expected = {
        ignore: [],
    };
    
    t.deepEqual(options, expected);
    t.end();
});

test('putout: operator: filesystem: createFile', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    const [dirPath] = findFile(ast, '/hello/world');
    const filePath = createFile(dirPath, 'README.md', 'hello');
    const content = readFileContent(filePath);
    
    t.equal(content, 'hello');
    t.end();
});

test('putout: operator: filesystem: createFile: /', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: '/README.md',
        }],
    });
    
    const [dirPath] = findFile(ast, '/');
    const filePath = createFile(dirPath, 'README.md', 'hello');
    const content = readFileContent(filePath);
    
    t.equal(content, 'hello');
    t.end();
});

test('putout: operator: filesystem: createFile: no content', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    const [dirPath] = findFile(ast, '/hello/world');
    const filePath = createFile(dirPath, 'README.md');
    const content = readFileContent(filePath);
    
    t.equal(content, '');
    t.end();
});

test('putout: operator: filesystem: createFile: ast', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    const [dirPath] = findFile(ast, '/hello/world');
    createFile(dirPath, 'README.md', '');
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: '',
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: createFile: ast: /', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: '/README.md',
        }],
    });
    
    const [dirPath] = findFile(ast, '/');
    createFile(dirPath, 'README.md', '');
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: '/README.md',
            content: '',
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: writeFileContent', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    writeFileContent(filePath, 'hello');
    const content = readFileContent(filePath);
    
    t.equal(content, 'hello');
    t.end();
});

test('putout: operator: filesystem: writeFileContent: emoji: content', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: 'x',
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    
    writeFileContent(filePath, 'hello 💾\n');
    const content = readFileContent(filePath);
    const expected = 'hello 💾\n';
    
    t.equal(content, expected);
    t.end();
});

test('putout: operator: filesystem: writeFileContent: emoji: getFileContent', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: 'x',
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    
    writeFileContent(filePath, 'hello 💾\n');
    const content = getFileContent(filePath);
    const expected = [true, 'hello 💾\n'];
    
    t.deepEqual(content, expected);
    t.end();
});

test('putout: operator: filesystem: writeFileContent: directory', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/',
        files: [],
    });
    
    const [filePath] = findFile(ast, '/');
    
    writeFileContent(filePath, 'hello');
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: writeFileContent: emoji', (t) => {
    const ast = parseFilesystem(['/hello/world/', '/hello/world/README.md']);
    
    const [filePath] = findFile(ast, 'README.md');
    writeFileContent(filePath, 'hello 🐊');
    const content = readFileContent(filePath);
    
    t.equal(content, 'hello 🐊');
    t.end();
});

test('putout: operator: filesystem: writeFileContent: field exists', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: '',
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    writeFileContent(filePath, 'hello');
    const content = readFileContent(filePath);
    
    t.equal(content, 'hello');
    t.end();
});

test('putout: operator: filesystem: writeFileContent: field exists: base64', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: '',
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    writeFileContent(filePath, 'hello');
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: 'aGVsbG8=',
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: getFile: couple', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/index.ts',
            content: '',
        }, {
            type: 'file',
            filename: '/hello/world/index.js',
            content: '',
        }],
    });
    
    const files = findFile(ast, ['*.js', '*.ts']);
    
    t.equal(files.length, 2);
    t.end();
});

test('putout: operator: filesystem: findFile: directory', (t) => {
    const ast = parseFilesystem(['/hello/', '/hello/world/', '/hello/world.txt']);
    const files = findFile(ast, ['/hello', '/hello/world']);
    
    t.equal(files.length, 2);
    t.end();
});

test('putout: operator: filesystem: moveFile: sameDirectory', (t) => {
    const ast = parseFilesystem(['/', '/hello/', '/hello/world.txt']);
    const [dirPath] = findFile(ast, '/');
    
    moveFile(dirPath, dirPath);
    
    const result = findFile(ast, '/');
    
    t.ok(result);
    t.end();
});

test('putout: operator: filesystem: start', (t) => {
    t.equal(start, maybeFS.start);
    t.end();
});

test('putout: operator: filesystem: pause', (t) => {
    t.equal(pause, maybeFS.pause);
    t.end();
});
