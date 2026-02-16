import {transform, findPlaces} from 'putout';
import {
    test,
    parseFilesystem,
} from '@putout/test/filesystem';
import {removeFiles} from './remove-files.js';

const getMessage = (a) => a.message;

test('putout: operator: remove-files: places', (t) => {
    const ast = parseFilesystem(['/', '/tsconfig.json']);
    const files = [
        'tsconfig.json',
    ];
    
    const places = findPlaces(ast, '', {
        fix: false,
        plugins: [
            ['remove-files', removeFiles(files)],
        ],
    });
    
    const messages = places.map(getMessage);
    const expected = [`Remove files: '/tsconfig.json'`];
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: remove-files: no names: places', (t) => {
    const ast = parseFilesystem(['/', '/tsconfig.json']);
    const files = [];
    
    const places = findPlaces(ast, '', {
        fix: false,
        plugins: [
            ['remove-files', removeFiles(files)],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: operator: remove-files: not array: places', (t) => {
    const ast = parseFilesystem(['/', '/tsconfig.json']);
    const files = 'tsconfig.json';
    
    const places = findPlaces(ast, '', {
        plugins: [
            ['remove-files', removeFiles(files)],
        ],
    });
    
    const expected = [`Remove files: '/tsconfig.json'`];
    const messages = places.map(getMessage);
    
    t.deepEqual(messages, expected);
    t.end();
});

test('putout: operator: remove-files: transform', (t) => {
    const ast = parseFilesystem(['/', '/tsconfig.json']);
    
    const files = [
        'tsconfig.json',
    ];
    
    transform(ast, '', {
        plugins: [
            ['remove-files', removeFiles(files)],
        ],
    });
    
    const expected = ['/'];
    
    t.equalFilesystems(ast, expected);
    t.end();
});
