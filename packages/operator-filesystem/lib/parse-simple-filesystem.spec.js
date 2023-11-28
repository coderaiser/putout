'use strict';

const {test} = require('./extend.test');
const {parseSimpleFilesystem} = require('./parse-simple-filesystem.test');

test('putout: operator: filesystem: parseFileSystem', (t) => {
    const result = parseSimpleFilesystem([
        '/hello/world/abc/',
        '/hello/world/abc/xyz/',
        '/hello/world/abc/xyz/README.md',
        '/hello/world/abc/README.md',
    ]);
    
    const expected = {
        filename: '/hello/world/abc',
        files: [{
            filename: '/hello/world/abc/xyz',
            files: [{
                filename: '/hello/world/abc/xyz/README.md',
                type: 'file',
            }],
            type: 'directory',
        }, {
            filename: '/hello/world/abc/README.md',
            type: 'file',
        }],
        type: 'directory',
    };
    
    t.filesystem(result, expected);
    t.end();
});

test('putout: operator: filesystem: parseFileSystem: content', (t) => {
    const result = parseSimpleFilesystem([
        '/hello/world/abc/',
        '/hello/world/abc/xyz/',
        [
            '/hello/world/abc/xyz/README.md',
            'hello world',
        ],
        '/hello/world/abc/README.md',
    ]);
    
    const expected = {
        filename: '/hello/world/abc',
        files: [{
            filename: '/hello/world/abc/xyz',
            files: [{
                filename: '/hello/world/abc/xyz/README.md',
                type: 'file',
                content: 'hello world',
            }],
            type: 'directory',
        }, {
            filename: '/hello/world/abc/README.md',
            type: 'file',
        }],
        type: 'directory',
    };
    
    t.filesystem(result, expected);
    t.end();
});

test('putout: operator: filesystem: parseFileSystem: slash', (t) => {
    const result = parseSimpleFilesystem(['/']);
    
    const expected = {
        filename: '/',
        type: 'directory',
        files: [],
    };
    
    t.filesystem(result, expected);
    t.end();
});
