import {
    test,
    parseFilesystem,
} from '@putout/test/filesystem';
import {findFile, getFilename} from '@putout/operator-filesystem';
import {findFileUp} from './find-file-up.js';

test('putout: operator: filesystem: findFileUp', (t) => {
    const ast = parseFilesystem([
        '/',
        '/package.json',
        '/hello/',
        '/hello/world.js',
    ]);
    
    const [filePath] = findFile(ast, '*.js');
    const [, packageFile] = findFileUp(filePath, 'package.json');
    const filename = getFilename(packageFile);
    
    const expected = '/package.json';
    
    t.equal(filename, expected);
    t.end();
});

test('putout: operator: filesystem: findFileUp: not found', (t) => {
    const ast = parseFilesystem(['/hello/', '/hello/world.js']);
    
    const [filePath] = findFile(ast, '*.js');
    const [, packageFile] = findFileUp(filePath, 'package.json');
    
    t.notOk(packageFile);
    t.end();
});

test('putout: operator: filesystem: findFileUp: not file', (t) => {
    const ast = parseFilesystem(['/', '/package.json/', '/package.json/hello.js']);
    
    const [filePath] = findFile(ast, '*.js');
    const [, packageFile] = findFileUp(filePath, 'package.json');
    
    t.notOk(packageFile);
    t.end();
});

test('putout: operator: filesystem: findFileUp: returns: dir', (t) => {
    const ast = parseFilesystem(['/', '/package.json', '/hello.js']);
    
    const [filePath] = findFile(ast, 'hello.js');
    const [dir] = findFileUp(filePath, 'package.json');
    
    t.equal(dir, '/');
    t.end();
});
