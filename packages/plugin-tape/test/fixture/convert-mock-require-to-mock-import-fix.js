import {createMockImport} from 'mock-import';
import {test} from 'supertape';
import {stub} from 'supertape';

const {reImport} = createMockImport(import.meta.url);
const {mockImport} = createMockImport(import.meta.url);
const {stopAll} = createMockImport(import.meta.url);
const mockRequire = require('mock-require');

test('', async (t) => {
    mockImport('fs/promises', {
        unlink: stub(),
    });
    
    const fn = await reImport('..');
    fn();
    
    stopAll();
    t.end();
});

test('', async (t) => {
    mockImport('fs/promises', {
        unlink: stub(),
    });
    
    const fn = await reImport('..');
    fn();
    
    stopAll();
    t.end();
});
