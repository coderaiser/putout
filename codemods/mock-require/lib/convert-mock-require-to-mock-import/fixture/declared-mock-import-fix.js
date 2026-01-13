import {createMockImport} from 'mock-import';

const {
    mockImport,
    reImport,
    stopAll
} = createMockImport(import.meta.url);

const mockRequire = require('mock-require');

const {reRequire, stopAll} = mockRequire;

test('', async t => {
    mockImport('fs/promises', {
        unlink: stub(),
    });
    
    const fn = await reImport('..');
    fn();
    
    stopAll();
    t.end();
});

test('', (t) => {
    mockRequire('fs/promises', {
        unlink: stub(),
    });
    
    const fn = reRequire('..');
    fn();
    
    stopAll();
    t.end();
});

