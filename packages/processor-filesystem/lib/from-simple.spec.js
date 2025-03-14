import {test} from 'supertape';
import tryCatch from 'try-catch';
import {fromSimple} from './from-simple.js';

test('@putout/processor-filesystem: fromSimple', (t) => {
    const source = [
        '/',
        '/hello.txt',
    ];
    
    const result = fromSimple(source);
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'file',
            filename: '/hello.txt',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('@putout/processor-filesystem: fromSimple: nested', (t) => {
    const source = [
        '/',
        '/hello/',
        '/hello/world.txt',
    ];
    
    const result = fromSimple(source);
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/hello',
            files: [{
                type: 'file',
                filename: '/hello/world.txt',
            }],
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('@putout/processor-filesystem: fromSimple: content', (t) => {
    const source = [
        '/',
        '/hello/',
        [
            '/hello/world.txt',
            'hello world',
        ],
    ];
    
    const result = fromSimple(source);
    const expected = {
        type: 'directory',
        filename: '/',
        files: [{
            type: 'directory',
            filename: '/hello',
            files: [{
                type: 'file',
                filename: '/hello/world.txt',
                content: 'hello world',
            }],
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('@putout/processor-filesystem: fromSimple: no directory', (t) => {
    const source = ['/', [
        '/hello/world.txt',
        'hello world',
    ]];
    
    const [error] = tryCatch(fromSimple, source);
    const expected = `☝️ Looks like directory '/hello' not found. Only: '/'`;
    
    t.equal(error.message, expected);
    t.end();
});
