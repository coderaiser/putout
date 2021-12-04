import {createMockImport} from 'mock-import';

const {
    mockImport,
    reImport,
    stopAll
} = createMockImport(import.meta.url);

const mockRequire = require('mock-require');

const {reRequire} = mockRequire;

test('', async t => {
    mockImport('fs/promises', {
        unlink: stub(),
    });
    
    const fn = await reImport('..');
    fn();
    
    t.end();
});

