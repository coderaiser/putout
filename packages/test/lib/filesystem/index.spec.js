import {findFile, removeFile} from '@putout/operator-filesystem';
import {
    test,
    parseFilesystem,
} from './index.js';

test('@putout/test: filesystem: equalFilesystems', (t) => {
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
