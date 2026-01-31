import {tryCatch} from 'try-catch';
import montag from 'montag';
import {stub} from 'supertape';
import {__filesystem_name} from '@putout/operator-json';
import {
    parse,
    print,
    operator,
} from 'putout';
import {
    test,
    printFilesystem,
    parseFilesystem,
    formatFilesystem,
} from '@putout/test/filesystem';
import * as maybeFS from './maybe-fs.js';
import {
    crawlDirectory,
    getFile,
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
    createNestedDirectory,
    removeEmptyDirectory,
    readDirectory,
    getParentDirectory,
    getRootDirectory,
    readFileContent,
    writeFileContent,
    init,
    deinit,
    start,
    pause,
} from './filesystem.js';

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

test('putout: operator: filesystem: renameFile: no name', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/lib/lint/json.js",
            "files": []
        });
    `);
    
    const [filenamePath] = traverseProperties(ast, 'filename');
    const filePath = filenamePath.parentPath;
    
    const [error] = tryCatch(renameFile, filePath);
    const expected = `☝️ Looks like you forget to pass the 'name' of a file to 'renameFile(filePath: FilePath, name: string)'`;
    
    t.equal(error.message, expected);
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

test('putout: operator: filesystem: crawlDirectory', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello",
            "files": []
        });
    `);
    
    const crawled = crawlDirectory(ast);
    const [filePath] = findFile(ast, '/hello', {
        crawled,
    });
    
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

test('putout: operator: filesystem: findFile: match', (t) => {
    const ast = parseFilesystem(['/', '/package.json', '/e.json']);
    
    const [filePath] = findFile(ast, 'e.json');
    const name = getFilename(filePath);
    
    t.equal(name, '/e.json');
    t.end();
});

test('putout: operator: filesystem: findFile: exclude', (t) => {
    const ast = parseFilesystem([
        '/',
        '/hello/',
        '/hello/world.txt',
        '/hello/hello.txt',
    ]);
    
    findFile(ast, '*.txt', ['hello.txt']).map(removeFile);
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/hello',
            files: [{
                type: 'file',
                filename: '/hello/hello.txt',
            }],
        }],
    };
    
    t.equalFilesystems(ast, expected);
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
    const ast = parseFilesystem(['/', '/hello.swp']);
    
    const [filePath] = findFile(ast, '*.swp');
    
    removeFile(filePath);
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}({
            "type": "directory",
            "filename": "/",
            "files": []
        });
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

test('putout: operator: filesystem: removeFile: root', (t) => {
    const ast = parse(montag`
        ${FS}({
            "type": "directory",
            "filename": "/lib/lint/json/",
            "files": []
        });
    `);
    
    const [filePath] = findFile(ast, 'json');
    removeFile(filePath);
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}({
            "type": "directory",
            "filename": "/lib/lint/json/",
            "files": []
        });
    `;
    
    t.equal(result, expected);
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
        ${FS}({
            "type": "directory",
            "filename": "/lib/lint/json.js",
            "files": []
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: removeEmptyDirectory', (t) => {
    const ast = parseFilesystem([
        '/',
        '/hello/',
        '/hello/world/',
        '/hello/world/package/',
    ]);
    
    const [filePath] = findFile(ast, 'package');
    removeEmptyDirectory(filePath);
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}({
            "type": "directory",
            "filename": "/",
            "files": []
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: removeEmptyDirectory: root', (t) => {
    const ast = parseFilesystem([
        '/hello/world/package/',
    ]);
    
    const [filePath] = findFile(ast, 'package');
    removeEmptyDirectory(filePath);
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}({
            "type": "directory",
            "filename": "/hello/world/package",
            "files": []
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: filesystem: removeEmptyDirectory: file', (t) => {
    const ast = parseFilesystem([
        '/',
        '/hello/',
        '/hello/world/',
        '/hello/world/package.json',
    ]);
    
    const [filePath] = findFile(ast, 'package.json');
    removeEmptyDirectory(filePath);
    
    const result = print(ast, {
        printer: PRINTER,
    });
    
    const expected = montag`
        ${FS}({
            "type": "directory",
            "filename": "/",
            "files": [{
                "type": "directory",
                "filename": "/hello",
                "files": [{
                    "type": "directory",
                    "filename": "/hello/world",
                    "files": [{
                        "type": "file",
                        "filename": "/hello/world/package.json"
                    }]
                }]
            }]
        });
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

test('putout: operator: filesystem: createDirectory: exists', (t) => {
    const ast = parseFilesystem(['/', '/fixture/', '/fixture/hello.txt']);
    
    const [dirPath] = findFile(ast, '/');
    createDirectory(dirPath, 'fixture');
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/fixture',
            files: [{
                type: 'file',
                filename: '/fixture/hello.txt',
            }],
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: createDirectory: exists file', (t) => {
    const ast = parseFilesystem(['/', '/fixture']);
    
    const [dirPath] = findFile(ast, '/');
    
    const directoryFixture = createDirectory(dirPath, 'fixture');
    createFile(directoryFixture, 'hello.txt');
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/fixture',
            files: [{
                type: 'file',
                filename: '/fixture/hello.txt',
            }],
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: createNestedDirectory: beyond root', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [],
    });
    
    const [dirPath] = findFile(ast, 'world');
    createNestedDirectory(dirPath, '/1/2/3/4/hello/world');
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'directory',
            filename: '/hello/world/1',
            files: [{
                type: 'directory',
                filename: '/hello/world/1/2',
                files: [{
                    type: 'directory',
                    filename: '/hello/world/1/2/3',
                    files: [{
                        type: 'directory',
                        filename: '/hello/world/1/2/3/4',
                        files: [{
                            type: 'directory',
                            filename: '/hello/world/1/2/3/4/hello',
                            files: [{
                                type: 'directory',
                                filename: '/hello/world/1/2/3/4/hello/world',
                                files: [],
                            }],
                        }],
                    }],
                }],
            }],
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: createNestedDirectory: find root', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/hello',
            files: [{
                type: 'directory',
                filename: '/hello/world',
                files: [],
            }],
        }],
    });
    
    const [dirPath] = findFile(ast, '/hello/world');
    createNestedDirectory(dirPath, '/hello/world/abc');
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/hello',
            files: [{
                type: 'directory',
                filename: '/hello/world',
                files: [{
                    type: 'directory',
                    filename: '/hello/world/abc',
                    files: [],
                }],
            }],
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: createNestedDirectory: other nesting', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/hello',
            files: [{
                type: 'directory',
                filename: '/hello/x',
                files: [],
            }],
        }],
    });
    
    const [dirPath] = findFile(ast, '/hello/x');
    
    createNestedDirectory(dirPath, '/hello/world/abc');
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/hello',
            files: [{
                type: 'directory',
                filename: '/hello/x',
                files: [],
            }, {
                type: 'directory',
                filename: '/hello/world',
                files: [{
                    type: 'directory',
                    filename: '/hello/world/abc',
                    files: [],
                }],
            }],
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
    const result = getParentDirectory(dirPath);
    
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
    const parentdirPath = getParentDirectory(dirPath);
    const filename = getFilename(parentdirPath);
    
    t.equal(filename, '/hello/world');
    t.end();
});

test('putout: operator: filesystem: getParentDirectory: no parentPath', (t) => {
    const dirPath = {};
    const parentdirPath = getParentDirectory(dirPath);
    
    t.notOk(parentdirPath);
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

test('putout: operator: filesystem: readFileContent: malformed', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: btoa('a%AFc'),
        }],
    });
    
    const [filePath] = findFile(ast, 'README.md');
    readFileContent(filePath);
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: 'YSVBRmM=',
        }],
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

test('putout: operator: filesystem: readFileContent: no content: should create', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    init({
        readFileContent: stub().returns('hello'),
    });
    
    const [filePath] = findFile(ast, 'README.md');
    readFileContent(filePath);
    
    deinit();
    
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

test('putout: operator: filesystem: readFileContent: no content: should create: emoji', (t) => {
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
        }],
    });
    
    init({
        readFileContent: stub().returns('🐸'),
    });
    
    const [filePath] = findFile(ast, 'README.md');
    readFileContent(filePath);
    
    deinit();
    
    const expected = {
        type: 'directory',
        filename: '/hello/world',
        files: [{
            type: 'file',
            filename: '/hello/world/README.md',
            content: 'K0YwKzlGKzkwK0I4',
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: readFileContent: literal', (t) => {
    const content = `export default 5\n`;
    const ast = parseFilesystem([
        '/',
        ['/a.js', content],
    ]);
    
    const [filePath] = findFile(ast, 'a.js');
    const result = readFileContent(filePath);
    
    t.equal(result, content);
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

test('putout: operator: filesystem: createFile: overwrite', (t) => {
    const ast = parseFilesystem(['/', '/doc/', '/doc/README.md']);
    
    const [dirPath] = findFile(ast, '/');
    createFile(dirPath, 'README.md', 'hello');
    
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/doc',
            files: [{
                type: 'file',
                filename: '/doc/README.md',
            }],
        }, {
            type: 'file',
            filename: '/README.md',
            content: 'aGVsbG8=',
        }],
    };
    
    t.equalFilesystems(ast, expected);
    t.end();
});

test('putout: operator: filesystem: createFile: not a directory', (t) => {
    const ast = parseFilesystem(['/', '/doc/', '/doc/README.md']);
    
    const [dirPath] = findFile(ast, 'README.md');
    const [error] = tryCatch(createFile, dirPath, 'README.md', 'hello');
    const expected = `☝️ Looks like '/doc/README.md' is not a directory, but: 'file'. Rename to '/doc/README.md/'`;
    
    t.equal(error.message, expected);
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

test('putout: operator: filesystem: readFileContent twice: escape', (t) => {
    const content = `return url.replace(/#/g, '%23');`;
    const ast = parseFilesystem({
        type: 'directory',
        filename: '/hello',
        files: [{
            type: 'file',
            filename: '/hello/world.js',
        }],
    });
    
    init({
        readFileContent: stub().returns(content),
    });
    const [filePath] = findFile(ast, 'world.js');
    
    readFileContent(filePath);
    
    const result = readFileContent(filePath);
    
    t.equal(result, content);
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
    const expected = [true, btoa('hello+20+F0+9F+92+BE+0A')];
    
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

test('putout: operator: filesystem: findFile: couple', (t) => {
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

test('putout: operator: filesystem: readDirectory: file', (t) => {
    const ast = parseFilesystem(['/hello/', '/hello/world/', '/hello/world.txt']);
    
    const [helloDir] = findFile(ast, '/hello/world.txt');
    const files = readDirectory(helloDir).map(getFilename);
    
    const expected = [];
    
    t.deepEqual(files, expected);
    t.end();
});

test('putout: operator: filesystem: readDirectory', (t) => {
    const ast = parseFilesystem([
        '/hello/',
        '/hello/world/',
        '/hello/world/abc',
        '/hello/world.txt',
    ]);
    
    const [helloDir] = findFile(ast, '/hello');
    const files = readDirectory(helloDir).map(getFilename);
    
    const expected = [
        '/hello/world',
        '/hello/world.txt',
    ];
    
    t.deepEqual(files, expected);
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

test('putout: operator: filesystem: getRootDirectory', (t) => {
    const ast = parseFilesystem(['/hello/world/', '/hello/world/package.json']);
    
    const [filePath] = findFile(ast, 'package.json');
    const rootDirectoryPath = getRootDirectory(filePath);
    const filename = getFilename(rootDirectoryPath);
    
    const expected = '/hello/world';
    
    t.equal(filename, expected);
    t.end();
});

test('putout: operator: filesystem: getFile', (t) => {
    const ast = parseFilesystem(['/', '/package.json']);
    const root = getRootDirectory(ast);
    const [file] = getFile(root, 'package.json');
    const filename = getFilename(file);
    
    const expected = '/package.json';
    
    t.equal(filename, expected);
    t.end();
});

test('putout: operator: filesystem: getFile: couple', (t) => {
    const ast = parseFilesystem(['/', '/index.spec.js', '/index.js']);
    const root = getRootDirectory(ast);
    
    const [file] = getFile(root, ['index.js', 'index.spec.js']);
    const filename = getFilename(file);
    
    const expected = '/index.js';
    
    t.equal(filename, expected);
    t.end();
});

test('putout: operator: filesystem: getFile: type', (t) => {
    const ast = parseFilesystem(['/', '/package.json']);
    
    const [root] = findFile(ast, '/');
    const [file] = getFile(root, 'package.json', {
        type: 'directory',
    });
    
    t.notOk(file);
    t.end();
});
