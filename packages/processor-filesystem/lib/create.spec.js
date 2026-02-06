import test, {stub} from 'supertape';
import {__filesystem_name} from '@putout/operator-json';
import {
    getRootDirectory,
    removeFile as _removeFile,
    getFile,
} from '@putout/operator-filesystem';
import {parse} from 'putout';
import {create} from '#create';

const {stringify} = JSON;

test('putout: processor-filesystem: create', (t) => {
    const {branch} = create({
        cli: false,
        maybeSimple: false,
    });
    
    const source = stringify(['/']);
    const result = branch(source);
    
    const expected = [{
        source: `${__filesystem_name}(["/"]);\n`,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: processor-filesystem: create: maybeSimple', (t) => {
    const {branch} = create({
        cli: false,
        maybeSimple: true,
    });
    
    const source = stringify(['/']);
    const result = branch(source);
    
    const fs = stringify({
        filename: '/',
        type: 'directory',
        files: [],
    }, null, 4);
    
    const expected = [{
        source: `${__filesystem_name}(${fs});\n`,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: processor-filesystem: create: filesystemCLI', (t) => {
    const removeFile = stub();
    const filesystemCLI = {
        removeFile,
    };
    
    const {branch} = create({
        cli: true,
        maybeSimple: true,
        filesystemCLI,
    });
    
    const [{source}] = branch(stringify(['/', '/hello.txt']));
    const ast = parse(source);
    const root = getRootDirectory(ast);
    const [file] = getFile(root, 'hello.txt');
    
    _removeFile(file);
    
    t.calledWith(removeFile, ['/hello.txt']);
    t.end();
});
